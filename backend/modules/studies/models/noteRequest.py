import json
from datetime import datetime

from utils.constants import DATE_FORMAT

class NoteRequest():
    def __init__(self, dictionary) -> None:
        self.content = dictionary.get('content')
        self.creationDate = datetime.strptime(dictionary.get('creationDate'), DATE_FORMAT)
    
    def __str__(self):
        return json.dumps(self.__dict__)

schema = {
    'type': 'object',
    'properties': {
        'content': {'type': 'string', "minLength": 3, "maxLength": 3000},
        'creationDate': {'type': 'string', "format": "date"},
    },
    'required': ['content', 'creationDate']
}