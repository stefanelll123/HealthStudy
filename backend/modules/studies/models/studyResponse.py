import json
from datetime import datetime
from utils.constants import DATE_FORMAT

class StudyResponse():
    def __init__(self, id, name, medicationTested, startDate, numberOfParticipans, participants, flacons, notes, feedback, isActive):
        self.id = str(id)
        self.name = name
        self.medicationTested = medicationTested
        self.startDate = startDate.strftime(DATE_FORMAT)
        self.numberOfParticipans = numberOfParticipans
        self.participants = participants
        self.notes = []
        for note in notes:
            note['creationDate'] = note['creationDate'].strftime(DATE_FORMAT)
            self.notes.append(note)
        self.feedback = []
        if feedback != None:
            for f in feedback:
                f['creationDate'] = f['creationDate'].strftime(DATE_FORMAT)
                self.feedback.append(f)
        self.isActive = isActive
    
    def __str__(self):
        return json.dumps(self.__dict__)