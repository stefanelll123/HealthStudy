import json

class StudyResponse():
    def __init__(self, id, name, medicationTested, startDate, numberOfParticipans, participants, flacons, notes, isActive):
        self.id = str(id)
        self.name = name
        self.medicationTested = medicationTested
        self.startDate = str(startDate)
        self.numberOfParticipans = numberOfParticipans
        self.participants = participants
        self.flacons = flacons
        self.notes = notes
        self.isActive = isActive
    
    def __str__(self):
        return json.dumps(self.__dict__)