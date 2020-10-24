import sqlite3
conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()


# def (username):
#     query_sql = "SELECT * FROM REVIEW WHERE USERNAME = ? "

def findsimilar(filmname):

    recommand_list = []
    tmp_list_2 = []
    recommand_list_set= set([])

    result = c.execute("SELECT * FROM MOVIE WHERE TITLE = ?", 
                    (filmname,)).fetchall()
    
    genre = result[0][7]
    director = result[0][1]
    
    # select same gerne and same director 
    result_1 = c.execute("SELECT * FROM MOVIE WHERE GENRE = ? AND DIRECTORS = ?",
                        (genre,director,)).fetchall() 
    result_director = c.execute("SELECT * FROM MOVIE WHERE DIRECTORS = ?",
                        (director,)).fetchall()
    result_genre = c.execute("SELECT * FROM MOVIE WHERE MAINGENRE = ?",
                        (genre,)).fetchall()
    
    # select same gerne and same director 
    if len(result_1) != 0:
        for n in range(len(result_1)):
            recommand_list.append(result_1[n][0])
            recommand_list_set.add(result[n][0])

    # select same director
    if len(result_director) != 0:
        for n in range(len(result_director)):
            recommand_list_set.add(result_director[n][0])
    
    # select same gerne 
    if len(result_genre) != 0:
        for n in range(len(result_genre)):
            recommand_list_set.add(result_genre[n][0])
    
    tmp_list = list(recommand_list_set)
    for film in tmp_list:
        if film not in recommand_list:
            tmp_list_2.append(film)
    final_result = sort_film(recommand_list) + sort_film(tmp_list_2)
    
    return final_result        
                
   

    

def cal_mark(filmname):
    
    mark = 0.0
    result = c.execute("SELECT * FROM REVIEW WHERE MOVIE = ?",
    (filmname,)).fetchall()
    if len(result) != 0:
        for n in range(len(result)):   
            mark += float(result[n][3])
        final_mark = float(mark / len(result))
    else:
        final_mark = 0
    return final_mark

       
def sort_film(film_list):
    tmp = []   
    for film in film_list:
        tmp.append({'title': film, 'rating': cal_mark(film)})
    
    tmp.sort(key=lambda x:x.get('rating'), reverse=True)
    return tmp

def hot_movie():
    return 0