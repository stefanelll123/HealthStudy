import logging
import jwt
import os

from utils.databaseContext import identityDatabase
from modules.identity.models.userLoginResponse import UserLoginResponse

from utils.result import Result
from utils.constants import ADMIN_ROLE

key = os.getenv('SECRET')
users = identityDatabase.get_collection('users')

def login(user):
    databaseUser = users.find_one({"email": user.email, "password": user.password})
    if databaseUser == None:
        return Result.error('Incorect password or email', 400)

    token = createToken(databaseUser['_id'], databaseUser['email'])
    isDoctor = databaseUser['role'] == ADMIN_ROLE
    
    return Result(UserLoginResponse(token, str(databaseUser['_id']), databaseUser['email'], databaseUser['firstName'], databaseUser['lastName'], isDoctor))

def register(user):
    databaseUser = users.find_one({"email": user.email})
    if databaseUser != None:
        return Result.error('An user with this email already exists', 400)
    
    users.insert_one(user.__dict__)
    return Result()

def deleteAccount(email):
    databaseUser = users.find_one({"email": email})
    if databaseUser == None:
        return Result.error('Cannot find any user with this email', 400)
    
    users.delete_one({"_id": databaseUser['_id']})
    logging.debug('User with email %s deleted.' % email)
    return Result()

def createToken(userId, email):
    token = jwt.encode(
        payload= {
            'sub': str(userId),
            'name': email
        },
        key=key
    )
    
    return token    
    