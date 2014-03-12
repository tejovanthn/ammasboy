from flask import Flask, render_template
import os
import time

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html', update=time.ctime(os.path.getmtime(os.getcwd()+"/static/json/tweets.json")))


if __name__ == '__main__':
    app.run(debug=True)
