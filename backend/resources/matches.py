from datetime import datetime
from db import db
from models.user import UserModel, auth, g
from models.match import MatchModel
from flask_restful import Resource, reqparse


class Match(Resource):

    @auth.login_required()
    def get(self, id):
        match = MatchModel.get_by_id(id)
        if match:
            return {"match": match.json()}, 200
        return {"message": f"Could not find an a match with that id"}, 404

    # Create New Match
    @auth.login_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("title", type=str, required=True, nullable=False)
        parser.add_argument("description", type=str, required=False, nullable=False, default="")
        parser.add_argument("location", type=str, required=True, nullable=False)
        parser.add_argument("city", type=str, required=True, nullable=False)
        parser.add_argument("date", type=str, required=True, nullable=False)
        parser.add_argument("numPlayers", type=int, required=True, nullable=False)
        parser.add_argument("sport", type=str, required=True, nullable=False)
        parser.add_argument("ongoing", type=bool, required=True, nullable=False)
        data = parser.parse_args()

        try:
            new_match = MatchModel(
                data["title"],
                data["description"],
                data["location"],
                data["city"],
                data["date"],
                data["numPlayers"],
                data["sport"],
                data["ongoing"],
            )
            owner = UserModel.get_by_username(g.user.username)
            new_match.owner = owner
            new_match.players.append(owner)
            new_match.save_to_db()

        except Exception:
            return {"message": "An error occurred creating the match."}, 500

        return {"match": new_match.json()}, 201

    @auth.login_required()
    def put(self, id):

        parser = reqparse.RequestParser()
        parser.add_argument("winner_id", type=int, required=True, nullable=False)
        data = parser.parse_args()

        player = UserModel.get_by_username(g.user.username)
        match = MatchModel.get_by_id(id)
        if not match:
            return {"message": "No match found with id [{}]".format(id)}, 404

        if match.ongoing == 1:
            match.ongoing = 0
            match.save_to_db()
            return {"message": "Finished match id [{}]".format(data.winner_id)}, 201

        else:
            return {"message": "Match is already over"}, 500

    # Leave match
    @auth.login_required()
    def delete(self, id):
        player = UserModel.get_by_username(g.user.username)
        match = MatchModel.get_by_id(id)
        if not match:
            return {"message": "No match found with id [{}]".format(id)}, 404

        players = match.players
        for p in players:
            if p.id == player.id:
                try:
                    match.players.remove(p)
                    player.save_to_db()
                    return {"message": "Left match successfully!"}, 200
                except Exception:
                    player.rollback()
                    return {"message": "Error leaving match"}, 500

        return {"message": "Player not in match"}, 200


class PlayersInMatch(Resource):

    @auth.login_required()
    def get(self, id):
        match = MatchModel.get_by_id(id)
        if match:
            players = match.players
            return {"match_players": [player.smallInfo() for player in players]}, 200
        return {"message": f"Could not find an a match with that id"}, 404

    # Join match
    @auth.login_required()
    def post(self, id):

        player = UserModel.get_by_username(g.user.username)
        match = MatchModel.get_by_id(id)
        if not match:
            return {"message": "No match found with id [{}]".format(id)}, 404
        players = match.players
        try:
            if len(players) < 2:
                match.players.append(player)
                match.save_to_db()
                return {"message": "Joined match"}, 201
            else:
                return {"message": "Game Full"}, 500
        except Exception:
            return {"message": "Error Joining Game"}, 500
