from crypt import methods
import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from werkzeug.security import check_password_hash, generate_password_hash

from app.db import get_db

bp = Blueprint('user', __name__, url_prefix='/user')

@bp.route('/register', methods=['GET','POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None
        if not username:
            error = 'Username is required'
        elif not password:
            error = 'Password is required'
        elif db.execute('SELECT id FROM user WHERE username=?',(username,)
                ).fetchone() is not None:
                error = 'User {} is already exsits.'.format(username)
        
        if error is None:
            db.execute('INSERT INTO user (username, password) VALUES (?,?)',(username,generate_password_hash(password)))
            db.commit()
            return redirect(url_for('auth.login'))
        
        flash(error)
    return render_template('auth/register.html')

@bp.route('/login', methods=['GET','POST'])
def login():
    session.clear()
    session['user_id']=1
    return {'code':200, 'msg':'success'}

    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        db = get_db()
        error = None
        user = db.execute('SELECT * FROM t_user WHERE name=?',(email,)).fetchone()
        if  user is None:
            error = 'Name not exsits'
        elif not check_password_hash(user['password'],password):
            error = 'Incorrect password'

        if error is None:
            session.clear()
            session['user_id']=user['id']
            return {'code':200, 'msg':'success'}
        
        flash(error)
    return abort(401)
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