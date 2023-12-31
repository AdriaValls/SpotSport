from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from db import db

from config import config

from resources.accounts import Account, UserInfo, UserId
from resources.login import Login
from resources.matches import Match, PlayersInMatch
from resources.userMatches import OwnedMatches
from resources.userMatches import JoinedMatches
from resources.feed import Feed, FilteredFeed

app = Flask(__name__)

app.config.from_object(config)

CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'

api = Api(app)

migrate = Migrate(app, db)
db.init_app(app)

api.add_resource(Account, "/account", "/account/<int:id>" )
api.add_resource(Login, "/login")
api.add_resource(UserInfo, "/userinfo", "/userinfo/<int:id>")
api.add_resource(UserId, "/userid")

api.add_resource(Match, "/match/<int:id>", "/match")
api.add_resource(OwnedMatches, "/owned/<int:id>", "/owned")
api.add_resource(JoinedMatches, "/matches/<int:id>", "/matches")
api.add_resource(PlayersInMatch, "/players/<int:id>")

api.add_resource(Feed, "/feed")
api.add_resource(FilteredFeed, "/filtered")

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
