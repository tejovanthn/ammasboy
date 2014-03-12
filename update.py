import urllib2
import os


def route_sheet():
    print "Downloading route sheet"
    url = "https://spreadsheets.google.com/feeds/list/0Aj5Gl_JbMYf5dDRDMzMtMlVzdTc0dTlpVngzMnYyTkE/od6/public/values?alt=json-in-script"
    result = urllib2.urlopen(url).read()
    apijson = result[result.index("(") + 1: result.rindex(")")]
    f = open(os.getcwd()+"/static/json/full_route.json", "w+")
    f.write(apijson)
    f.close()


def tweet_sheet():
    print "Downloading tweet sheet"
    url = "https://spreadsheets.google.com/feeds/list/0Aj5Gl_JbMYf5dEZXQ0k2eVhMUG4teWgxbFlRQUM4a3c/oaw/public/values?alt=json-in-script"
    result = urllib2.urlopen(url).read()
    apijson = result[result.index("(") + 1: result.rindex(")")]
    f = open(os.getcwd()+"/static/json/tweets.json", "w+")
    f.write(apijson)
    f.close()

