from flask import Flask, render_template, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
import sqlite3
import os.path
import time
import datetime
import recommendation
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

        # create User table
        try:
            c.execute(
                "CREATE TABLE USER (USERNAME TEXT PRIMARY KEY, NICKNAME TEXT, EMAIL TEXT, PASSWORD TEXT, BIO TEXT, WISHLIST TEXT, FOLLOW TEXT, BLOCK TEXT)"
            )
            db.commit()
        except sqlite3.OperationalError:
            pass 

        # create Review table
        try:
            c.execute(
                "CREATE TABLE REVIEW (USER TEXT, MOVIE TEXT, COMMENT TEXT, RATE TEXT, TIME TEXT, UPUSER TEXT, DOWNUSER TEXT, UPNUMBER TEXT, DOWNNUMBER TEXT)"
            )
            db.commit()
        except sqlite3.OperationalError:
            pass 

        # create reviewofreview table
        try:
            c.execute(
                "CREATE TABLE REVIEWOFREVIEW (ID TEXT PRIMARY KEY, ORIGINALUSER TEXT, REPLYUSER TEXT, MOVIE TEXT, COMMENT TEXT, TIME TEXT)"
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
            "INSERT INTO USER (USERNAME, NICKNAME, EMAIL, PASSWORD, BIO, WISHLIST, FOLLOW, BLOCK) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", 
            (user_data["userName"], user_data["nickName"], user_data["email"], user_data["password"], user_data["bio"], wishlists, "", "")
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
                # print(guid)
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
                    # # print(result)
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
            "INSERT INTO USER (USERNAME, NICKNAME, EMAIL, PASSWORD, BIO, WISHLIST, FOLLOW, BLOCK) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", 
            (user_data["username"], user_data["nickname"], user_data["email"], user_data["password"], user_data["bio"], "", "", "")
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
movie_detail_res = {"movie": {"title": "", "director": "", "cast": "", "genre": "", "language": "", "date": "", "rating": ""}}
@app.route('/movieDetail', methods=['GET', 'POST'])
def movieDetail():
    
    if request.method == 'POST':
        title = request.get_json()["title"]
        # pass
        db = connect_db()
        c = db.cursor()
        details = c.execute("SELECT * FROM MOVIE WHERE TITLE == ?", (title,)).fetchall()
        # # print("this is detail: ", details)
        movie_detail_res["movie"]["title"] = details[0][0]
        movie_detail_res["movie"]["director"] = details[0][1]
        movie_detail_res["movie"]["cast"] = details[0][2]
        movie_detail_res["movie"]["genre"] = details[0][3]
        movie_detail_res["movie"]["language"] = details[0][4]
        movie_detail_res["movie"]["date"] = details[0][5]
        movie_detail_res["movie"]["url"] = details[0][6]
        movie_detail_res["movie"]["rating"] = recommendation.cal_mark(title)
        # # print("detail result:", movie_detail_res)
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
        
        # edit
        if data["operator"] == "e":
            new_rating = data["editedRating"]
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
        # # print(content)
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
"""do not show review of people who is in block list"""
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

        c.execute("INSERT INTO REVIEW (USER, MOVIE, COMMENT, RATE, TIME, UPUSER, DOWNUSER, UPNUMBER, DOWNNUMBER ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        (userName, movieTitle,review,rating,time,'','','0','0'))
        db.commit()

        return request.get_json()
    else:
        review_res = []
        movie_title = movie_detail_res['movie']['title']
        # print("movie title:", movie_title)

        review_search_sql = "SELECT * FROM REVIEW WHERE MOVIE = ?"
        block_search_sql = "SELECT BLOCK FROM USER WHERE USERNAME = ?"
        
        try:
            reviews = c.execute(review_search_sql, (movie_title,)).fetchall()

            try:
                blockers = c.execute(block_search_sql, (guid["username"], )).fetchall()[0][0]
                b_l = blockers.split(" ")
                # print("blockers:", b_l)
                
                for review in reviews:
                    if review[0] in b_l:
                        continue
                    item = {"userName": review[0], 
                            "reviewTime": review[4], 
                            "rating": review[3],
                            "review": review[2],
                            }
                
                    review_res.append(item)
            except IndexError:

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
        total_rating = 0
        for review in review_res:
            total_rating += float(review["rating"])
            review["key"] = str(counter)
            counter += 1

        print("reviews", reviews)
        print(review_res)

        # title = movie_detail_res["movie"]["title"]
        # movie_detail_res["movie"]["rating"] = recommendation.cal_mark(title)

        # print({"user": review_res, "rating": total_rating / len(review_res)})
        if len(review_res) == 0:
            rate = 0.0
        else:
            rate = round(total_rating / len(review_res), 1)

        return {"user": review_res, "rating": rate}

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
        # print("this is a str json:", str_json[0], type(str_json[0]))

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

    get_list_sql = "SELECT WISHLIST FROM USER WHERE USERNAME = ?"

    str_json = c.execute(get_list_sql, (userName,)).fetchall()[0][0]
    dict_json = json.loads(str_json)

    if request.method == "POST":
        data = request.get_json()
        keep_movie = data["content"]
        listID = str(data["listid"])
        # print("dict+json:   ", dict_json)
        all_movie = list(dict_json[listID].keys())
        for movie in all_movie:
            if movie not in keep_movie:
                del dict_json[listID][movie]
        # print("new dic_json:   ", dict_json)
        new_str = json.dumps(dict_json)

        update_sql = "UPDATE USER SET WISHLIST = ? WHERE USERNAME = ?"
        c.execute(update_sql, (new_str, userName,))

        db.commit()

        return request.get_json()
    else:
        pass
        # get_list_sql = "SELECT WISHLIST FROM USER WHERE USERNAME = ?"

        # str_json = c.execute(get_list_sql, (userName,)).fetchall()[0][0]
        # dict_json = json.loads(str_json)

        res = {}
        for k, v in dict_json.items():
            res[k] = list(v.keys())
        # # print(res.values())
        return res


otherUserName = {"content": ""}
"""user browse others wish list"""
@app.route("/otherWishList", methods=['POST', 'GET'])
def otherWishList():
    db = connect_db()
    c = db.cursor()
    
    
    # get another username from front end
    if request.method == "POST":
        data = request.get_json()
        otherUserName["content"] = data["otherName"]
        return "-"
    else:
        otherName = otherUserName["content"]
        search_sql = "SELECT WISHLIST FROM USER WHERE USERNAME = ?"

        str_json = c.execute(search_sql, (otherName,)).fetchall()[0][0]
        dict_json = json.loads(str_json)

        
        result = []
        for key, value in dict_json.items():
            res = {}
            res["title"] = key
            res["movies"] = list(value.keys())
            result.append(res)

        return {"wishlist": result}


otherUserName = {"content": ""}
"""user browse other review"""
@app.route("/otherReview", methods=["POST", "GET"])
def otherReview():
    db = connect_db()
    c = db.cursor()
    
    # get another username from front end
    if request.method == "POST":
        data = request.get_json()
        otherUserName["content"] = data["otherName"]
        return "-"
    else:
        otherName = otherUserName["content"]
        search_sql = "SELECT * FROM REVIEW WHERE USER = ?"

        data = c.execute(search_sql, (otherName,)).fetchall()
        # print(data)
        review_res = []

        try:
            
            reviews = c.execute(search_sql, (otherName,)).fetchall()
            for review in reviews:
                item = {"movieName": review[1], 
                        "reviewTime": review[4], 
                        "rating": review[3],
                        "review": review[2]}
                
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


@app.route('/hotmovie', methods=['GET'])
def hotmovie():
    db = connect_db()
    c = db.cursor()
    hot_movie ={}
    movie_list = []
    movies = c.execute("SELECT * FROM MOVIE").fetchall()
    for n in range(len(movies)):
        movie_list.append(movies[n][0])
    
    hot_movie['hotMovies'] = recommendation.sort_film(movie_list)
    return hot_movie

"""follow another user"""
follow_block_action = {"action": "", "user": ""}
@app.route("/followUser", methods=["POST", "GET"])
def followUser():

    db = connect_db()
    c = db.cursor()

    if request.method == "POST":
        data = request.get_json()
        follow_block_action["action"] = data["action"]
        follow_block_action["user"] = otherUserName['content']
        # print("data", data)
        # return "-"
    # else:
        me = guid["username"]
        user = follow_block_action["user"]
        action = follow_block_action["action"]
        sql = "SELECT FOLLOW FROM USER WHERE USERNAME = ?"

        followers = c.execute(sql, (me, )).fetchall()[0][0]
        # # print("data", data)
        # print("followers:", followers)
        if action == "f":
            followers = followers + " " + user
            update_sql = "UPDATE USER SET FOLLOW = ? WHERE USERNAME = ?"
            c.execute(update_sql, (followers, me))
            db.commit()
        else:
            f_l = followers.split(" ")
            f_l.remove(user)
            followers = " ".join(f_l)
            update_sql = "UPDATE USER SET FOLLOW = ? WHERE USERNAME = ?"
            c.execute(update_sql, (followers, me))
            db.commit()
        return "-"
    else:
        user = guid['username']
        # user = follow_block_action["user"]
        # print("user", user)
        sql = "SELECT FOLLOW FROM USER WHERE USERNAME = ?"
        # print("test 1111", c.execute(sql, (user, )).fetchall()[0])
        followers = c.execute(sql, (user, )).fetchall()[0][0]
        f_l = followers.split(" ")
        otheruser = otherUserName["content"]
        if otheruser in f_l:
            return {"isfollower": True}
        else:
            return {"isfollower": False}

        

""""block another user"""
@app.route("/blockUser", methods=["POST", "GET"])
def blockUser():

    db = connect_db()
    c = db.cursor()

    if request.method == "POST":
        data = request.get_json()
        follow_block_action["action"] = data["action"]
        follow_block_action["user"] = otherUserName['content']
        # return "-"
    # else:
        
        me = guid["username"]
        user = follow_block_action["user"]
        action = follow_block_action["action"]
        sql = "SELECT BLOCK FROM USER WHERE USERNAME = ?"

        blockers = c.execute(sql, (me, )).fetchall()[0][0]
        if action == "b":
            blockers = blockers + " " + user
            update_sql = "UPDATE USER SET BLOCK = ? WHERE USERNAME = ?"
            c.execute(update_sql, (blockers, me))
            db.commit()
        else:
            b_l = blockers.split(" ")
            b_l.remove(user)
            blockers = " ".join(b_l)
            update_sql = "UPDATE USER SET BLOCK = ? WHERE USERNAME = ?"
            c.execute(update_sql, (blockers, me))
            db.commit()
        return "-"
    else:
        user = guid['username']
        # user = follow_block_action["user"]
        sql = "SELECT BLOCK FROM USER WHERE USERNAME = ?"
        # print("test 1111", c.execute(sql, (user, )).fetchall()[0])
        blockers = c.execute(sql, (user, )).fetchall()[0][0]
        b_l = blockers.split(" ")
        otheruser = otherUserName["content"]
        if otheruser in b_l:
            return {"isblocker": True}
        else:
            return {"isblocker": False}

@app.route('/recommendmovie', methods=['GET'])
def recommendmovie():
    userName = guid['username']
    recommendation_list = {}
    recommendation_list['recommendmovie'] = recommendation.recommend(userName)
    return recommendation_list

@app.route('/blocklist', methods=['GET', 'POST'])
def blocklist():
    db = connect_db()
    c = db.cursor()

    user = guid["username"]
    sql = "SELECT BLOCK FROM USER WHERE USERNAME = ?"

    blockers = c.execute(sql, (user, )).fetchall()[0][0]
    b_l = blockers.split(" ")

    b_l = b_l[1:]

    res = []
    for b in b_l:
        res.append({"user": b})

    return {"blocks": res}

@app.route('/followinglist', methods=['GET', 'POST'])
def followinglist():
    db = connect_db()
    c = db.cursor()

    user = guid["username"]
    sql = "SELECT FOLLOW FROM USER WHERE USERNAME = ?"

    followers = c.execute(sql, (user, )).fetchall()[0][0]
    f_l = followers.split(" ")

    f_l = f_l[1:]

    res = []
    for f in f_l:
        res.append({"user": f})

    return {"followings": res}


"""search movie by genre, language, director, year"""
searchByOther_data = {"type": "", "content": ""}
@app.route("/searchByOther", methods=["GET", "POST"])
def searchByOther():
    if request.method == "POST":
        # post data: data = {"type": genre or language or director or year, "content": "Music or English or director or 2000"}
        data = request.get_json()
        searchByOther_data["type"] = data["type"]
        searchByOther_data["content"] = data["content"]
        
        return searchByOther_data
    else:
        db = connect_db()
        c = db.cursor()

        search_type = searchByOther_data["type"]
        search_content = searchByOther_data["content"]

        if search_type == "genre":
            res = []
            movies = c.execute("SELECT * FROM MOVIE").fetchall()
            genre = searchByOther_data["content"]
            for idx in range(len(movies)):
                item = {}
                genres = movies[idx][3].split(", ")
                title = movies[idx][0]
                if genre in genres:
                    item = {"title": movies[idx][0],
                            "genre": movies[idx][3],
                            "rating": recommendation.cal_mark(movies[idx][0])}
                    res.append(item)

        elif search_type == "language":

            res = []
            language = searchByOther_data["content"]
            movies = c.execute("SELECT * FROM MOVIE WHERE LANGUAGE = ?", (language,)).fetchall()

            for idx in range(len(movies)):
                item = {"title": movies[idx][0],
                        "genre": movies[idx][3],
                        "rating": recommendation.cal_mark(movies[idx][0])}
                res.append(item)
                
        elif search_type == "director":
            res = []
            director = searchByOther_data["content"]
            movies = c.execute("SELECT * FROM MOVIE WHERE DIRECTORS = ?", (director,)).fetchall()

            for idx in range(len(movies)):
                item = {"title": movies[idx][0],
                        "genre": movies[idx][3],
                        "rating": recommendation.cal_mark(movies[idx][0])}
                res.append(item)
        else:
            # year
            res = []
            year = searchByOther_data["content"]
            movies = c.execute("SELECT * FROM MOVIE").fetchall()

            for idx in range(len(movies)):
                current_year = movies[idx][5][:4]
                if year == current_year:
                    item = {"title": movies[idx][0],
                            "genre": movies[idx][3],
                            "rating": recommendation.cal_mark(movies[idx][0])}
                    res.append(item)

        
        # sort by rating
        res = sorted(res, key=lambda x: x["rating"], reverse=False)

        return {"data": res}

import dianzan

@app.route("/thumbupordown", method=["GET", "POST"])
def thumbupordown():
    db = connect_db()
    c = db.cursor()
    if request.method == 'POST':
        json_data = request.get_json()
        user_name = guid['username']
        comment_user = json_data[]
        movie = json_data[]
        
        # if user trying to thumb up  
        if json_data[] == '1':
            dianzan.thumb_up(comment_user, movie, user_name)
            # if user trying to thumb up and in the thumb down list 
            if dianzan.check_thumb(comment_user, movie, user_name, 'down'):
                dianzan.cancel_thumb_down(comment_user, movie, user_name)
        
        elif json_data[] == '0':
            dianzan.thumb_down(comment_user, movie, user_name)
            if dianzan.check_thumb(comment_user, movie, user_name, 'up'):
                dianzan.cancel_thumb_up(comment_user, movie, user_name)
    
    else:
        movie_title = movie_detail_res['movie']['title']
        result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (movie_title,)).fetchall()
        dic = {}
        dic['thumb_count'] = []
        for n in range(len(result)):
            user = result[n][0]
            up_count = result[n][7]
            down_count = result[n][8]
            tmp_dic = {}
            tmp_dic['up'] = up_count
            tmp_dic['down'] = down_count
            tmp_dic2 = {}
            tmp_dic2[user] = tmp_dic
            dic['thumb_count'].append(tmp_dic2)
        
        return dic


import random
import string

def rando():
    random = ''.join(random.sample(string.ascii_letters + string.digits, 6))
    return random

@app.route("/replyReview", methods=["GET", "POST"])
def replyreview():
    if request.method == 'POST':
        db = connect_db()
        c = db.cursor()
        json_data = request.get_json()
        uid = rando()
        username = guid['username']
        original_user = json_data[]
        movie = json_data[]
        comment = json_data[]
        time = str(datetime.datetime.now())[:19]

        c.execute("INSERT INTO REVIEWOFREVIEW (ID, ORIGINALUSER, REPLYUSER, MOVIE, COMMENT, TIME) VALUES (?, ?, ?, ?, ?, ?)",
        (uid, original_user, username, movie, comment, time))
        db.commit()

    else:
        movie_title = movie_detail_res['movie']['title']
        result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (movie_title,)).fetchall()
        user_list = []
        dic = {}
        dic['reply'] = []
        for n in range(len(result)):
            user_list.append(result[n][0])
        for user in user_list:
            tmp_dic = {}
            tmp_dic[user] = []
            reply = c.execute("SELECT * FROM REVIEWOFREVIEW WHERE ORIGINALUSER = ?", (user,)).fetchall()
            for n in range(len(reply)):
                tmp_dic_2 = {}
                tmp_dic_2['reply_user'] = reply[n][2]
                tmp_dic_2['comment'] = reply[n][4]
                tmp_dic_2['date'] = reply[n][5]
                tmp_dic[user].append(tmp_dic_2)
            dic['reply'].append(tmp_dic)
        return dic






if __name__ == "__main__":
    app.run(debug=True)
