import json

from flask import Response, make_response

class Result:
    def __init__(self, value = None):
        self.value = value
        self.hasErrors = False
        self.message = None
        self.statusCode = 200
        
    def setErrorMeesage(self, message, statusCode = 400):
        self.message = message
        self.hasErrors = True
        self.statusCode = statusCode
      
    def __str__(self) :
        return json.dumps(self.__dict__)
        
    def makeResponse(self):
        if self.hasErrors:
            return Response('{"error": "%s"}' % (self.message), status=self.statusCode)
        
        if isinstance(self.value, list):
            return Response(json.dumps([x.__dict__ for x in self.value]), status=self.statusCode)

        print(str(self.value))
        return Response(str(self.value) if self.value != None else '', status=self.statusCode)

    @staticmethod  
    def error(message, statusCode = 400):
        result = Result()
        result.setErrorMeesage(message, statusCode=statusCode)
        
        return result
    