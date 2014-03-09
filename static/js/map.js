///////////////////////////////////////////////////////////////
var dh = $(document).height()-80;
$('#map-canvas').css({'height':dh+'px'});

///////////////////////////////////////////////////////////////
var map;
function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(12.9715987,77.5945627),
        mapTypeControlOptions: {
            mapTypeIds: []
        }
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    $(document).on("tweet_done",function (){
        plot_tweets();
        display_tweets();
        $("#reload").remove();
    });
    $(document).on("route_done", function(){
        plot_route();
    });
}


///////////////////////////////////////////////////////////////
function plot_tweets() {
    center = tweet_rows[tweet_rows.length-1];
    console.log(center);
    map.panTo( new google.maps.LatLng(center[0],center[1]));

    var tweet_points = Array();
    for(var i = 0; i<tweet_rows.length;i++){
        tweet_points.push(new google.maps.LatLng(tweet_rows[i][0],tweet_rows[i][1]));
    }
    var tweet_path = new google.maps.Polyline({
        path: tweet_points,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    tweet_path.setMap(map);
}

///////////////////////////////////////////////////////////////
function plot_route() {
    var route_points = Array();
    for(var i=0; i<route_rows.length;i++){
        route_points.push(new google.maps.LatLng(route_rows[i][0],route_rows[i][1]));
        var marker = new google.maps.Marker({
            position: route_points[i],
            map: map,
            title: ""
        });
    }

    console.log(route_points);
    var route_path = new google.maps.Polyline({
        path: route_points,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 4
    });
    route_path.setMap(map);
}

///////////////////////////////////////////////////////////////
google.maps.event.addDomListener(window, 'load', initialize);
