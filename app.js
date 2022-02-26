
const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

 
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req, res){
 
res.sendFile(__dirname +"/index.html");
})
 
app.post("/", function(req,res){

  const query = req.body.cityName;
  const apiKey = "19a43bf507930cd0bc219692c8414450";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

  https.get(url, function(response){

    console.log("StatusCode = "+response.statusCode);

    response.on("data",function(data){
 
    const weatheData =  JSON.parse(data);
    const temp = weatheData.main.temp;
    const weatherDescription = weatheData.weather[0].description;
    const icon = weatheData.weather[0].icon;
    const iconURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

    res.write("<h1>The Temperature in "+query+" is "+ temp +" degrees Celcius.</h1>");
    res.write("<h3>The Weather is "+weatherDescription+" .</h3>");
    res.write("<img src=" + iconURL +">");
    res.send();
   
    console.log("Temp = "+temp);
    console.log("WeatherDescription = "+weatherDescription);
    })
  })
}) 


app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
