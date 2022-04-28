import json

class UserLoginResponse:
    def __init__(self, token, userId, email, firstName, lastName, isDoctor) -> None:
        self.token = token
        self.userId = userId
        self.email = email
        self.firstName = firstName
        self.lastName = lastName
        self.isDoctor = isDoctor

    def __str__(self) -> str:
        return json.dumps(self.__dict__)
