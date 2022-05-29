import json
from datetime import datetime

from utils.constants import DATE_FORMAT

class FeedbackRequest():
    def __init__(self, dictionary) -> None:
        self.score = dictionary.get('score')
        self.content = dictionary.get('content')
        self.creationDate = datetime.strptime(dictionary.get('creationDate'), DATE_FORMAT)
        self.userId = dictionary.get('userId')
    
    def __str__(self):
        return json.dumps(self.__dict__)

schema = {
    'type': 'object',
    'properties': {
        'score': {'type': 'number'},
        'content': {'type': 'string', "minLength": 3, "maxLength": 3000},
        'creationDate': {'type': 'string', "format": "date"},
        'userId': {'type': 'string', "minLength": 3, "maxLength": 3000},
    },
    'required': ['score', 'content', 'creationDate', 'userId']
}