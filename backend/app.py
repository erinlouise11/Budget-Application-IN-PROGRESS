import os
import babel
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import setup_db, Item, Card

def create_app(test_config=None):
  # create and configure the app
  app = Flask(__name__)
  setup_db(app)
  

  # setting response headers
  @app.after_request
  def after_request(response):
    response.headers.add('Acess-Control-Allow-Headers', 'Content-Type, Authorization, true')
    response.headers.add('Acess-Control-Allow-Methods', 'GET, POST, DELETE')
    return response

  # error handlers (400, 404, 405, 422, 500)
  @app.errorhandler(400)
  def not_found(error):
    return jsonify({
      'success': False,
      'error': 400,
      'message': "Bad request"
    }), 400
  
  @app.errorhandler(404)
  def not_found(error):
    return jsonify({
      'success': False,
      'error': 404,
      'message': "Not found"
    }), 404
  
  @app.errorhandler(405)
  def not_allowed(error):
    return jsonify({
      'success': False,
      'error': 405,
      'message': "Method not allowed"
    }), 405  

  @app.errorhandler(422)
  def unprocessable(error):
    return jsonify({
      'success': False,
      'error': 422,
      'message': "Unprocessable"
    }), 422

  @app.errorhandler(500)
  def internal(error):
    return jsonify({
      'success': False,
      'error': 500,
      'message': "Internal server error"
    }), 500

  return app


app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)