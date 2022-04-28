import hashlib
from utils.constants import USER_ROLE, ADMIN_ROLE

class UserRegisterRequest():
    def __init__(self, dictionary) -> None:
        self.firstName = dictionary['firstName']
        self.lastName = dictionary['lastName']
        self.cnp = dictionary['cnp']
        self.email = dictionary['email']
        self.password = hashlib.sha256(dictionary['password'].encode('utf-8')).hexdigest()
        self.role = USER_ROLE
        
    def makeAdmin(self):
        self.role = ADMIN_ROLE

schema = {
    'type': 'object',
    'properties': {
        'firstName': {'type': 'string', "minLength": 5, "maxLength": 200},
        'lastName': {'type': 'string', "minLength": 5, "maxLength": 200},
        'email': {'type': 'string', "minLength": 5, "maxLength": 200},
        'cnp': {'type': 'string', "length": 13},
        'password': {'type': 'string', "minLength": 8, "maxLength": 200}
    },
    'required': ['firstName', 'lastName', 'cnp', 'email', 'password']
}
