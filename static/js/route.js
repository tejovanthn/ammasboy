///////////////////////////////////////////////////////////////
var route_rows = Array();

$(document).ready(function() {
    $.getJSON('/static/json/full_route.json',
        function(data){
            console.log(data);
            route_proc(data);
        });
});


///////////////////////////////////////////////////////////////

function route_proc(result) {
    var data = result.feed;
 
    var places = Array();
    for(i=0; i<data.entry.length; i++){
        route_rows.push([data.entry[i].gsx$lat.$t, data.entry[i].gsx$lng.$t]);
        places.push(data.entry[i].gsx$place.$t);
    }
    var point = "12.9607951,77.6406321".split(",");
    var distances = Array();
    distances = route_rows.map(function(p){
        return distance(p[0], p[1], point[0], point[1], "K");
    });
    var answer = "";
    answer += "Last tweet location (hard coded :P): "+point+"\n";
    console.log(places[_.indexOf(distances, _.min(distances))]);
    answer += "Place identified as: "+places[_.indexOf(distances, _.min(distances))];
    $(document).trigger("route_done");
}
