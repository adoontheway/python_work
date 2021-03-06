import functools
import json
from math import floor
import os
import random
import string

from flask import (
    Blueprint, current_app, flash, g, redirect, render_template, request, session, url_for
)

from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from app.db import get_db

bp = Blueprint('user', __name__, url_prefix='/user')

user_map = dict()

def gen_token():
    chars = string.ascii_letters + string.punctuation
    return ''.join(random.choice(chars) for x in range(12))

@bp.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        birthday = request.form['birthday']
        phone = request.form['phone']
        email = request.form['email']
        address = request.form['address']
        appointment = request.form['appointment']
        photo = request.files['photo']
        filename = secure_filename(photo.filename)
        app = current_app
        # todo filename should be renamed by md5 and systentime 
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
        db = get_db()
        error = None
        if not name:
            error = 'name is required'
        elif not email:
            error = 'email is required'
        # elif db.execute('SELECT id FROM t_appointment WHERE name=?',(name,)
        #         ).fetchone() is not None:
        #         error = 'User {} is already exsits.'.format(name)
        
        if error is None:
            db.execute('INSERT INTO t_appointment (name, email, birthday,phone,address,photo,appointment) VALUES (?,?,?,?,?,?,?)',(name,email,birthday,phone,address,filename,appointment))
            db.commit()
            return {'code':200,'msg':'success'}
        
        return {'code':400, 'msg':error}
    return {'code':400,'msg':'illegal request'}

@bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None
        user = db.execute('SELECT * FROM t_user WHERE username=?',(username,)).fetchone()
        if  user is None:
            error = 'Username not exsit'
        elif user['password'] != password:
            error = 'password dismatch.'

        if error is None:
            session.clear()
            session['user_id']=user['id']
            token =  gen_token()
            user_map[token]=user
            return {'code':200, 'msg':'success','token':token}
        
        return {'code':400,'msg':error}
    return {'code':400,'msg':'illegal request'}

@bp.route('/list', methods=['POST'])
def list():
    token = request.headers.get('token')
    data = json.loads(request.data)
    pageSize = data['page_size']
    page = data['page']
    db = get_db()
    # if g.user == None:
    #     return {'code':400,'msg':'Please login first'}
    # priority = g.user['priority']
    # if priority != 100:
    #     return {'code':400, 'msg':'not authorized.'}
    if token == None:
        return {'code':400, 'msg':'please login.'}
    users = db.execute('SELECT * FROM t_appointment limit %d offset %d'%(pageSize,page*pageSize)).fetchall()
    count = db.execute('SELECT COUNT(*) FROM t_appointment').fetchone()
    return {'code':200,
        'data':{ 'users':[
            {
                'name':user['name'],
                'phone':user['phone'],
                'address':user['address'],
                'email':user['email'],
                'photo':user['photo'],
                'birthday':user['birthday'],
                'appointment': user['appointment']
            } for user in users
        ],
        'cur_page':page,
        'total_page':floor(count[0]/pageSize)}}

# before each request check the user
@bp.before_app_request
def load_logged_in_use():
    user_id = session.get('user_id')
    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute('SELECT * FROM t_user WHERE id = ?',(user_id,)).fetchone()
# logout
@bp.route('/logout')
def logout():
    session.clear()
    return {'code':200, 'msg':'success'}

# decorator
def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('user.login'))
        return view(**kwargs)
    return wrapped_view