from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from flask import make_response, jsonify
from jsonschema import ValidationError

from modules.identity.identityController import identityBlueprint
from modules.studies.studiesController import studiesBlueprint
from utils.logging import configureLogging

load_dotenv()
configureLogging()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['CORS_HEADERS'] = 'Content-Type'
app.register_blueprint(identityBlueprint, url_prefix='/api/v1/identity')
app.register_blueprint(studiesBlueprint, url_prefix='/api/v1/studies')

@app.errorhandler(400)
def bad_request(error):
    if isinstance(error.description, ValidationError):
        original_error = error.description
        message = original_error.message
        if 'password' in list(original_error.path):
            message = message.replace(original_error.instance, 'Password')

        return make_response(jsonify({'error': message}), 400)
    return error

if __name__ == '__main__':
    app.run(debug=True)
