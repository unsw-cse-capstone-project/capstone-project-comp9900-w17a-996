import sqlite3


def check_thumb(comment_username, filmname, thumbup_user, up_or_down):
    conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
    c = conn.cursor()
    result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ? AND USER = ?",
    (filmname,comment_username,)).fetchall()
    
    if len(result) != 0 and up_or_down == 'up':
        user = str(result[0][5])
        user_list = user.split(',')
        
    elif len(result) != 0 and up_or_down == 'down':
        user = str(result[0][6])
        user_list = user.split(',')

    if thumbup_user in user_list:
        return 1
    else:
        return 0
        
    return 0


def thumb_up(comment_username, filmname, thumbup_user):
    conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
    c = conn.cursor()
    result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ? AND USER = ?",
    (filmname,comment_username,)).fetchall()
    if len(result) != 0:# and not check_thumb(comment, comment_username, thumbup_user):
        up_users = str(result[0][5])
        thumb_number = int(result[0][7])
        thumbup_user += ','
        up_users += thumbup_user
        thumb_number += 1
        c.execute(
            "UPDATE REVIEW SET UPUSER = ?, UPNUMBER = ? WHERE MOVIE = ? AND USER = ?",
            (up_users, str(thumb_number), filmname, comment_username,))
        conn.commit()

def cancel_thumb_up(comment_username, filmname, thumbup_user):
    conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
    c = conn.cursor()
    result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ? AND USER = ?",
    (filmname,comment_username,)).fetchall()
    if len(result) != 0:
        up_users = str(result[0][5])
        up_users_list = up_users.split(',')
        up_users_list.remove(thumbup_user)
        # del up_users_list[-1]
        updated = ','.join(up_users_list)
        # if updated != '':
        #     updated += ','
        up_number = int(result[0][7])
        up_number -= 1
        c.execute(
            "UPDATE REVIEW SET UPUSER = ?, UPNUMBER = ? WHERE MOVIE = ? AND USER = ?",
            (updated, str(up_number), filmname, comment_username,))
        conn.commit()


def thumb_down(comment_username, filmname, thumbdown_user):
    conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
    c = conn.cursor()
    result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ? AND USER = ?",
    (filmname,comment_username,)).fetchall()
    if len(result) != 0:# and not check_thumb(comment, comment_username, thumbup_user):
        down_users = str(result[0][6])
        thumb_number = int(result[0][8])
        thumbdown_user += ','
        down_users += thumbdown_user
        thumb_number += 1
        c.execute(
            "UPDATE REVIEW SET DOWNUSER = ?, DOWNNUMBER = ? WHERE MOVIE = ? AND USER = ?",
            (down_users, str(thumb_number), filmname, comment_username,))
        conn.commit()

def cancel_thumb_down(comment_username, filmname, thumbdown_user):
    conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
    c = conn.cursor()
    result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ? AND USER = ?",
    (filmname,comment_username,)).fetchall()
    if len(result) != 0:
        up_users = str(result[0][6])
        up_users_list = up_users.split(',')
        up_users_list.remove(thumbdown_user)
        # del up_users_list[-1]
        updated = ','.join(up_users_list)
        # if updated != '':
        #     updated += ','
        up_number = int(result[0][8])
        up_number -= 1
        c.execute(
            "UPDATE REVIEW SET DOWNUSER = ?, DOWNNUMBER = ? WHERE MOVIE = ? AND USER = ?",
            (updated, str(up_number), filmname, comment_username,))
        conn.commit()


    



"""
c.execute("DROP TABLE REVIEW")

c.execute(
                "CREATE TABLE REVIEW (USER TEXT, MOVIE TEXT, COMMENT TEXT, RATE TEXT, TIME TEXT, UPUSER TEXT, DOWNUSER TEXT, UPNUMBER TEXT, DOWNNUMBER TEXT)"
            )
conn.commit()

c.execute("INSERT INTO REVIEW (USER, MOVIE, COMMENT, RATE, TIME, UPUSER, DOWNUSER, UPNUMBER, DOWNNUMBER ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        ('lyy', 'movie','good','1','time','','','0','0'))

conn.commit()

thumb_down('lyy','movie','up1')
thumb_up('lyy','movie','up2')

result = c.execute('SELECT * FROM REVIEW').fetchall()

for i in result:
    print(i)

# cancel_thumb_up('lyy','movie','up1')
cancel_thumb_up('lyy','movie','up2')
cancel_thumb_down('lyy', 'movie', 'up1')
result = c.execute('SELECT * FROM REVIEW').fetchall()

for i in result:
    print(i)
"""