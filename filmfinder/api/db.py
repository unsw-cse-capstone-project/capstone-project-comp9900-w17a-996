import sqlite3
import datetime, time
import json

conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()

"""user"""
# c.execute("DROP TABLE USER")
# c.execute(
#                 "CREATE TABLE USER (USERNAME TEXT, NICKNAME TEXT, EMAIL TEXT, PASSWORD TEXT, BIO TEXT, WISHLIST TEXT)"
#             )
# c.execute(
#             "INSERT INTO USER (USERNAME, NICKNAME, EMAIL, PASSWORD, BIO, WISHLIST) VALUES(?, ?, ?, ?, ?, ?)",
#             ("Kong", "wukong", "12345@qq.com", "12345", "this is a test bio", "")
#         )
conn.commit()
print("User:")
content = c.execute("SELECT * FROM USER").fetchall()
for i in content:
    print(i)


"""movie part"""
c.execute("DROP TABLE MOVIE")
# c.execute(
#     "CREATE TABLE MOVIE (TITLE TEXT, DIRECTORS TEXT, ACTORS TEXT, GENRE TEXT, LANGUAGE TEXT, RELEASE_DATE TEXT)"
# )
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
#               ("My perple, My Homeland(2020)", "Yimou Zhang", "Lei Huang, Wei Fan", "melody", "Chinese", "2020-10-01"))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
#           ("The Trial of the Chicago 7", "Aaron Sorkin", "Eddie Redmayne, Alex Sharp", "History, Drama", "English", "2020-10-16"))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
#           ("Clouds", "Justin Baldoni", "Fin Argus, Sabrina Carpenter", "Music, Drama, Biography", "English", "2020-10-16"))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
#           ("The Forty-Year-Old Version", "Radha Blank", "Welker White, Reed Birney", "Comedy, Music, Drama", "English", "2020-10-09"))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
#           ("Tales from the Hood 3", "Rusty Cundieff", "Tony Todd, Lynn Whitfield", "Horror", "English", "2020-10-06"))
c.execute(
    "CREATE TABLE MOVIE (TITLE TEXT, DIRECTORS TEXT, ACTORS TEXT, GENRE TEXT, LANGUAGE TEXT, RELEASE_DATE TEXT, URL TEXT, MAINGENRE TEXT)"
)
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("My perple, My Homeland(2020)", "Yimou Zhang", "Lei Huang, Wei Fan", "Melody", 
              "Chinese", "2020-10-01", "https://www.youtube.com/embed/LaThRLnFxxw?autoplay=0&loop=1&playlist=EMfebeQg2Z4&muted=1","Melody"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("The Trial of the Chicago 7", "Aaron Sorkin", "Eddie Redmayne, Alex Sharp", "History, Drama", 
            "English", "2020-10-16", "https://www.youtube.com/embed/FVb6EdKDBfU", "History"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("Clouds", "Justin Baldoni", "Fin Argus, Sabrina Carpenter", "Music, Drama, Biography", 
            "English", "2020-10-16", "https://www.youtube.com/embed/OWEgUhWU4g4", "Music"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("The Forty-Year-Old Version", "Radha Blank", "Welker White, Reed Birney", "Comedy, Music, Drama", 
            "English", "2020-10-09", "https://www.youtube.com/embed/RRpGNnaDzeE", "Music"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("Tales from the Hood 3", "Rusty Cundieff", "Tony Todd, Lynn Whitfield", "Horror", 
            "English", "2020-10-06" , "https://www.youtube.com/embed/Je0tug204FI", "Horror"))
conn.commit()
print("Movie:")
movies = c.execute("SELECT * FROM MOVIE").fetchall()
for i in movies:
    print(i)


"""review part"""
c.execute("DROP TABLE REVIEW")
c.execute(
    "CREATE TABLE REVIEW (USER TEXT, MOVIE TEXT, COMMENT TEXT, RATE TEXT, TIME TEXT)"
)
c.execute("INSERT INTO REVIEW (USER, MOVIE, COMMENT, RATE, TIME) VALUES (?, ?, ?, ?, ?)",
          ("Kong", "Clouds", "Clouds comment from Kong", "4", str(datetime.datetime.now())[:19]))
c.execute("INSERT INTO REVIEW (USER, MOVIE, COMMENT, RATE, TIME) VALUES (?, ?, ?, ?, ?)",
          ("Binbin", "Clouds", "Clouds comment from Binbin", "2", "2020-10-21 22:10:52"))
c.execute("INSERT INTO REVIEW (USER, MOVIE, COMMENT, RATE, TIME) VALUES (?, ?, ?, ?, ?)",
          ("Kong", "Tales from the Hood 3", "Tales comment from Kong", "3", "2020-10-21 23:13:56"))
conn.commit()
print("Review:")
reviews = c.execute("SELECT * FROM REVIEW").fetchall()
for i in reviews:
    print(i)


# temp = {"genre1": {"movie1": "time", "movie2": "time"}, "genre2": {"movie3": "time3", "movie4": "time4"}}
# str_json = json.dumps(temp)
# print(type(str_json), str_json, str_json[0])
# dict_json = json.loads(str_json)
# print(dict_json["genre1"]["movie1"])
otherName = "Kong"
search_sql = "SELECT * FROM REVIEW WHERE USER = ?"
res = c.execute(search_sql, (otherName,)).fetchall()
print(res)

