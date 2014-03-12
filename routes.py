from flask import Flask, render_template
import os
import time
import update

app = Flask(__name__)

@app.route('/')
def home():
    update.route_sheet()
    update.tweet_sheet()
    return render_template('home.html', update=time.ctime(os.path.getmtime(os.getcwd()+"/static/json/tweets.json")))


if __name__ == '__main__':
    app.run(debug=True)
