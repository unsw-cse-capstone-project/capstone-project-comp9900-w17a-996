from flask import Flask, render_template, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
import sqlite3
import os.path
import time
import datetime
import json

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "filmFinder.db")
app.config["DATABASE"] = db_path

"""connect to data base"""
def connect_db():
    db = sqlite3.connect(app.config["DATABASE"], check_same_thread=False)
    return db

@app.route('/', methods=['GET'])
def default():
    return "Default Page of Backend"

"""register page, create user table and insert a new user"""
@app.route('/app', methods=['GET','POST'])
def api():
    if request.method=='GET':
        return('<form action="/test" method="post"><input type="submit" value=a /></form>')

    elif request.method=='POST':
        db = connect_db()
        c = db.cursor()
        try:
            c.execute(
                "CREATE TABLE USER (USERNAME TEXT, NICKNAME TEXT, EMAIL TEXT, PASSWORD TEXT, BIO TEXT, WISHLIST TEXT)"
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
        wishlists = {'0':{}, '1':{}, '2':{},'3':{}, '4':{},'5':{},'6':{},'7':{},'8':{},'9':{}}
        wishlists = json.dumps(wishlists)
        c.execute(
            "INSERT INTO USER (USERNAME, NICKNAME, EMAIL, PASSWORD, BIO, WISHLIST) VALUES(?, ?, ?, ?, ?, ?)", 
            (user_data["userName"], user_data["nickName"], user_data["email"], user_data["password"], user_data["bio"], wishlists)
        )
        db.commit()
        return request.get_json()
    else:
        return("ok")

"""login page, get user name and password then check with data in db"""
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
                print(guid)
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

"""search movie, get input from search bar and return related movies"""
result = {"movies": []}
@app.route('/search', methods=['POST', 'GET'])
def search():
    if request.method == 'POST':
        data = request.get_json()
        search_content = data["searchContent"]
 
        db = connect_db()
        c = db.cursor()
        query_sql = "SELECT * FROM MOVIE"
        result["movies"] = []
        
        try:
            movie_details = c.execute(query_sql).fetchall()

            for detail in movie_details:
                if search_content in detail[0]:
                    # sub_res = {"title": "", "director": "", "cast": "", "genre": "", "language": "", "date": ""}
                    sub_res = {"title": "", "genre": ""}
                    sub_res["title"] = detail[0]
                    # sub_res["director"] = detail[1]
                    # sub_res["cast"] = detail[2]
                    sub_res["genre"] = detail[3]
                    # sub_res["language"] = detail[4]
                    # sub_res["date"] = detail[5]

                    result["movies"].append(sub_res)
                    # print(result)
        except sqlite3.OperationalError:
            pass
        return search_content
    else:
        return result

"""profile page, update user info"""
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
            "INSERT INTO USER (USERNAME, NICKNAME, EMAIL, PASSWORD, BIO, WISHLIST) VALUES(?, ?, ?, ?, ?, ?)", 
            (user_data["username"], user_data["nickname"], user_data["email"], user_data["password"], user_data["bio"], "")
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

"""movie page, get movie name then post movie detils"""
movie_detail_res = {"movie": {"title": "", "director": "", "cast": "", "genre": "", "language": "", "date": ""}}
@app.route('/movieDetail', methods=['GET', 'POST'])
def movieDetail():
    
    if request.method == 'POST':
        title = request.get_json()["title"]
        # pass
        db = connect_db()
        c = db.cursor()
        details = c.execute("SELECT * FROM MOVIE WHERE TITLE == ?", (title,)).fetchall()
        # print("this is detail: ", details)
        movie_detail_res["movie"]["title"] = details[0][0]
        movie_detail_res["movie"]["director"] = details[0][1]
        movie_detail_res["movie"]["cast"] = details[0][2]
        movie_detail_res["movie"]["genre"] = details[0][3]
        movie_detail_res["movie"]["language"] = details[0][4]
        movie_detail_res["movie"]["date"] = details[0][5]
        # print("detail result:", movie_detail_res)
        return movie_detail_res
    else:
        return movie_detail_res


@app.route('/history', methods=['GET', 'POST'])
def history():
    db = connect_db()
    c = db.cursor()
    user = guid["username"]
    if request.method == 'POST':
        data = request.get_json()
        movie = data["movieTitle"]
        new_rating = data["editedRating"]
        # edit
        if data["operator"] == "e":
            edit_review_sql = "UPDATE REVIEW SET COMMENT = ? WHERE USER = ? AND MOVIE = ?"
            c.execute(edit_review_sql, (data["editedReview"], user, movie, ))
            # db.commit()

            edit_review_sql = "UPDATE REVIEW SET RATE = ? WHERE USER = ? AND MOVIE = ?"
            c.execute(edit_review_sql, (str(new_rating), user, movie, ))
            db.commit()
        # delete
        else:
            del_review_sql = "DELETE FROM REVIEW WHERE USER = ? AND MOVIE = ?"
            c.execute(del_review_sql, (user, movie, ))
            db.commit()
        # test code
        # query = "SELECT * FROM REVIEW"
        # content = c.execute(query).fetchall()
        # print(content)
        return request.get_json()
    else:
        review_res = []

        review_search_sql = "SELECT  * FROM REVIEW WHERE USER = ?"
        
        try:
            
            reviews = c.execute(review_search_sql, (user,)).fetchall()
            for review in reviews:
                item = {"movieName": review[1], 
                        "reviewTime": review[4], 
                        "rating": review[3],
                        "review": review[2],
                        "editVisible": False,
                        "deleteVisible": False}
                
                review_res.append(item)
        except sqlite3.OperationalError:
            pass

        # sort by time
        review_res = sorted(review_res, key=lambda x: x["reviewTime"], reverse=True)

        # add key:counter
        counter = 1
        for review in review_res:
            review["key"] = str(counter)
            counter += 1
        return {"data": review_res}

"""history page, get user name and user action then post comments, rating"""
@app.route('/checkReview', methods=['GET', 'POST'])
def checkReview():
    db = connect_db()
    c = db.cursor()
    # user = guid["username"]
    if request.method == 'POST':
        data = request.get_json()
        movieTitle = data['movieTitle']
        rating = data['rating']
        review = data['review']
        userName = guid['username']
        time = str(datetime.datetime.now())[:19]

        c.execute("INSERT INTO REVIEW (USER, MOVIE, COMMENT, RATE, TIME) VALUES (?, ?, ?, ?, ?)", 
        (userName, movieTitle,review,rating,time))
        db.commit()

        return request.get_json()
    else:
        review_res = []
        movie_title = movie_detail_res['movie']['title']
        print("movie title:", movie_title)

        review_search_sql = "SELECT * FROM REVIEW WHERE MOVIE = ?"
        
        try:
            reviews = c.execute(review_search_sql, (movie_title,)).fetchall()
            print("reviews", reviews)
            for review in reviews:
                item = {"userName": review[0], 
                        "reviewTime": review[4], 
                        "rating": review[3],
                        "review": review[2],
                        }
                
                review_res.append(item)
        except sqlite3.OperationalError:
            pass

        # sort by time
        review_res = sorted(review_res, key=lambda x: x["reviewTime"], reverse=True)

        # add key:counter
        counter = 1
        for review in review_res:
            review["key"] = str(counter)
            counter += 1
        print(review_res)
        return {"user": review_res}

"""movie page, add to wish list function, add to db"""
@app.route('/addtoWishList', methods=['POST'])
def addtoWishList():
    db = connect_db()
    c = db.cursor()
    userName = guid['username']
    if request.method == 'POST':
        data = request.get_json()
        movie = data["title"]
        wishlists = data["type"]
        
        search_wishlist_sql = "SELECT WISHLIST FROM USER WHERE USERNAME == ?"
        
        str_json = c.execute(search_wishlist_sql, (userName,)).fetchall()[0]
        print("this is a str json:", str_json[0], type(str_json[0]))

        dic_json = json.loads(str_json[0])

        for wishlist in wishlists:
            dic_json[wishlist][movie] = str(datetime.datetime.now())[:19]
        
        new_str_json = json.dumps(dic_json)

        update_sql = "UPDATE USER SET WISHLIST = ? WHERE USERNAME = ?"

        c.execute(update_sql, (new_str_json, userName,))

        db.commit()
        return "-"

    else:
        return "-"

"""wishlist page, send wishlists data to front-end"""
@app.route('/wishlist', methods=['POST', 'GET'])
def wishlist():
    db = connect_db()
    c = db.cursor()
    userName = guid['username']
    if request.method == "POST":
        return "-"
    else:
        pass
        get_list_sql = "SELECT WISHLIST FROM USER WHERE USERNAME = ?"

        str_json = c.execute(get_list_sql, (userName,)).fetchall()[0][0]
        dict_json = json.loads(str_json)

        res = {}
        for k, v in dict_json.items():
            res[k] = list(v.keys())
        print(res.values())
        return res

if __name__ == "__main__":
    app.run(debug=True)