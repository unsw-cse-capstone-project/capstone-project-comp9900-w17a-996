from flask import Flask, render_template, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
import sqlite3
import os.path
import time
import datetime
import recommendation
import json

def get_followers(me, users):
    print(users)
    res = []
    for u in users:
        name = u[0]
        followers_str = u[6]
        followers = followers_str.split(" ")
        if me in followers:
            res.append({"user": name})
    return res


def get_rate_wihout_blockers(reviews, blockers):
    rating = 0.0
    counter = 0
    for review in reviews:
        if review[0] not in blockers:
            counter += 1
            rating += float(review[3])
    if counter == 0:
        rating = 0
    else:
        rating = round(rating / counter, 2)
    return rating


app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "filmFinder.db")
app.config["DATABASE"] = db_path

"""connect to data base"""
def connect_db():
    db = sqlite3.connect(app.config["DATABASE"], check_same_thread=False)
    return db

@app.route('/', methods=['GET'])
# @as_json
def default():
    return "Default Page of Backend"

"""register page, create user table and insert a new user"""
@app.route('/app', methods=['GET','POST'])
# @as_json
def api():
    if request.method=='GET':
        return ('<form action="/test" method="post"><input type="submit" value=a /></form>')

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
            c.execute("DROP TABLE REVIEWOFREVIEW")
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
        return "-"
    else:
        return ("ok")

"""login page, get user name and password then check with data in db"""
guid = {'username': '', 'nickname': '', 'email': '', 'password': '', 'bio': ''}
@app.route('/login', methods=['POST', 'GET'])
# @as_json
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
                # # print(guid)
                return result[0][3]
            else:
                guid['password'] = ''
                return '-'
        except sqlite3.OperationalError:
            guid['password'] = ''
            return '-'
    else:
        return jsonify(guid)

@app.route('/logout', methods=['POST', 'GET'])
def logout():
    if request.method == 'POST':
        guid['username'] = ""
        guid['nickname'] = ""
        guid['email'] = ""
        guid['password'] = ""
        guid['bio'] = ""
        return "Reset user"
    else:
        return "-"

@app.route('/home', methods=['GET'])
# @as_json
def home():
    return jsonify(guid)

# """search movie, get input from search bar and return related movies"""
# result = {"movies": []}
# @app.route('/search', methods=['POST', 'GET'])
# def search():
#     if request.method == 'POST':
#         data = request.get_json()
#         search_content = data["searchContent"]
 
#         db = connect_db()
#         c = db.cursor()
#         query_sql = "SELECT * FROM MOVIE"
#         result["movies"] = []

#         try:
#             movie_details = c.execute(query_sql).fetchall()

#             for detail in movie_details:
#                 if search_content in detail[0]:
#                     # sub_res = {"title": "", "director": "", "cast": "", "genre": "", "language": "", "date": ""}
#                     sub_res = {"title": "", "genre": ""}
#                     sub_res["title"] = detail[0]
#                     # sub_res["director"] = detail[1]
#                     # sub_res["cast"] = detail[2]
#                     sub_res["genre"] = detail[3]
#                     # sub_res["language"] = detail[4]
#                     # sub_res["date"] = detail[5]

#                     result["movies"].append(sub_res)
#                     # # # print(result)
#         except sqlite3.OperationalError:
#             pass
#         return search_content
#     else:
#         return result

