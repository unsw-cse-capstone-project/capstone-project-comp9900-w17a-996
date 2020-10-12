from flask import Flask

app = Flask(__name__)
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