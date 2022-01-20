from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo, MongoClient
from flask_cors import CORS
from bson import ObjectId
import json

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost:27017/react_flask'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users

@app.route('/', methods=['GET', 'POST'])
def index():
    return 'Hello World!'


@app.route('/users', methods=['POST'])
def createUsers():
    id = db.insert_one({
        "name": request.json["name"],
        "email": request.json["email"],
        "contact": request.json["contact"],
        "address": request.json["address"]

    })

    return jsonify({'message': 'User created successfully!'})


@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for user in db.find():
        users.append({
            '_id': str(ObjectId(user['_id'])),
            'name': user['name'],
            'email': user['email'],
            'contact': user['contact'],
            'address': user['address']
        })
    return jsonify({'users': users})



@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(user['_id'])),
            'name': user['name'],
            'email': user['email'],
            'contact': user['contact'],
            'address': user['address']
    })


@app.route('/user/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'User deleted successfully!'})

@app.route('/user/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        "name": request.json["name"],
        "email": request.json["email"],
        "contact": request.json["contact"],
        "address": request.json["address"]
    }})
    return jsonify({'message': 'User updated successfully!'})
    

if __name__ == '__main__':
    app.run(debug=True)