"""profile page, update user info"""
@app.route('/profile', methods=['POST'])
# @as_json
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
        return jsonify(user_data)
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
movie_detail_res = {"movie": {"title": "", "director": "", "cast": "", "genre": "", "language": "", "date": "", "rating": "", "description":""}}
@app.route('/movieDetail', methods=['GET', 'POST'])
# @as_json
def movieDetail():
    
    if request.method == 'POST':
        title = request.get_json()["title"]
        # pass
        db = connect_db()
        c = db.cursor()
        details = c.execute("SELECT * FROM MOVIE WHERE TITLE == ?", (title,)).fetchall()
        # # # print("this is detail: ", details)
        movie_detail_res["movie"]["title"] = details[0][0]
        movie_detail_res["movie"]["director"] = details[0][1]
        movie_detail_res["movie"]["cast"] = details[0][2]
        movie_detail_res["movie"]["genre"] = details[0][3]
        movie_detail_res["movie"]["language"] = details[0][4]
        movie_detail_res["movie"]["date"] = details[0][5]
        movie_detail_res["movie"]["url"] = details[0][6]
        movie_detail_res["movie"]["rating"] = recommendation.cal_mark(title)
        movie_detail_res["movie"]["description"] = details[0][8]
        # # # print("detail result:", movie_detail_res)
        return jsonify(movie_detail_res)
    else:
        
        return jsonify(movie_detail_res)


@app.route('/history', methods=['GET', 'POST'])
# @as_json
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
            c.execute("DELETE FROM REVIEWOFREVIEW WHERE ORIGINALUSER = ? AND MOVIE = ?", (user, movie,))
            db.commit()
        # test code
        # query = "SELECT * FROM REVIEW"
        # content = c.execute(query).fetchall()
        # # # print(content)
        return "ok"
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
        return jsonify({"data": review_res})

"""history page, get user name and user action then post comments, rating"""
"""do not show review of people who is in block list"""
@app.route('/checkReview', methods=['GET', 'POST'])
# @as_json
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

        exist_review = c.execute("SELECT * FROM REVIEW WHERE USER = ? AND MOVIE = ?", (userName, movieTitle)).fetchall()

        if len(exist_review) < 1:
            c.execute("INSERT INTO REVIEW (USER, MOVIE, COMMENT, RATE, TIME, UPUSER, DOWNUSER, UPNUMBER, DOWNNUMBER ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            (userName, movieTitle,review,rating,time,'','','0','0'))
            db.commit()
        else:
            return "-"

        return "-"
    else:
        review_res = []
        movie_title = movie_detail_res['movie']['title']
        # # print("movie title:", movie_title)

        review_search_sql = "SELECT * FROM REVIEW WHERE MOVIE = ?"
        block_search_sql = "SELECT BLOCK FROM USER WHERE USERNAME = ?"
        
        try:
            reviews = c.execute(review_search_sql, (movie_title,)).fetchall()

            try:
                blockers = c.execute(block_search_sql, (guid["username"], )).fetchall()[0][0]
                b_l = blockers.split(" ")
                # # print("blockers:", b_l)
                
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

        # print("reviews", reviews)
        # print(review_res)

        # title = movie_detail_res["movie"]["title"]
        # movie_detail_res["movie"]["rating"] = recommendation.cal_mark(title)

        # # print({"user": review_res, "rating": total_rating / len(review_res)})
        if len(review_res) == 0:
            rate = 0.0
        else:
            rate = round(total_rating / len(review_res), 1)

        return jsonify({"user": review_res, "rating": rate})

"""movie page, add to wish list function, add to db"""
@app.route('/addtoWishList', methods=['POST'])
# @as_json
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
        # # print("this is a str json:", str_json[0], type(str_json[0]))

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
# @as_json
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
        # # print("dict+json:   ", dict_json)
        all_movie = list(dict_json[listID].keys())
        for movie in all_movie:
            if movie not in keep_movie:
                del dict_json[listID][movie]
        # # print("new dic_json:   ", dict_json)
        new_str = json.dumps(dict_json)

        update_sql = "UPDATE USER SET WISHLIST = ? WHERE USERNAME = ?"
        c.execute(update_sql, (new_str, userName,))

        db.commit()

        return "-"
    else:
        pass
        # get_list_sql = "SELECT WISHLIST FROM USER WHERE USERNAME = ?"

        # str_json = c.execute(get_list_sql, (userName,)).fetchall()[0][0]
        # dict_json = json.loads(str_json)

        res = {}
        for k, v in dict_json.items():
            res[k] = list(v.keys())
        # # # print(res.values())
        return jsonify(res)


otherUserName = {"content": ""}
"""user browse others wish list"""
@app.route("/otherWishList", methods=['POST', 'GET'])
# @as_json
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

        return jsonify({"wishlist": result})


otherUserName = {"content": ""}
"""user browse other review"""
@app.route("/otherReview", methods=["POST", "GET"])
# @as_json
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
        # # print(data)
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
        return jsonify({"data": review_res})


@app.route('/hotmovie', methods=['GET'])
# @as_json
def hotmovie():
    db = connect_db()
    c = db.cursor()

    user = guid["username"]
    try:
        blockers = c.execute("SELECT BLOCK FROM USER WHERE USERNAME = ?", (user, )).fetchall()[0][0]
        blockers = blockers.split(" ")[1:]
    except IndexError:
        blockers = []

    res = []
    # hot_movie ={}
    # movie_list = []
    movies = c.execute("SELECT * FROM MOVIE").fetchall()
    for n in range(len(movies)):
        title = movies[n][0]
        reviews = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (title, )).fetchall()
        rating = get_rate_wihout_blockers(reviews, blockers)

        hot_movie = {"title": title, "rating": rating}
        res.append(hot_movie)
        # movie_list.append(movies[n][0])
    

    # sort by rating
    res = sorted(res, key=lambda x: x["rating"], reverse=True)

    result = {"hotMovies": res}
    # hot_movie['hotMovies'] = recommendation.sort_film(movie_list)
    # print("hotmovie:\n", result)
    return jsonify(result)

