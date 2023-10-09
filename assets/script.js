$(document).ready(function() {
    var key = "9b6428448f91b6aed665e25daf655e2f"
    var location, long, lati;
    var geoQuery = "http://api.openweathermap.org/geo/1.0/direct?q="
    var subBtn = $("#submit");
    var srchInput = $("#search");
    function checkCoord(str){
        str = str.toString();
        if(str[0]==="-"){
            str = str.substring(0,6);
        }
        else{
            str = str.substring(0,5);
        }
        return str;
    }
    
    subBtn.on("click", function(event) {
        event.preventDefault();
        console.log("button clicked");
        location = srchInput.val();
        srchInput.val("");
        $.ajax({
            url: geoQuery + "atlanta&limit=5&appid=" + key
        }).then(function(data){
            console.log(data);
            console.log(data[0]);
            long = data[0].lon;
            lati = data[0].lat;
            console.log(long);
            console.log(lati);
            long = checkCoord(long);
            lati = checkCoord(lati);
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lati
                + "&lon=" + long + "&appid=" + key + "&units=imperial"
            }).then(function(data){
                console.log(data);
            });
        });
    });

});