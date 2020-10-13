import sqlite3

conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()

# content = c.execute("SELECT * FROM USER")
# for i in content:
#     print(i)


# conn1 = sqlite3.connect("movie.db", check_same_thread=False)
# c1 = conn1.cursor()
# c.execute("DROP TABLE MOVIE")
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

content = c.execute("SELECT * FROM MOVIE")
for i in content:
    print(i)
