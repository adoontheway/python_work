from flask import Flask

App = Flask(__name__)

App.secret_key = b'&*UH^%6%43FR&^dn^~'
# logger
App.logger.debug("App started....")