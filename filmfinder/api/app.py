from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
a = '1'
b = '2'
@app.route('/app', methods=['GET','POST'])
def api():
    if request.method=='GET':
        return('<form action="/test" method="post"><input type="submit" value=a /></form>')

    elif request.method=='POST':
        return request.get_json()
    else:
        return("ok")
    

    # title = 'This is the project of W17A-996'
    # test_msg = 'Congratulations, your Flask successfully connects to React!'
    # return {
    #     'userId': 1,
    #     'title': title,
    #     'message': test_msg,
    #     'completed': False
    # }
if __name__ == "__main__":
    app.run(debug=True)