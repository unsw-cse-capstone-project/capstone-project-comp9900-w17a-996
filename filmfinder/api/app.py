from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
    

@app.route('/', methods=['GET'])
def my_index():
    return render_template("index.html", token="Hello World")


app.run(debug=True)

@app.route('/app', methods=['GET'])
def api():
    title = 'This is the project of W17A-996'
    test_msg = 'Congratulations, your Flask successfully connects to React!'
    return {
        'userId': 1,
        'title': title,
        'message': test_msg,
        'completed': False
    }