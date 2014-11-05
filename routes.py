from flask import Flask, render_template, g, session, request
import os
import time
import update
import geocoder

app = Flask(__name__)

@app.route('/')
@app.route('/map/')
def map():
    update.route_sheet()
    update.tweet_sheet()
    return render_template('map.html', update=time.ctime(os.path.getmtime(os.getcwd()+"/static/json/tweets.json")))


@app.route('/cal/')
def cal():
    return render_template('calendar.html', update=time.ctime(os.path.getmtime(os.getcwd()+"/static/json/tweets.json")))

#@app.before_request
#def before_request():
#    g.version = "0.1"
#    g.request_start_time = time.time()
#    g.request_time = lambda: "%.5fs" % (time.time() - g.request_start_time)
#    if "city" not in session :
#        geo =  geocoder.ip(request.remote_addr)
#        if geo.ip is None:
#            session["city"]="Bangalore"
#        else:
#            session["city"] = re.match("^(.+),",geo.address).group(1)
#        g.city = session["city"]
#    else :
#        g.city = session["city"]
#



if __name__ == '__main__':
    app.run(debug=True)
