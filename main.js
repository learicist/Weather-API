var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat;
var lon;

$(document).ready(function(){
	
    if (navigator.geolocation) {
	  
		//If user allows...
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
		  
			//Get their location
			$.getJSON((api + "lat=" + lat + "&" + "lon=" + lon), function(json) {
			  
				console.log(json);
				
				var currentCity = json.name;
				var country = json.sys.country;
				var temp = Math.floor(json.main.temp);
				var icon = json.weather[0].icon;
				var hum = json.main.humidity;
				
				$("#gps").html(currentCity + ", " + country);
				$("#temp").html(temp + "°C" + "<br>" + hum + "% humidity");
				$("#icon").html("<img src=' " + icon + " '/> ");
				
				//When user clicks the 'units' button
				var isCel = true;
				
				$("#units").on("click", function(){
					if (isCel) {
						$("#temp").html(Math.floor(temp * 1.8 + 32) + "°F");
						$("#units").html("Switch to Cel");
						isCel = false;
					} else {
						$("#temp").html(temp + "°C");
						isCel = true;
						$("#units").html("Switch to Farenheit");
					}
				});
			});
		});
	
    //If user rejects prompt	
	} else {
		$("#gps").html("This browser does not support this service.");
	}
});