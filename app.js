const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")

})

app.post("/", function (req, res) {
    console.log(req.body.cityName);


    const query = req.body.cityName;
    const apiKey = "d48065d78c9a520b488c86809d5d160e";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);
        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            console.log(temp);
            console.log(weatherDesc);
            res.write(`<p>Weather in ${query} is ${weatherDesc} </p>`);
            res.write(`<img src='http://openweathermap.org/img/wn/${icon}@2x.png'>`);
            res.write(`<h3> and the temperature is ${temp} degree celcious</h3>`);
            res.send();

        });

    }).on('error', (e) => {
        console.error(e);
    });

})

app.listen(3000, function () {
    console.log("Server is running on port 3000");

})