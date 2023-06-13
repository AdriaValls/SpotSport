from db import db
from models.user import UserModel, auth, g, player_in_match
from models.match import MatchModel
from flask_restful import Resource, reqparse


class Feed(Resource):

    @auth.login_required()
    def get(self):
        matches = MatchModel.query.filter_by(ongoing=True).all()
        if matches:
            return {"feed_matches": [match.json() for match in matches]}, 200
        return {"message": f"Unable to get feed"}, 404


class FilteredFeed(Resource):

    @auth.login_required()
    def get(self):
        matches = MatchModel.query.filter_by(ongoing=True).all()
        if matches:
            return {"feed_matches": [match.json() for match in matches]}, 200
        return {"message": f"Unable to get feed"}, 404





