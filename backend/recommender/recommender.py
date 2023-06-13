import numpy as np
import math

from models.user import UserModel, auth, g
from models.match import MatchModel
from flask_restful import Resource, reqparse


class Recommender:
    userMatrix = []
    userDict = {}

    def __init__(self):

        users = UserModel.get_all()

        self.userMatrix = np.zeros((len(users), len(users)))

        i = 0
        for u in users:
            self.userDict[u.id] = i
            self.userMatrix[i][i] = 0.5

    def addMatchToMat(self, matchResult):
        result = -1
        if matchResult[2]:
            result = 1
        p1 = matchResult[0]
        p2 = matchResult[1]

        self.userMatrix[p1][p2] += result
        self.userMatrix[p2][p1] -= result

    def getRecommendedMatch(self, playerId):
        matches = MatchModel.get_by_ongoing()
        player = UserModel.get_by_id(playerId)

        tempMatch = [0, 999]

        for match in matches:
            matchValue = 0
            players = match.players
            for p in players:
                matchValue += p.skill
            matchValue = matchValue/len(players)
            difference = abs(matchValue) - abs(player.skill)
            if abs(difference) > 1:
                return match.id
            else:
                if abs(difference) < tempMatch[1]:
                    tempMatch[0] = match.id
                    tempMatch[1] = difference

        return tempMatch[0]

    def calculateSkill(self):
        valuesList = self.userMatrix.sum(axis=0)
        for u in self.userDict:
            player = UserModel.get_by_id(u)
            player.skill = valuesList[self.userDict[u]]


    def addUserToMat(self, userId, value=0.5):
        r = self.userMatrix.shape[0]
        c = r + 1
        rows = np.zeros((r, 1))
        columns = np.zeros((c, 1))
        np.append(self.userMatrix, rows, axis=0)
        np.append(self.userMatrix, columns, axis=1)
        self.userDict[userId] = c
        self.userMatrix[c][c] = value
