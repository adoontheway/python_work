from crypt import methods
import functools
import os

from flask import (
    Blueprint, current_app, flash, g, redirect, render_template, request, session, url_for
)

from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from app.db import get_db

bp = Blueprint('user', __name__, url_prefix='/user')

@bp.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        birthday = request.form['birthday']
        phone = request.form['phone']
        email = request.form['email']
        address = request.form['address']
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
        elif db.execute('SELECT id FROM t_user WHERE name=?',(name,)
                ).fetchone() is not None:
                error = 'User {} is already exsits.'.format(name)
        
        if error is None:
            db.execute('INSERT INTO t_user (name, email, birthday,phone,address,photo) VALUES (?,?,?,?,?,?)',(name,email,birthday,phone,address,filename))
            db.commit()
            return {'code':200,'msg':'success'}
        
        return {'code':400, 'msg':error}
    return {'code':400,'msg':'illegal request'}

@bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        name = request.form['name']
        db = get_db()
        error = None
        user = db.execute('SELECT * FROM t_user WHERE name=?',(name,)).fetchone()
        if  user is None:
            error = 'Name not exsits'
        elif user['email'] != email:
            error = 'Name or email incorrect.'
        # elif not check_password_hash(user['password'],password):
            # error = 'Incorrect password'

        if error is None:
            session.clear()
            session['user_id']=user['id']
            return {'code':200, 'msg':'success'}
        
        return {'code':400,'msg':error}
    return {'code':400,'msg':'illegal request'}


mock_users = [
    {'name':'jim1','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim2','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim3','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim4','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim5','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim6','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim7','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim8','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim9','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim10','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim11','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim12','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim13','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'},
    {'name':'jim14','address':'Canada','birthday':'1965/07/09','phone':'231234','email':'123@!123.com','photo':'111.png'}
]
@bp.route('/list', methods=['GET','POST'])
def list():
    return {'code':200,'msg':'success','data':{ 'users':mock_users,'cur_page':0,'total_page':2}}

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
            return redirect(url_for('auth.login'))
        return view(**kwargs)
    return wrapped_view