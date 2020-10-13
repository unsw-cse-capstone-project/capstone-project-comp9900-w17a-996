from flask import Flask, render_template, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
import sqlite3
import os.path
import time

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

guid = {'username': '', 'nickname': '', 'email': '', 'password': '', 'bio': ''}
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method=='POST':
        json_data = request.get_json()
        username = json_data['inputUsername']
        # password = json_data['inputPassword']
        db = connect_db()
        c = db.cursor()

        query_sql = "SELECT * FROM USER WHERE USERNAME = ?"

        try:
            result = c.execute(query_sql, (username,)).fetchall()
            if len(result) != 0:
                guid['username'] = username
                guid['nickname'] = result[0][1]
                guid['email'] = result[0][2]
                guid['password'] = result[0][3]
                guid['bio'] = result[0][4]
                return result[0][3]
            else:
                guid['password'] = ''
                return '-'
        except sqlite3.OperationalError:
            guid['password'] = ''
            return '-'
    else:
        return guid

@app.route('/home', methods=['GET'])
def home():
    return guid

result = {}
@app.route('/search', methods=['POST', 'GET'])
def search():
    if request.method == 'POST':
        data = request.get_json()
        search_content = data["searchContent"]
 
        db = connect_db()
        c = db.cursor()
        query_sql = "SELECT * FROM MOVIE"
        
        try:
            movie_details = c.execute(query_sql).fetchall()
            idx = 1
            for detail in movie_details:
                if search_content in detail[0]:
                    sub_res = {"title": "", "director": "", "cast": "", "genre": "", "language": "", "date": ""}
                    sub_res["title"] = detail[0]
                    sub_res["director"] = detail[1]
                    sub_res["cast"] = detail[2]
                    sub_res["genre"] = detail[3]
                    sub_res["language"] = detail[4]
                    sub_res["date"] = detail[5]

                    result["movie" + str(idx)] = sub_res
                    idx += 1
        except sqlite3.OperationalError:
            pass
        return search_content
    else:
        return result
    
@app.route('/profile', methods=['POST'])
def profile():
    user_data = request.get_json()

    guid['username'] = user_data["username"]
    guid['nickname'] = user_data["nickname"]
    guid['email'] = user_data["email"]
    guid['password'] = user_data["password"]
    guid['bio'] = user_data["bio"]

    username = user_data['username']
    db = connect_db()
    c = db.cursor()

    delete_sql = "DELETE FROM USER WHERE USERNAME = ?"

    try:
        c.execute(delete_sql, (username,))
        c.execute(
            "INSERT INTO USER (USERNAME, NICKNAME, EMAIL, PASSWORD, BIO) VALUES(?, ?, ?, ?, ?)", 
            (user_data["username"], user_data["nickname"], user_data["email"], user_data["password"], user_data["bio"])
        )
        db.commit()
        return user_data
    except sqlite3.OperationalError:
        return '-'
    # else:
    #     # time.sleep(100)
    #     return member_state
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