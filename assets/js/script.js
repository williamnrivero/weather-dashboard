$(document).ready(function () {

    //Search for city
    $(".search").click(function (event) {
        event.preventDefault();
        let userInput = $(this).parent().children(".form-control");
        let city = userInput.val();
        city = city.replace(/^./, city[0].toUpperCase());
        getWeather(city);
        console.log(city);


        // Add item to 'cities' in localStorage
        let cities = JSON.parse(localStorage.getItem("cities"));
        if (!cities) {
            cities = [];
        }
        if (!cities.includes(city)) {
            cities.push(city);
            localStorage.setItem("cities", JSON.stringify(cities));
        }


        let button = $("<button>");
        button.click(function (event) {
            event.preventDefault();
            getWeather(this.textContent);
        });
        button.appendTo(".nav").attr("class", "btn btn-outline-info pastCitySearch col-12").text(city);


    });



    function getWeather(city) {

        //Weather.com API call
        let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=8a9c8778f33ed43d7abdebc8755bbe26`;

        $.ajax({
            url: weatherURL,
            method: "GET"
        })
            .then(function (response) {
                $(".city").text(city + " " + moment().format('l'));
                $("<img>").appendTo(".city").attr("src", `https://openweathermap.org/img/w/${response.list[0].weather[0].icon}.png`); //ICON
                $(".temp").text("Temperature: " + response.list[0].main.temp + " °F");
                $(".humidity").text("Humidity: " + response.list[0].main.humidity + " %");
                $(".wind").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
                console.log(response);

                //5 Day forcast CARDS
                for (let i = 1; i < 6; i++) {
                    $(".date" + [i]).text(moment().add(i, "days").format('l'));     //Date at top of cards
                    $(".icon" + [i]).attr("src", `https://openweathermap.org/img/w/${response.list[(i * 8) - 1].weather[0].icon}.png`); //ICON
                    $(".temp" + [i]).text("Temperature: " + response.list[(i * 8) - 1].main.temp + " °F");
                    $(".humidity" + [i]).text("Humidity: " + response.list[(i * 8) - 1].main.humidity + " %");
                }

                //Lat and lon for UV index
                let lat = response.city.coord.lat;
                let lon = response.city.coord.lon;


                // UV Index API Call
                let uvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=8a9c8778f33ed43d7abdebc8755bbe26&lat=${lat}&lon=${lon}`;

                $.ajax({
                    url: uvURL,
                    method: "GET"
                })
                    .then(function (responseUV) {
                        console.log(responseUV);
                        $(".uvIndex").text("UV Index: " + responseUV.value);

                        //Color changes depending on UV index 
                        if (responseUV.value < 3) {
                            $(".uvIndex").attr("class", "uvIndex btn btn-success");
                        }
                        if (responseUV.value > 3 & responseUV.value < 6) {
                            $(".uvIndex").attr("class", "uvIndex btn btn-warning");
                        }
                        if (responseUV.value > 6) {
                            $(".uvIndex").attr("class", "uvIndex btn btn-danger");
                        }
                    });
            });

    }

    getWeather("Salt Lake City")

    {
        let cities = JSON.parse(localStorage.getItem('cities'));
        if (!cities) {
            cities = [];
            localStorage.setItem('cities', JSON.stringify(cities));
        }
        for (let i = 0; i < cities.length; i++) {
            let button = $("<button>");
            let city = cities[i];
            button.click(function (event) {
                event.preventDefault();
                console.log(this.textContent);
                getWeather(this.textContent);
            });
            button.appendTo(".nav").attr("class", "btn btn-outline-info pastCitySearch col-12").text(city);
        }
    }
});