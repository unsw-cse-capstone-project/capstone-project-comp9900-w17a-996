import sqlite3
import datetime, time
import json

conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()
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
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("Fifty Shades of Grey", "Sam Taylor-Johnson", "Dakota Johnson, Jamie Dornan, Jennifer Ehle", "Drama, Romance, Thriller", 
            "English", "2015-02-12", "https://www.youtube.com/embed/SfZWFDs0LxA","Drama"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("Fifty Shades Freed", "James Foley", "Dakota Johnson, Jamie Dornan", "Drama, Romance, Thriller", 
            "English", "2018-02-08", "https://www.youtube.com/embed/av4zbG8dAhk","Drama"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("Avengers: Endgame", "Anthony Russo, Joe Russo", "Robert Downey Jr., Chris Evans, Mark Ruffalo", "Action, Adventure, Drama", 
            "English", "2019-04-24", "https://www.youtube.com/embed/TcMBFSGVi1c","Action"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("Avengers: Infinity War","Anthony Russo, Joe Russo", "Robert Downey Jr., Chris Evans, Mark Ruffalo", "Action, Adventure, Drama", 
            "English", "2018-05-11", "https://www.youtube.com/embed/SfZWFDs0LxA","Action"))
c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
            ("Goodbye Mr. Loser", "Yan Fei, Peng Damo", "Shen Teng, Ma Li, Yin Zheng, Ai Lun", "Comedy", 
              "Chinese", "2015-09-30", "https://www.youtube.com/embed/tBzfZORwu2s","Comedy"))
conn.commit()





"""user"""
# c.execute("DROP TABLE USER")
# c.execute("DROP TABLE REVIEW")

print("User:")
content = c.execute("SELECT * FROM USER").fetchall()
for i in content:
    print(i)

# print("Movie:")
# movies = c.execute("SELECT * FROM MOVIE").fetchall()
# for i in movies:
#     print(i)


print("Review:")
reviews = c.execute("SELECT * FROM REVIEW").fetchall()
for i in reviews:
    print(i)


conn.close()



# otherName = "Kong"
# search_sql = "SELECT * FROM REVIEW WHERE USER = ?"
# res = c.execute(search_sql, (otherName,)).fetchall()
# print(res)

