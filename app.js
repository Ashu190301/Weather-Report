const express = require("express");
const path = require("path");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

const PORT = process.env.PORT || 3000;
// app.use(express.static(path.join(__dirname, "public")));
//add static directyory
app.use(express.static(path.join(__dirname, "")));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "19a43bf507930cd0bc219692c8414450";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log("StatusCode = " + response.statusCode);

    response.on("data", function (data) {
      const weatheData = JSON.parse(data);
      const temp = weatheData.main.temp;
      const weatherDescription = weatheData.weather[0].description;
      const icon = weatheData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      weatheData.weather[0].icon = iconURL;
      // const city = weatheData.name;
      // const country = weatheData.sys.country;
      // const windSpeed = weatheData.wind.speed;
      // const humidity = weatheData.main.humidity;
      // const pressure = weatheData.main.pressure;

      res.render("result", { weather: weatheData });
      console.log("Temp = " + temp);
      console.log("WeatherDescription = " + weatherDescription);
    });
  });
});

app.listen(PORT, function () {
  console.log("Server is running on port 3000");
});
