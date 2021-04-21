// store the calue of the input
var city = $('#searchTerm').val();
// store api key
var apiKey = "b6a7f5f43a88b25bebcab80bd9ef0e92"

var date = new Date();

$('#searchTerm').keypress(function(event) {

        if (event.keyCode === 13) {
            event.preventDefault();
            $('#searchBtn').click();
            
        }
});

$('#searchBtn').on("click" , function() {
    $('#forecastH5').addClass('show');

    // get the value of the input from user
    city = $('#searchTerm').val();

    // clear input box
    $('#searchTerm').val("");

    // full url to call api
    var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}" + city + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function (response){
        console.log(response)

        console.log(response.name)
        console.log(response.weather[0].icon)

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF))

        console.log(response.main.humidity)

        console.log(response.wind.speed)

        getCurrentConditions(response);
        getCurrentForecast(response);
        makeList();

    })
});