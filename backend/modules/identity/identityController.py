from flask import Blueprint, request
from flask_expects_json import expects_json

from modules.identity.models.userLoginRequest import UserLoginRequest
from modules.identity.models.userLoginRequest import schema as loginSchema

from modules.identity.models.userRegisterRequest import UserRegisterRequest
from modules.identity.models.userRegisterRequest import schema as registerSchema

from modules.identity.models.assignUsersRequest import AssignUsersRequest, schema as assignUsersSchema

import modules.identity.identityService as identityService

identityBlueprint = Blueprint('identity', __name__)

@identityBlueprint.route('login', methods = ['POST'])
@expects_json(loginSchema)
def login():
    user = UserLoginRequest(request.get_json())
    result = identityService.login(user)
    
    return result.makeResponse()

@identityBlueprint.route('register', methods = ['POST'])
@expects_json(registerSchema)
def register():
    user = UserRegisterRequest(request.get_json())
    result = identityService.register(user)
    
    return result.makeResponse()

@identityBlueprint.route('users', methods = ['GET'])
@expects_json(registerSchema)
def getUsers():
    count = request.args.get('count')
    result = identityService.getUserIds(count)
    
    return result.makeResponse()

@identityBlueprint.route('users/assign', methods = ['POST'])
@expects_json(assignUsersSchema)
def assignUsers():
    request = AssignUsersRequest(request.get_json())
    result = identityService.assignUsers(request)
    
    return result.makeResponse()

@identityBlueprint.route('populate', methods = ['POST'])
def populate():
    import random
    import string
    for i in range(0, 200):
        id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        user = {
            "firstName": "Stefan" + id,
            "lastName": "Turcu",
            "email": f'stefan{id}@gmail.com',
            "cnp": "1111111111111",
            "password": "stefan123"
        }
        
        result = identityService.register(UserRegisterRequest(user))
    
    return result.makeResponse()
    