"""follow another user"""
follow_block_action = {"action": "", "user": ""}
@app.route("/followUser", methods=["POST", "GET"])
# @as_json
def followUser():

    db = connect_db()
    c = db.cursor()

    if request.method == "POST":
        data = request.get_json()
        follow_block_action["action"] = data["action"]
        follow_block_action["user"] = data["user"]
        # # print("data", data)
        # return "-"
    # else:
        me = guid["username"]
        user = follow_block_action["user"]
        action = follow_block_action["action"]
        sql = "SELECT FOLLOW FROM USER WHERE USERNAME = ?"

        followers = c.execute(sql, (me, )).fetchall()[0][0]
        # # # print("data", data)
        # # print("followers:", followers)
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
        # # print("user", user)
        sql = "SELECT FOLLOW FROM USER WHERE USERNAME = ?"
        # # print("test 1111", c.execute(sql, (user, )).fetchall()[0])

        try:
            followers = c.execute(sql, (user, )).fetchall()[0][0]
            f_l = followers.split(" ")
        except IndexError:
            f_l = []
        
        otheruser = otherUserName["content"]
        if otheruser in f_l:
            return jsonify({"isfollower": True})
        else:
            return jsonify({"isfollower": False})

        

""""block another user"""
@app.route("/blockUser", methods=["POST", "GET"])
# @as_json
def blockUser():

    db = connect_db()
    c = db.cursor()

    if request.method == "POST":
        data = request.get_json()
        follow_block_action["action"] = data["action"]
        follow_block_action["user"] = data['user']
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
        # # print("test 1111", c.execute(sql, (user, )).fetchall()[0])
        try:
            blockers = c.execute(sql, (user, )).fetchall()[0][0]
            b_l = blockers.split(" ")
        except IndexError:
            b_l = []
        otheruser = otherUserName["content"]
        if otheruser in b_l:
            return jsonify({"isblocker": True})
        else:
            return jsonify({"isblocker": False})


