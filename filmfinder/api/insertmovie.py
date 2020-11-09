import sqlite3
import datetime, time
import json

conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()

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