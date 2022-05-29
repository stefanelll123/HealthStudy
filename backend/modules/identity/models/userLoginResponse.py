import json

class UserLoginResponse:
    def __init__(self, token, userId, email, firstName, lastName, isDoctor, currentStudy) -> None:
        self.token = token
        self.userId = userId
        self.email = email
        self.firstName = firstName
        self.lastName = lastName
        self.isDoctor = isDoctor
        self.currentStudy = currentStudy

    def __str__(self) -> str:
        return json.dumps(self.__dict__)
