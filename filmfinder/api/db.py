import sqlite3
import datetime, time
import json

conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()
# c.execute(
#     "CREATE TABLE MOVIE (TITLE TEXT, DIRECTORS TEXT, ACTORS TEXT, GENRE TEXT, LANGUAGE TEXT, RELEASE_DATE TEXT, URL TEXT, MAINGENRE TEXT, DESCRIPTION TEXT)"
# )
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("My people, My Homeland(2020)", "Yimou Zhang", "Lei Huang, Wei Fan", "Melody",
#               "Chinese", "2020-10-01", "https://www.youtube.com/embed/LaThRLnFxxw?autoplay=0&loop=1&playlist=EMfebeQg2Z4&muted=1","Melody",
#              "In different parts of rural China, various people explore what makes their communities unique."))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("The Trial of the Chicago 7", "Aaron Sorkin", "Eddie Redmayne, Alex Sharp", "History, Drama",
#             "English", "2020-10-16", "https://www.youtube.com/embed/FVb6EdKDBfU", "History",
#              "The story of 7 people on trial stemming from various charges surrounding the uprising at the 1968 Democratic National Convention in Chicago, Illinois."))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("Clouds", "Justin Baldoni", "Fin Argus, Sabrina Carpenter", "Music, Drama, Biography",
#             "English", "2020-10-16", "https://www.youtube.com/embed/OWEgUhWU4g4", "Music",
#              "Young musician Zach Sobiech discovers his cancer has spread, leaving him just a few months to live. With limited time, he follows his dream and makes an album, unaware that it will soon be a viral music phenomenon."))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("The Forty-Year-Old Version", "Radha Blank", "Welker White, Reed Birney", "Comedy, Music, Drama",
#             "English", "2020-10-09", "https://www.youtube.com/embed/RRpGNnaDzeE", "Music",
#              "Radha is a down-on-her-luck NY playwright, who is desperate for a breakthrough before 40. Reinventing herself as rapper RadhaMUSPrime, she vacillates between the worlds of Hip Hop and theater in order to find her true voice."))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("Tales from the Hood 3", "Rusty Cundieff", "Tony Todd, Lynn Whitfield", "Horror",
#             "English", "2020-10-06" , "https://www.youtube.com/embed/Je0tug204FI", "Horror",
#              "A funeral director tells four strange tales of horror with an African American focus to three drug dealers he traps in his place of business."))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("Fifty Shades of Grey", "Sam Taylor-Johnson", "Dakota Johnson, Jamie Dornan, Jennifer Ehle", "Drama, Romance, Thriller",
#             "English", "2015-02-12", "https://www.youtube.com/embed/SfZWFDs0LxA","Drama",
#              "Literature student Anastasia Steele's life changes forever when she meets handsome, yet tormented, billionaire Christian Grey."))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("Fifty Shades Freed", "James Foley", "Dakota Johnson, Jamie Dornan", "Drama, Romance, Thriller",
#             "English", "2018-02-08", "https://www.youtube.com/embed/av4zbG8dAhk","Drama",
#              "Anastasia and Christian get married, but Jack Hyde continues to threaten their relationship."))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("Avengers: Endgame", "Anthony Russo, Joe Russo", "Robert Downey Jr., Chris Evans, Mark Ruffalo", "Action, Adventure, Drama",
#             "English", "2019-04-24", "https://www.youtube.com/embed/TcMBFSGVi1c","Action",
#              "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe."))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("Avengers: Infinity War","Anthony Russo, Joe Russo", "Robert Downey Jr., Chris Evans, Mark Ruffalo", "Action, Adventure, Drama",
#             "English", "2018-05-11", "https://www.youtube.com/embed/SfZWFDs0LxA","Action",
#              "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe."))
# c.execute("INSERT INTO MOVIE (TITLE, DIRECTORS, ACTORS, GENRE, LANGUAGE, RELEASE_DATE, URL, MAINGENRE, DESCRIPTION) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
#             ("Goodbye Mr. Loser", "Yan Fei, Peng Damo", "Shen Teng, Ma Li, Yin Zheng, Ai Lun", "Comedy",
#               "Chinese", "2015-09-30", "https://www.youtube.com/embed/tBzfZORwu2s","Comedy",
#              "After attending a wedding of his high school crush Qiuya, Xia Luo (Shen Teng) gets drunk embarrassing himself and angers his wife Ma Dongmei (Ma Li)."))
# conn.commit()



"""user"""
# c.execute("DROP TABLE USER")
# c.execute("DROP TABLE REVIEW")
# c.execute("DROP TABLE MOVIE")

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


# def get_rate_without_blockers(user, movie):
#     conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
#     c = conn.cursor()
#     blockers = c.execute("SELECT BLOCK FROM USER WHERE USERNAME = ?", (user, )).fetchall()[0][0]
#     blockers = blockers.split(" ")[1:]

#     reviews = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?", (movie, )).fetchall()
#     rating = 0.0
#     counter = 0
#     for review in reviews:
#         if review[0] not in blockers:
#             counter += 1
#             rating += float(review[3])
#     print(reviews)
#     print(blockers)
#     if counter == 0:
#         rating = 0
#     else:
#         rating = round(rating / counter, 2)
#     print(rating)


# get_rate_without_blockers("test", "Clouds")