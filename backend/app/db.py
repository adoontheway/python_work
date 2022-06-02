import imp
from pydoc import cli
import sqlite3

import click
from flask import Flask, current_app, g
from flask.cli import with_appcontext

def init_app(app:Flask):
    # 告诉flask在返回响应后进行清理的时候调用此函数
    app.teardown_appcontext(close_db) 
    # 添加一个新的可以于flask一起工作的命令
    app.cli.add_command(init_db_command)

# g 是一个特殊对象，独立于每一个请求
def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            # current app指向处理请求的Flask应用
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        # 告诉连接返回类似于字典的行，这样可以通过列名里操作数据库
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db',None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

@click.command('init-db') # 定义了一个名为init-db的命令行，调用init_db函数，显示一个成功的信息
@with_appcontext
def init_db_command():
    init_db()
    click.echo('Initialized the database.')