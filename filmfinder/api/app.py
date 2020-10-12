from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import sqlite3
import os.path

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "filmFinder.db")
app.config["DATABASE"] = db_path

def connect_db():
    db = sqlite3.connect(app.config["DATABASE"], check_same_thread=False)
    return db

@app.route('/app', methods=['GET','POST'])
def api():
    if request.method=='GET':
        return('<form action="/test" method="post"><input type="submit" value=a /></form>')

    elif request.method=='POST':
        db = connect_db()
        c = db.cursor()
        try:
            c.execute(
                "CREATE TABLE USER (USERNAME TEXT, NICKNAME TEXT, EMAIL TEXT, PASSWORD TEXT, BIO TEXT)"
            )
            db.commit()
        except sqlite3.OperationalError:
            pass 
        user_data = request.get_json()
        # username = user_data["userName"]
        # nickname = user_data["nickName"]
        # email = user_data["email"]
        # password = user_data["password"]
        # bio = user_data["bio"]
        c.execute(
            "INSERT INTO USER (USERNAME, NICKNAME, EMAIL, PASSWORD, BIO) VALUES(?, ?, ?, ?, ?)", 
            (user_data["userName"], user_data["nickName"], user_data["email"], user_data["password"], user_data["bio"])
        )
        db.commit()
        return request.get_json()

    else:
        return("ok")


@app.route('/login', methods=['GET','POST'])
def login():
    if request.method=='GET':
        return('<form action="/test" method="post"><input type="submit" value=a /></form>')

    elif request.method=='POST':
        json_data = request.get_json()
        username = json_data['inputUsername']
        password = json_data['inputPassword']
        db = connect_db()
        c = db.cursor()

        query_sql = "SELECT USERNAME, PASSWORD FROM USER WHERE (USERNAME = " + str(username) + " AND PASSWORD = " + str(password) + " )"

        try:
            result = c.execute(query_sql)
            return {'isMember': 1}
        except sqlite3.OperationalError:
            return {'isMember': 0}

    # title = 'This is the project of W17A-996'
    # test_msg = 'Congratulations, your Flask successfully connects to React!'
    # return {
    #     'userId': 1,
    #     'title': title,
    #     'message': test_msg,
    #     'completed': False
    # }

if __name__ == "__main__":
    app.run(debug=True)