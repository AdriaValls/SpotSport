from db import db
from models.user import UserModel, auth, g, player_in_match
from models.match import MatchModel
from flask_restful import Resource, reqparse


class OwnedMatches(Resource):

    @auth.login_required()
    def get(self, id):
        owner = UserModel.get_by_id(id)
        if owner:
            matches = MatchModel.get_owned_by_account(id, 20, 0)
            if matches:
                return {"owned_matches": [match.json() for match in matches]}, 200
            return {"message": f"User has no owned matches"}, 404
        return {"message": f"User does not exist"}, 404


class JoinedMatches(Resource):

    @auth.login_required()
    def get(self, id):
        user = UserModel.get_by_id(id)
        if user:
            matches = MatchModel.query.join(player_in_match).filter_by(player_id=user.id).all()
            if matches:
                return {"joined_matches": [match.json() for match in matches]}, 200
            return {"message": f"User has no joined matches"}, 404
        return {"message": f"User does not exist"}, 404




