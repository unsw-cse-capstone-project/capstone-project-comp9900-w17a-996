import sqlite3
import datetime, time
import json

conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()
# c.execute(
#     "CREATE TABLE MOVIE (TITLE TEXT, DIRECTORS TEXT, ACTORS TEXT, GENRE TEXT, LANGUAGE TEXT, RELEASE_DATE TEXT, URL TEXT, MAINGENRE TEXT)"
# )
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
#             ("My perple, My Homeland(2020)", "Yimou Zhang", "Lei Huang, Wei Fan", "Melody",
#               "Chinese", "2020-10-01", "https://www.youtube.com/embed/LaThRLnFxxw?autoplay=0&loop=1&playlist=EMfebeQg2Z4&muted=1","Melody"))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
#             ("The Trial of the Chicago 7", "Aaron Sorkin", "Eddie Redmayne, Alex Sharp", "History, Drama",
#             "English", "2020-10-16", "https://www.youtube.com/embed/FVb6EdKDBfU", "History"))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
#             ("Clouds", "Justin Baldoni", "Fin Argus, Sabrina Carpenter", "Music, Drama, Biography",
#             "English", "2020-10-16", "https://www.youtube.com/embed/OWEgUhWU4g4", "Music"))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
#             ("The Forty-Year-Old Version", "Radha Blank", "Welker White, Reed Birney", "Comedy, Music, Drama",
#             "English", "2020-10-09", "https://www.youtube.com/embed/RRpGNnaDzeE", "Music"))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
#             ("Tales from the Hood 3", "Rusty Cundieff", "Tony Todd, Lynn Whitfield", "Horror",
#             "English", "2020-10-06" , "https://www.youtube.com/embed/Je0tug204FI", "Horror"))
# conn.commit()



"""user"""
# c.execute("DROP TABLE USER")
# c.execute("DROP TABLE REVIEW")

print("User:")

content = c.execute("SELECT * FROM USER").fetchall()
col_name = [t[0] for t in c.description]
print(col_name)
for i in content:
    print(i)

print("\n\nMovie:")
movies = c.execute("SELECT * FROM MOVIE").fetchall()
col_name = [t[0] for t in c.description]
print(col_name)
for i in movies:
    print(i)


print("\n\nReview:")
reviews = c.execute("SELECT * FROM REVIEW").fetchall()
col_name = [t[0] for t in c.description]
print(col_name)
for i in reviews:
    print(i)


conn.close()



# otherName = "Kong"
# search_sql = "SELECT * FROM REVIEW WHERE USER = ?"
# res = c.execute(search_sql, (otherName,)).fetchall()
# print(res)

