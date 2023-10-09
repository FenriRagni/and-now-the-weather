$(document).ready(function() {
    var key = "9b6428448f91b6aed665e25daf655e2f"
    var location, long, lati;
    var geoQuery = "http://api.openweathermap.org/geo/1.0/direct?q="
    var subBtn = $("#submit");
    var srchInput = $("#search");
    var today = $("#today");
    var date = dayjs();
    var list = $("#city-list");
    var searchList = [];
    //function to set coordinates in correct format
    function setCoord(str){
        str = str.toString();
        str = str.substring(0,str.indexOf(".")+3); //finds the decimal point and creates a string up to 2 places after it
        return str;
    }
    
    //sets appropriate icon in url
    function setIcon(icon){
        return "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    }
    //sets Today's Weather
    function setWeather(data){
        // location = location.substring(0,1).toUpperCase() + location.substring(1);
        today.text(data.name+ " " + date.format("M/D"));
        today.siblings().children().eq(0).attr("src",setIcon(data.weather[0].icon));
        today.siblings().children().eq(1).html("Temperature: "+ Math.round(data.main.temp)+"&deg;F");
        today.siblings().children().eq(2).text("Wind: " + Math.round(data.wind.speed) + " mph");
        today.siblings().children().eq(3).text("Humidity: " + data.main.humidity+ "%");
    }

    function setForecast(data, count){
        var newDate = date.add(count+1,"day");
        var day = $("#day-"+ (count+1));
        var forecast = 7*(count+1) + count;
        day.text(newDate.format("M/D"));
        day.siblings().children().eq(0).attr("src",setIcon(data.list[forecast].weather[0].icon));
        day.siblings().children().eq(1).html("Temperature: "+ Math.round(data.list[forecast].main.temp)+"&deg;F");
        day.siblings().children().eq(2).text("Wind: " + Math.round(data.list[forecast].wind.speed) + " mph");
        day.siblings().children().eq(3).text("Humidity: " + data.list[forecast].main.humidity+ "%");
    }

    function callCity(event){
        event.preventDefault();
        $.ajax({
            url: geoQuery + location+"&limit=5&appid=" + key
        }).then(function(data){
            long = data[0].lon;
            lati = data[0].lat;
            long = setCoord(long);
            lati = setCoord(lati);
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lati
                + "&lon=" + long + "&appid=" + key + "&units=imperial"
            }).then(function(data){
                setWeather(data);
            });
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lati
                + "&lon=" + long + "&appid=" + key + "&units=imperial"
            }).then(function(data){
                for(var x=0; x < 5; x++){
                    setForecast(data, x);
                }
            })
        });
    }

    subBtn.on("click", function(event){
        if(srchInput.val()!== ""){
            location = srchInput.val();
            var newLocation = $("<button>" + location + "</button>");
            newLocation.addClass("list-group-item list-item text-center btn");
            searchList.push(newLocation);
            list.append(newLocation)
            localStorage.setItem("searches", JSON.stringify(searchList));
            location = location.toLowerCase();
            srchInput.val("");
            callCity(event);
        }
    });

    list.on("click", "button", function(event){
        location = event.target.textContent;
        location = location.toLowerCase();
        callCity(event);
    })
});