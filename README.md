# And now... The Weather

## Description
A webapp that lets you search for a city to get their current weather and the 5 day forecast starting on the next day. Styled in the theme of Welcome to Nightvale with Cecil Palmer bringing you, The Weather.

## Technology Used

|Technology Name|Resource|
|-----------|------------|
|JavaScript|[link](https://www.w3schools.com/js/js_intro.asp)|
|CSS|[link](https://www.w3schools.com/css/css_intro.asp)|
|Git|[link](https://www.w3schools.com/git/git_intro.asp?remote=github)|
|JQuery|[link](https://jquery.com/)|
|Bootstrap|[link](https://getbootstrap.com/docs/5.1/getting-started/introduction/)|
|DayJS|[link](https://day.js.org/en/)|
|Open Weather API|[link](https://openweathermap.org/api)

## Usage

Entering a city name returns the weather and 5 day forecast for that city. It then keeps a history of your searches for easy access to previous searches.
![weather-demo](./assets/images/weather-demo.gif)

## Code Snippet

```js
function setCoord(str){
        str = str.toString();
        str = str.substring(0,str.indexOf(".")+3);
        return str;
    }
```
This bit of code takes the latitude or longitude finds the location of the decimal point and then creates a string 2 indexes past it. This sets the coordinates to the format that the api requires to pull the correct weather data.

## Learning Points 
Throughout this project, I learned and became more familiar with making api calls and ways to dynamically change the call. I figured out how to write a function that could easily be used by multiple types of elements. A skill I gained was traversing trough information given from API calls

## Credits
Image of Cecil Palmer by [littleulvar](https://www.deviantart.com/littleulvar) <br>
Thanks to [Ezekiel Jamolin](https://github.com/Ezekiel186) for helping me understand traversing the api call object!

## Author
Alonso Ampuero <br>
[Twitter](https://www.twitter.com/fenri.ragni) <br>
[Github](https://www.github.com/fenri.ragni) <br>
[Portfolio](https://fenriragni.github.io/pro-portfolio/)