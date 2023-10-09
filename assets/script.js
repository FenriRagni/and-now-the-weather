$(document).ready(function() {
    var key = "9b6428448f91b6aed665e25daf655e2f"
    var location, long, lati;
    var geoQuery = "http://api.openweathermap.org/geo/1.0/direct?q="
    var subBtn = $("#submit");
    var srchInput = $("#search");
    var today = $("#today");
    var date = dayjs();
    //function to set coordinates in correct format
    function setCoord(str){
        str = str.toString();
        if(str[0]==="-"){
            str = str.substring(0,6);
        }
        else{
            str = str.substring(0,5);
        }
        return str;
    }
    
    //sets appropriate icon in url
    function setIcon(icon){
        return "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    }
    //sets Today's Weather
    function setWeather(data){
        today.text(data.name+ " " + date.format("M/D"));
        console.log(today.children());
        today.siblings().children().eq(0).html("Temperature: "+ Math.round(data.main.temp)+"&deg;F");
        today.siblings().children().eq(1).text("Wind: " + data.wind.speed+ " mph");
        today.siblings().children().eq(2).text("Humidity: " + data.main.humidity+ "%");
    }

    

    subBtn.on("click", function(event) {
        event.preventDefault();
        console.log("button clicked");
        location = srchInput.val();
        srchInput.val("");
        $.ajax({
            url: geoQuery + "atlanta&limit=5&appid=" + key
        }).then(function(data){
            console.log("data:", data);
            console.log("data[0]:", data[0]);
            long = data[0].lon;
            lati = data[0].lat;
            console.log("longitude:", long);
            console.log("latitude:", lati);
            long = setCoord(long);
            lati = setCoord(lati);
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lati
                + "&lon=" + long + "&appid=" + key + "&units=imperial"
            }).then(function(data){
                console.log("data:", data);
                console.log("current weather data.main.temp:", Math.round(data.main.temp));
                setWeather(data);
            });
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lati
                + "&lon=" + long + "&appid=" + key + "&units=imperial"
            }).then(function(data){
                console.log("forecast data:", data);
                console.log("forcast data.list[2].main.temp:", Math.round(data.list[2].main.temp));

            })
        });
    });

});