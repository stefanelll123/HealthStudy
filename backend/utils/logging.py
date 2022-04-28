from cmath import log
import logging
import logging.handlers
import logging.config

import sys
import os

def configureLogging():
    logFolder = os.getenv('LOG_FOLDER')
    logLevel = os.getenv('LOG_LEVEL')
    
    fileHandler = logging.handlers.TimedRotatingFileHandler(filename=logFolder, when='midnight')
    fileHandler.suffix = "%Y-%m-%d"
    stdoutHandler = logging.StreamHandler(sys.stdout)
    handlers = [fileHandler, stdoutHandler]
    
    logging.basicConfig(
        level=logLevel, 
        format='[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s',
        handlers=handlers
    )