recommendation_list = {}
choice = {'c': ''}
@app.route('/recommendmovie', methods=['GET', 'POST'])
def recommendmovie():
    db = connect_db()
    c = db.cursor()
    
    if request.method == 'POST':
        userName = guid['username']
        recommendation_list['recommendmovie'] = recommendation.recommend(userName)
        data = request.get_json()
        movie_title = movie_detail_res['movie']['title']
        genre = c.execute('SELECT * FROM MOVIE WHERE TITLE = ?', (movie_title,)).fetchall()[0][3]
        director = c.execute('SELECT * FROM MOVIE WHERE TITLE = ?', (movie_title,)).fetchall()[0][1]
        genre_list = genre.split(', ')
        director_list = director.split(', ')
        same_genre_list, same_genre_dic, final_result_genre = recommendation.recommendByGenre(genre_list, userName, movie_title)
        same_director_list, same_director_dic, final_result_director = recommendation.recommendByDirector(director_list, userName, movie_title)
        if data['choice'] == 'g':
            recommendation_list['recommendmovie'] = final_result_genre
            choice['c'] = 'g'
        elif data['choice'] == 'd':
            recommendation_list['recommendmovie'] = final_result_director
            choice['c'] = 'd'
        elif data['choice'] == 'dg':
            choice['c'] = 'dg'
            recommendation_list['recommendmovie'] = recommendation.recommendByGenreAndDirector(same_genre_list, same_genre_dic, same_director_list, same_director_dic)
        else:
            choice['c'] = 'no'
        
        return "-"
    
    else:
        if choice['c'] == '':
            userName = guid['username']
            return jsonify({'recommendmovie': recommendation.recommend(userName)})
        return jsonify(recommendation_list)


@app.route('/blocklist', methods=['GET', 'POST'])
# @as_json
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

    return jsonify({"blocks": res})


@app.route('/followinglist', methods=['GET', 'POST'])
# @as_json
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

    return jsonify({"followings": res})



# """search movie, get input from search bar and return related movies"""
# result = {"movies": []}
# @app.route('/search', methods=['POST', 'GET'])
# def search():
#     if request.method == 'POST':
#         data = request.get_json()
#         search_content = data["searchContent"]
 
#         db = connect_db()
#         c = db.cursor()
#         query_sql = "SELECT * FROM MOVIE"
#         result["movies"] = []

#         try:
#             movie_details = c.execute(query_sql).fetchall()

#             for detail in movie_details:
#                 if search_content in detail[0]:
#                     # sub_res = {"title": "", "director": "", "cast": "", "genre": "", "language": "", "date": ""}
#                     sub_res = {"title": "", "genre": ""}
#                     sub_res["title"] = detail[0]
#                     # sub_res["director"] = detail[1]
#                     # sub_res["cast"] = detail[2]
#                     sub_res["genre"] = detail[3]
#                     # sub_res["language"] = detail[4]
#                     # sub_res["date"] = detail[5]

#                     result["movies"].append(sub_res)
#                     # # # print(result)
#         except sqlite3.OperationalError:
#             pass
#         return search_content
#     else:
#         return result




