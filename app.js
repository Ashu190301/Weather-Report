const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

const PORT = process.env.PORT || 3000;

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
      const city = weatheData.name;
      const country = weatheData.sys.country;
      const windSpeed = weatheData.wind.speed;
      const windDeg = weatheData.wind.deg;
      const humidity = weatheData.main.humidity;
      const pressure = weatheData.main.pressure;
      weatheData.weather[0].icon = iconURL;
      // res.write("<h1>Weather Report</h1>");
      // res.write("<h2>City: "+city+", "+country+"</h2>");
      // res.write("<h2>Temperature: "+temp+"</h2>");
      // res.write("<h2>Weather: "+weatherDescription+"</h2>");
      // res.write("<h2>Wind Speed: "+windSpeed+"</h2>");
      // res.write("<h2>Wind Direction: "+windDeg+"</h2>");
      // res.write("<h2>Humidity: "+humidity+"</h2>");
      // res.write("<h2>Pressure: "+pressure+"</h2>");
      // res.write("<img src='"+iconURL+"'>");
      // res.write("<img src=" + iconURL +">");
      // res.write("<h3>The Weather is "+weatherDescription+" .</h3>");
      // res.render("result.html",{"weather":weatheData});

      // ejs.renderFile(
      //   __dirname + "/result.ejs",
      //   { weather: weatheData },
      //   function (err, data) {
      //     res.write(data);
      //     res.send();
      //   }
      // );

      res.render("result", { weather: weatheData });
      console.log("Temp = " + temp);
      console.log("WeatherDescription = " + weatherDescription);
    });
  });
});

app.listen(PORT, function () {
  console.log("Server is running on port 3000");
});
