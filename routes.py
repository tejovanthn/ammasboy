from flask import Flask, render_template
import urllib2
from threading import Timer
import os

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')


def route_sheet():
    url = "https://spreadsheets.google.com/feeds/list/0Aj5Gl_JbMYf5dDRDMzMtMlVzdTc0dTlpVngzMnYyTkE/od6/public/values?alt=json-in-script"
    result = urllib2.urlopen(url).read()
    apijson = result[result.index("(") + 1: result.rindex(")")]
    f = open(os.getcwd()+"/static/json/full_route.json", "w+")
    f.write(apijson)
    f.close()
    t = Timer(60*60*24, route_sheet)
    t.start()


def tweet_sheet():
    url = "https://spreadsheets.google.com/feeds/list/0Aj5Gl_JbMYf5dEZXQ0k2eVhMUG4teWgxbFlRQUM4a3c/oaw/public/values?alt=json-in-script"
    result = urllib2.urlopen(url).read()
    apijson = result[result.index("(") + 1: result.rindex(")")]
    f = open(os.getcwd()+"/static/json/tweets.json", "w+")
    f.write(apijson)
    f.close()
    t = Timer(60*60*1, tweet_sheet)
    t.start()



if __name__ == '__main__':
    route_sheet()
    tweet_sheet()
    app.run(debug=True)