"""search movie by genre, language, director, year"""
searchByOther_data = {"type": "", "content": ""}
@app.route("/searchByOther", methods=["GET", "POST"])
# @as_json
def searchByOther():
    if request.method == "POST":
        # post data: data = {"type": genre or language or director or year, "content": "Music or English or director or 2000"}
        data = request.get_json()
        searchByOther_data["type"] = data["type"]
        searchByOther_data["content"] = data["content"]
        
        return jsonify(searchByOther_data)
    else:
        db = connect_db()
        c = db.cursor()

        search_type = searchByOther_data["type"]
        search_content = searchByOther_data["content"]

        user = guid["username"]
        try:
            blockers = c.execute("SELECT BLOCK FROM USER WHERE USERNAME = ?", (user, )).fetchall()[0][0]
            blockers = blockers.split(" ")[1:]
        except IndexError:
            blockers = []

        default = 0

        if search_type == "Genre":
            res = []
            movies = c.execute("SELECT * FROM MOVIE").fetchall()
            genre = searchByOther_data["content"]
            for idx in range(len(movies)):
                item = {}
                genres = movies[idx][3].split(", ")
                title = movies[idx][0]

                reviews = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (title, )).fetchall()

                if genre in genres:
                    item = {"title": movies[idx][0],
                            "genre": movies[idx][3],
                            "rating": get_rate_wihout_blockers(reviews, blockers)}
                    res.append(item)

        elif search_type == "Language":

            res = []
            language = searchByOther_data["content"]
            movies = c.execute("SELECT * FROM MOVIE WHERE LANGUAGE = ?", (language,)).fetchall()

            for idx in range(len(movies)):
                reviews = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (movies[idx][0],)).fetchall()

                item = {"title": movies[idx][0],
                        "genre": movies[idx][3],
                        "rating": get_rate_wihout_blockers(reviews, blockers)}
                res.append(item)
                
        elif search_type == "Director":
            res = []
            director = searchByOther_data["content"]
            # # print("director", director)
            movies = c.execute("SELECT * FROM MOVIE").fetchall()
            # # print("movies", movies)
            for idx in range(len(movies)):
                directors = movies[idx][1].split(", ")
                if director in directors:
                    reviews = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (movies[idx][0], )).fetchall()
                    item = {"title": movies[idx][0],
                            "genre": movies[idx][3],
                            "rating": get_rate_wihout_blockers(reviews, blockers)}
                    res.append(item)
        elif search_type == "Year":
            # year
            res = []
            year = searchByOther_data["content"]
            movies = c.execute("SELECT * FROM MOVIE").fetchall()

            for idx in range(len(movies)):
                current_year = movies[idx][5][:4]
                if year == current_year:
                    reviews = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (movies[idx][0], )).fetchall()
                    item = {"title": movies[idx][0],
                            "genre": movies[idx][3],
                            "rating": get_rate_wihout_blockers(reviews, blockers)}
                    res.append(item)
        else:
            # default
            default = 1
            res_title, res_genre, res_des = [], [], []
            user_input = searchByOther_data["content"]
            movies = c.execute("SELECT * FROM MOVIE").fetchall()
            
            for idx in range(len(movies)):
                reviews = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (movies[idx][0], )).fetchall()
                if user_input in movies[idx][0]:
                    item = {"title": movies[idx][0],
                            "genre": movies[idx][3],
                            "rating": get_rate_wihout_blockers(reviews, blockers)}
                    res_title.append(item)
                if user_input in movies[idx][3]:
                    item = {"title": movies[idx][0],
                            "genre": movies[idx][3],
                            "rating": get_rate_wihout_blockers(reviews, blockers)}
                    res_genre.append(item)
                if user_input in movies[idx][8]:
                    # print("description:,", movies[idx][8])
                    item = {"title": movies[idx][0],
                            "genre": movies[idx][3],
                            "rating": get_rate_wihout_blockers(reviews, blockers)}
                    res_des.append(item)



        if default == 0:

            # sort by character
            res = sorted(res, key=lambda x: x["title"], reverse=False)

            # sort by rating
            res = sorted(res, key=lambda x: x["rating"], reverse=True)

        
        
            return jsonify({"movies": res})
        else:
            # sort by character
            res_title = sorted(res_title, key=lambda x: x["title"], reverse=False)
            res_genre = sorted(res_genre, key=lambda x: x["title"], reverse=False)
            res_des = sorted(res_des, key=lambda x: x["title"], reverse=False)

            # sort by rating
            res_title = sorted(res_title, key=lambda x: x["rating"], reverse=True)
            res_genre = sorted(res_genre, key=lambda x: x["rating"], reverse=True)
            res_des = sorted(res_des, key=lambda x: x["rating"], reverse=True)

            # print("res_title", res_title)
            # print("res_genre", res_genre)
            # print("res_des", res_des)

            # print("result................", {"title": res_title, "genre": res_genre, "description": res_des})
            return jsonify({"title": res_title, "genre": res_genre, "description": res_des})
            


import dianzan

