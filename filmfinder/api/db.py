import sqlite3

conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()

content = c.execute("SELECT * FROM USER")
for i in content:
    print(i)