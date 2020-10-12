import sqlite3

conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()

content = c.execute("SELECT * FROM USER")

for i in content:
    print(i)
# username = 'binbinxu'
# password= '123456'
# query_sql = "SELECT * FROM USER WHERE USERNAME = ? AND PASSWORD = ?"

# try:
#     result = c.execute(query_sql, (username, password)).fetchall()
#     print(result)
# except sqlite3.OperationalError:
#     pass