@app.route("/thumbupordown", methods=["GET", "POST"])
# @as_json
def thumbupordown():
    db = connect_db()
    c = db.cursor()
    if request.method == 'POST':
        json_data = request.get_json()
        user_name = guid['username']
        comment_user = json_data['commentuser']
        movie = json_data['movie']
        
        # if user trying to thumb up  
        if json_data['like'] == '1':
            dianzan.thumb_up(comment_user, movie, user_name)
            # if user trying to thumb up and in the thumb down list 
            if dianzan.check_thumb(comment_user, movie, user_name, 'down'):
                dianzan.cancel_thumb_down(comment_user, movie, user_name)
            return 'up'
        
        elif json_data['like'] == '0':
            dianzan.thumb_down(comment_user, movie, user_name)
            if dianzan.check_thumb(comment_user, movie, user_name, 'up'):
                dianzan.cancel_thumb_up(comment_user, movie, user_name)
            return 'down'
    
    else:
        movie_title = movie_detail_res['movie']['title']
        result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (movie_title,)).fetchall()
        dic = {}
        dic['thumb_count'] = {}
        user_name = guid['username']
        dic['login_user'] = user_name
        for n in range(len(result)):
            user = result[n][0]
            up_count = result[n][7]
            down_count = result[n][8]
            tmp_dic = {}
            tmp_dic['up'] = up_count
            tmp_dic['down'] = down_count
            tmp_dic['already_up'] = dianzan.check_thumb(user, movie_title, user_name, 'up')
            tmp_dic['already_down'] = dianzan.check_thumb(user, movie_title, user_name, 'down')
            tmp_dic2 = {}
            tmp_dic2[user] = tmp_dic
            dic['thumb_count'][user] = tmp_dic
        return jsonify(dic)


import random
import string

def rando():
    random_id = ''.join(random.sample(string.ascii_letters + string.digits, 6))
    return random_id

@app.route("/replyReview", methods=["GET", "POST"])
# @as_json
def replyreview():
    if request.method == 'POST':
        db = connect_db()
        c = db.cursor()
        json_data = request.get_json()
        uid = rando()
        username = guid['username']
        original_user = json_data['commentuser']
        movie = json_data['movie']
        comment = json_data['comment']
        time = str(datetime.datetime.now())[:19]

        c.execute("INSERT INTO REVIEWOFREVIEW (ID, ORIGINALUSER, REPLYUSER, MOVIE, COMMENT, TIME) VALUES (?, ?, ?, ?, ?, ?)",
        (uid, original_user, username, movie, comment, time))
        db.commit()
        return 'success'

    else:
        db = connect_db()
        c = db.cursor()
        movie_title = movie_detail_res['movie']['title']
        # print(movie_title)
        result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (movie_title,)).fetchall()
        # print(result)
        user_list = []
        dic = {}
        dic['reply'] = {}
        for n in range(len(result)):
            user_list.append(result[n][0])
        for user in user_list:
            #tmp_dic = {}
            dic['reply'][user] = []
            reply = c.execute("SELECT * FROM REVIEWOFREVIEW WHERE ORIGINALUSER = ? AND MOVIE = ?", (user, movie_title,)).fetchall()
            for n in range(len(reply)):
                tmp_dic_2 = {}
                tmp_dic_2['reply_user'] = reply[n][2]
                tmp_dic_2['comment'] = reply[n][4]
                tmp_dic_2['date'] = reply[n][5]
                dic['reply'][user].append(tmp_dic_2)
            #dic['reply'][user]=tmp_dic
        return jsonify(dic)


"""get followers of current user"""
@app.route("/showFollowers", methods=["GET", "POST"])
def showFollowers():
    if request.method == "GET":
        me = guid["username"]
        db = connect_db()
        c = db.cursor()
        all_user = c.execute("SELECT * FROM USER").fetchall()

        my_followers = get_followers(me, all_user)

        return jsonify({"followers": my_followers})


if __name__ == "__main__":
    app.run(
    host='0.0.0.0', port=5001, debug=True)
