
class AssignUsersRequest():
    def __init__(self, dictionary) -> None:
        self.studyId = dictionary['studyId']
        self.users = dictionary['users']

schema = {
    'type': 'object',
    'properties': {
        'studyId': {'type': 'string', "minLength": 5, "maxLength": 200},
        'users': {'type': 'array'}
    },
    'required': ['studyId', 'users']
}
