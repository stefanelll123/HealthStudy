from datetime import datetime, timedelta
import logging

_cachedDictionary = {}

class CachedValue:
    def __init__(self, value, expirationDate) -> None:
        self.value = value
        self.expirationDate = expirationDate

def executeWithCache(f, key, expirationMinutes = 60, expirationHours = 0):
    cachedValue = _cachedDictionary.get(key)
    
    if cachedValue == None or cachedValue.expirationDate < datetime.now():
        logging.debug('Cache value for key %s' % (key, ))
        result = f()
        expirationDate = datetime.now() + timedelta(minutes = expirationMinutes, hours = expirationHours)
        _cachedDictionary.update({key: CachedValue(result, expirationDate)})
        return result
    
    logging.debug('Return cached value for key %s' % (key, ))
    
    return cachedValue.value
