from os import abort
from werkzeug.utils import secure_filename
from flask import escape, flash, jsonify, make_response, redirect, render_template, request, session, url_for
from application import App as app

# 添加了GET方法就会默认支持HEAD
@app.route("/",methods=['GET','POST'])
def index():
    return render_template('index.html')
    

@app.route("/hi")
@app.route("/hi/<username>")
def hello(username=None):
    # return "Hi,%s"%username
    # 去./templates下寻找hello.html
    return render_template('hello.html', name=username)

@app.route('/login', methods=['GET','POST'])
def login():
    error = None
    if request.method == "POST":
        if request.form['email'] != 'admin' or request.form['password'] != 'secret':
            error = 'Invalid credentials'
        else:
            flash("You were successfully logged in.",'error')
            return {'code':200,'msg':'success'}
    return abort(401)

@app.route('/logout')
def logout():
    session.pop('username',None)
    return redirect(url_for('index'))

@app.route("/user/<username>")
def profile(username):
    return "{}\'s profile".format(escape(username))

# specify type integer
# supported type: string, int, float, path(string-like ,include /),uuid
@app.route("/post/<int:post_id>")
def show_post(post_id):
    return "Post %d"%post_id
# show subpath after /path/
@app.route("/path/<path:subpath>")
def show_subpath(subpath):
    return "Subpath: %s"%escape(subpath)

@app.route("/projects/")
def projects():
    return "The projects page"

@app.route("/about")
def about():
    # get query params
    print(request.args.get("who","ado"))
    return "The about page"

@app.route("/upload", methods=['GET','POST'])
def upload_file():
    if request.method == "POST":
        f = request.files['filename']
        f.save("./upload/"+secure_filename(f.filename))  

# return json
@app.route('/me')
def me_api():
    user = {
        "name":"adoontheway",
        "gender":"male"
    }
    # return user
    return jsonify(user)

# custom error handler
@app.errorhandler(401)
def not_authorized(error):
    return "Opoos..."+error.name  

@app.errorhandler(404)
def not_found(error):
    # return render_template('error.html'),404
    resp = make_response(render_template('error.html'),404)
    resp.headers['X-Something'] = 'A value'
    return resp
