from html import escape
from flask import Flask, abort, flash, jsonify, make_response, redirect, render_template, request, session, url_for
from werkzeug.utils import secure_filename
# from werkzeug.contrib.fixers import LighttpdCGIRootFix
from application import App as app
import routes

# with app.test_request_context():
#     print(url_for('about'))
#     print(url_for('projects'))
#     print(url_for('profile', username="Jim Green"))
#     # 只要创建static文件夹就默认支持静态文件
#     print(url_for('static', filename='style.css'))

# with app.test_request_context("/hi",method="GET"):
#     assert request.path == "/hi"
#     assert request.method == "GET"