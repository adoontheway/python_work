
import os

from flask import Flask
from flask_cors import CORS

def create_app(test_config=None):
    # instance_relative_config 告诉应用配置文件是相对于instance folder的相对路径
    app  = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev', # 正式的时候需要改
        DATABASE=os.path.join(app.instance_path,'app.sqlite'), # sqlite存放位置
    )
    if test_config is None:
        app.config.from_pyfile('config.py',silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)# 确保instance path存在
    except OSError:
        pass
    
    CORS(app, supports_credentials=True)
    @app.route("/hello")
    def hello():
        return 'Hello World.'

    from . import db
    db.init_app(app)

    from . import user
    app.register_blueprint(user.bp)

    app.add_url_rule('/', endpoint='index')
    return app