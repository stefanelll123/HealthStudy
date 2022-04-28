import logging
from bson import ObjectId

from utils.databaseContext import studiesDatabase
from utils.result import Result

from modules.studies.models.studyResponse import StudyResponse

studies = studiesDatabase.get_collection('studies')

def createStudy(study):
    databaseStudy = studies.find_one({"name": study.name, "medicationTested": study.medicationTested, "isDeleted": {"$ne": True}})
    if databaseStudy != None:
        return Result.error("One study with name %s and medicationTested %s already exists." % (study.name, study.medicationTested))
    
    studyId = studies.insert_one(study.__dict__)
    logging.debug('New study with id %s inserted' % str(studyId.inserted_id))
    
    return Result()

def getStudies():
    results = [toStudyResponse(x) for x in list(studies.find({"isDeleted": {"$ne": True}}))]
    
    return Result(results)

def getStudy(id):
    study = studies.find_one({"_id": ObjectId(id), "isDeleted": {"$ne": True}})
    if study == None:
        return Result.error('Cannot find study with id %s' % (id), 404)
    
    return Result(toStudyResponse(study))

def markStudyAsComplete(id):
    study = studies.find_one_and_update({"_id": ObjectId(id)}, {"$set": {"isActive": False}})
    if study == None:
        return Result('Cannot find study with id %s' % id, 404)
    
    return Result()

def addNoteToStudy(id, note):
    study = studies.find_one_and_update({"_id": ObjectId(id)}, {"$addToSet": {"notes": note.__dict__}})
    if study == None:
        return Result('Cannot find study with id %s to add a new note' % id, 404)
    
    return Result()

def markStudyAsDeleted(id):
    study = studies.find_one_and_update({"_id": ObjectId(id)}, {"$set": {"isDeleted": True}})
    if study == None:
        return Result('Cannot delete study with id %s' % id, 404)
    
    return Result()

def toStudyResponse(databaseStudy):
    return StudyResponse(databaseStudy["_id"], databaseStudy["name"], databaseStudy["medicationTested"], databaseStudy["startDate"],
                         databaseStudy["numberOfParticipans"], databaseStudy["participants"], databaseStudy["flacons"],
                         databaseStudy["notes"], databaseStudy["isActive"])
