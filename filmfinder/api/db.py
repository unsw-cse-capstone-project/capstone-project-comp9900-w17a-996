import sqlite3
import datetime, time
conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()

"""user"""
print("User:")
content = c.execute("SELECT * FROM USER").fetchall()
for i in content:
    print(i)


"""movie part"""
c.execute("DROP TABLE MOVIE")
c.execute(
    "CREATE TABLE MOVIE (TITLE TEXT, DIRECTORS TEXT, ACTORS TEXT, GENRE TEXT, LANGUAGE TEXT, RELEASE_DATE TEXT)"
)
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
              ("My perple, My Homeland(2020)", "Yimou Zhang", "Lei Huang, Wei Fan", "melody", "Chinese", "2020-10-01"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
          ("The Trial of the Chicago 7", "Aaron Sorkin", "Eddie Redmayne, Alex Sharp", "History, Drama", "English", "2020-10-16"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
          ("Clouds", "Justin Baldoni", "Fin Argus, Sabrina Carpenter", "Music, Drama, Biography", "English", "2020-10-16"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
          ("The Forty-Year-Old Version", "Radha Blank", "Welker White, Reed Birney", "Comedy, Music, Drama", "English", "2020-10-09"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE) VALUES(?, ?, ?, ?, ?, ?)",
          ("Tales from the Hood 3", "Rusty Cundieff", "Tony Todd, Lynn Whitfield", "Horror", "English", "2020-10-06"))
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
