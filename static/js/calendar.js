$(document).ready(function() {
    $.getJSON('/static/json/calendar.json',
        function(data){
            console.log(data);
            calendar_proc(data);
        });
});

function calendar_proc(result) {
    $(document).on("route_done", function(){
        make_calendar();
        today();
        route_calendar();
    });
}

Date.prototype.getString = function() {
    m_ =this.getMonth();
    d_ =this.getDate();
    if ( m_ < 10) 
        m_ = "0"+m_;
    if ( d_ < 10)
        d_ = "0"+d_;
    return ""+this.getFullYear()+m_+d_;
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function addColour(rgb, colour) {
    rgb = parseInt(rgb2hex(rgb),16);
    colour = parseInt(colour,16);
    return "#"+(rgb+colour).toString(16)
}

function make_calendar() {
    cal_w = $("#calendar").width()/7;
    cal_h = ($(".row").height()-20)/6;

    MAX_WEEKS = Math.ceil(route_rows.slice(-1)[0][2]/7);

    day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    $("#calendar").append("<tr id='cal-row-head'></tr>");
    for(j=0; j<7; j++) {
        $("#cal-row-head").append("<td style='width:"+cal_w+"px; '>"+day[j]+"</td>");
        $("#cal-row-head").height("20px");
        $("#cal-row-head").css({"background-color":"#222","color":"#999","text-align":"center"});
    }
    $("#calendar").height(6*cal_h);
    for(i=0; i<MAX_WEEKS; i++) {
        $("#calendar").append("<tr class='week-"+i+"'></tr>");

        for(j=0; j<7;j++) {
            $(".week-"+i).append("<td class='day day-"+j+"'></td>");
        }
    }

    d = new Date("Mar 9 2014");

    $(".day").each( function(index) {
        $(this).width(cal_w);
        $(this).height(cal_h);
        $(this).attr("id", d.getString());
        if(d.getDate() == 1)
        $(this).html("<div style='padding:5px 5px 5px 5px'>"+mon[d.getMonth()]+" "+d.getDate()+"</div>");
        else
        $(this).html("<div style='padding:5px 5px 5px 5px'>"+d.getDate()+"</div>");

    d.setDate(d.getDate()+1);

    if (index % 2 == 0){
        $(this).css({"background-color":"#dddddd"});
        if(index % 7 == 0 || index % 7 == 6)
        $(this).css({"background-color":"#ffdddd"});
    }
    else {
        $(this).css({"background-color":"#777777"});
        if(index % 7 == 0 || index % 7 == 6)
        $(this).css({"background-color":"#997777"});
    }
    });
}

function today() {
    e = new Date();
    rgb = $("#"+e.getString()).css("background-color");
    $("#"+e.getString()).css({"background-color":addColour(rgb,"002200")});
}

function route_calendar() {

}
