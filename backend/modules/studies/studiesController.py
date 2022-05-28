from flask import Blueprint, request, Response
from flask_expects_json import expects_json

from utils.authorization import authorizeDoctor

from modules.studies.models.studyRequest import StudyRequest, schema as studySchema
from modules.studies.models.noteRequest import NoteRequest, schema as noteSchema 
from modules.studies.models.feedbackRequest import FeedbackRequest, schema as feedbackSchema
import modules.studies.studiesService as studiesService

studiesBlueprint = Blueprint('studies', __name__)

@studiesBlueprint.route('', methods = ['POST'])
@authorizeDoctor()
@expects_json(studySchema)
def createStudy():
    study = StudyRequest(request.json)
    response = studiesService.createStudy(study)
    
    return response.makeResponse()

@studiesBlueprint.route('', methods = ['GET'])
@authorizeDoctor()
def getStudies():
    response = studiesService.getStudies()
    
    return response.makeResponse()

@studiesBlueprint.route('<id>', methods = ['GET'])
@authorizeDoctor()
def getStudy(id):
    response = studiesService.getStudy(id)
    
    return response.makeResponse()

@studiesBlueprint.route('<id>', methods = ['DELETE'])
@authorizeDoctor()
def deleteStudy(id):
    response = studiesService.markStudyAsDeleted(id)
    
    return response.makeResponse()

@studiesBlueprint.route('<id>/complete', methods = ['PATCH'])
@authorizeDoctor()
def markStudyAsComplete(id):
    response = studiesService.markStudyAsComplete(id)
    
    return response.makeResponse()

@studiesBlueprint.route('<id>/notes', methods = ['POST'])
@authorizeDoctor()
@expects_json(noteSchema)
def addNoteToStudy(id):
    note = NoteRequest(request.json)
    response = studiesService.addNoteToStudy(id, note)
    
    return response.makeResponse()

@studiesBlueprint.route('<id>/feedback', methods = ['POST'])
@expects_json(feedbackSchema)
def addFeedbackToStudy(id):
    note = FeedbackRequest(request.json)
    response = studiesService.addFeedbackToStudy(id, note)
    
    return response.makeResponse()
