from flask import Flask, render_template
import urllib2
import os
import time
from apscheduler.scheduler import Scheduler

app = Flask(__name__)
sched = Scheduler()

@app.route('/')
def home():
    return render_template('home.html', update=time.ctime(os.path.getmtime(os.getcwd()+"/static/json/tweets.json")))


@sched.interval_schedule(minutes=1)
def route_sheet():
    print "Downloading route sheet"
    url = "https://spreadsheets.google.com/feeds/list/0Aj5Gl_JbMYf5dDRDMzMtMlVzdTc0dTlpVngzMnYyTkE/od6/public/values?alt=json-in-script"
    result = urllib2.urlopen(url).read()
    apijson = result[result.index("(") + 1: result.rindex(")")]
    f = open(os.getcwd()+"/static/json/full_route.json", "w+")
    f.write(apijson)
    f.close()


@sched.interval_schedule(minutes=1)
def tweet_sheet():
    print "Downloading tweet sheet"
    url = "https://spreadsheets.google.com/feeds/list/0Aj5Gl_JbMYf5dEZXQ0k2eVhMUG4teWgxbFlRQUM4a3c/oaw/public/values?alt=json-in-script"
    result = urllib2.urlopen(url).read()
    apijson = result[result.index("(") + 1: result.rindex(")")]
    f = open(os.getcwd()+"/static/json/tweets.json", "w+")
    f.write(apijson)
    f.close()


if __name__ == '__main__':
    sched.start()
    app.run(debug=True)
