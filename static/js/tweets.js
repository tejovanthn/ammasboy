///////////////////////////////////////////////////////////////
var tweet_rows = Array();
var tweets = Array();

$(document).ready(function() {
    $.getJSON('/static/json/tweets.json',
        function(data){
            console.log(data);
            tweet_proc(data);
        });
});


///////////////////////////////////////////////////////////////

function tweet_proc(result) {
    var data = result.feed;
    var loc = "";
    for(i=0; i<data.entry.length; i++) {
        tweets.push([data.entry[i].gsx$text.$t,data.entry[i].gsx$idstr.$t,data.entry[i].gsx$createdat.$t]);
        loc = data.entry[i].gsx$geocoordinates.$t;
        tweet_rows.push([loc.match(/loc: (.*?),(.*)/)[1],loc.match(/loc: (.*?),(.*)/)[2]]);
    }
    console.log(tweets);
    console.log(tweet_rows);

    $(document).trigger("tweet_done");
}

///////////////////////////////////////////////////////////////

function display_tweets() {
    for(var i=0;i<tweets.length;i++) {
        var date = new Date(Date.parse(tweets[i][2]));
        var $tweet = $('<div id="'+i+'"> <div> <a href="https://www.twitter.com/iBakasura/status/'+tweets[i][1]+'" target="_blank">'+date.toLocaleString() +'</a></div>'+tweets[i][0].replace("#AmmasBoy","")+'</div><hr>');

        $("#tweets").prepend($tweet);
    }
}
