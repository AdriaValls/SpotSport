from db import db
from models.user import UserModel, auth, g, player_in_match
from models.match import MatchModel
from flask_restful import Resource, reqparse


from recommender.recommender import Recommender


class RecommendedFeed(Resource):

    recommender = Recommender

    @auth.login_required()
    def get(self):
        matchId = self.recommender.getRecommendedMatch()
        matches = MatchModel.get_by_id(matchId)
        if matches:
            return {"feed_matches": [match.json() for match in matches]}, 200
        return {"message": f"Unable to get feed"}, 404



