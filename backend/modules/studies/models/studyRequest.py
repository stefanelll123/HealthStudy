import json
from datetime import datetime

from utils.constants import DATE_FORMAT

class StudyRequest():
    def __init__(self, dictionary) -> None:
        self.name = dictionary.get('name')
        self.medicationTested = dictionary.get('medicationTested')
        self.startDate = datetime.strptime(dictionary.get('startDate'), DATE_FORMAT)
        self.numberOfParticipans = dictionary.get('numberOfParticipans')
        self.participants = []
        self.flacons = []
        self.notes = []
        self.isActive = True
    
    def __str__(self):
        return json.dumps(self.__dict__)

schema = {
    'type': 'object',
    'properties': {
        'name': {'type': 'string', "minLength": 3, "maxLength": 100},
        'medicationTested': {'type': 'string', "minLength": 1, "maxLength": 100},
        'startDate': {'type': 'string', "format": "date"},
        'numberOfParticipans': {'type': 'number'},
    },
    'required': ['name', 'medicationTested', 'startDate', 'numberOfParticipans']
}
