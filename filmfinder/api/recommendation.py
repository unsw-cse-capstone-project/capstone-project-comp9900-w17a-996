import sqlite3
conn = sqlite3.connect("filmFinder.db", check_same_thread=False)
c = conn.cursor()


def recommend(username):
    result = c.execute("SELECT * FROM REVIEW WHERE USER = ?",
                        (username,)).fetchall()
    final_recommand_list = []
    final_recommand_dic= {}
    watched_movie = []
    final_result = []
    if len(result) != 0:
        # first loop: add all watched movie to watched list 
        for n in range (len(result)):
            watched_movie.append(result[n][1])

        for n in range (len(result)):
            # choose the film which rate >= 4 
            if int(result[n][3]) >= 4:
                movie = result[n][1]
                for tmp in findsimilar(movie):
                    if tmp not in final_recommand_list and tmp not in watched_movie:
                        final_recommand_list.append(tmp['title'])
                        final_recommand_dic[tmp['title']] = ('Because you like' + movie + '...')
    
    n = 3 - len(final_recommand_list)
    i = 0
    hotmovies = hotmovie()
    while n > 0:
        if hotmovies[i]['title'] not in final_recommand_list and hotmovies[i]['title'] not in watched_movie:
            final_recommand_list.append(hotmovies[i]['title'])
            final_recommand_dic[hotmovies[i]['title']] = 'Hot Movie Recommended!'
            n -= 1
        i += 1

    for tmp in final_recommand_list:
        final_result.append({'title': tmp, 'reason': final_recommand_dic[tmp]})
    return  final_result      


# return a list with dictionayr inside. For example :[{'title': something, 'rating': 4}]
def findsimilar(filmname):

    recommand_list_set = set([])
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
            if result_1[n][0] != filmname:
                # recommand_list.append(result_1[n][0])
                recommand_list_set.add(result_1[n][0])

    # select same director
    if len(result_director) != 0:
        for n in range(len(result_director)):
            if result_director[n][0] != filmname:
                recommand_list_set.add(result_director[n][0])
    
    # select same gerne 
    if len(result_genre) != 0:
        for n in range(len(result_genre)):
            if result_genre[n][0] != filmname:
                recommand_list_set.add(result_genre[n][0])
    
    tmp_list = list(recommand_list_set)
    # for film in tmp_list:
    #     if film not in recommand_list:
    #         tmp_list_2.append(film)
    final_result = sort_film(tmp_list)
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

def hotmovie():
    hot_movie ={}
    movie_list = []
    movies = c.execute("SELECT * FROM MOVIE").fetchall()
    for n in range(len(movies)):
        movie_list.append(movies[n][0])
    return sort_film(movie_list)
