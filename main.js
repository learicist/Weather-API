var api = "https://api.openweathermap.org/data/2.5/weather?";
var lat, lon, url;

$(document).ready(function(){
	//If user allows...
    if (navigator.geolocation) {
	  
		//Get their location
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			//construct API url
			url = api + "lat=" + lat + "&" + "lon=" + lon + "&APPID=f4dd0342f5a7933101c151149507063e";
			
			$.getJSON((url), function(json) {
			  
				console.log(json);
				
				var currentCity = json.name, country = json.sys.country,
					temp = Math.floor(json.main.temp - 273.15),
					icon = "http://openweathermap.org/img/w/" 
							+ json.weather[0].icon + ".png",
				    hum = json.main.humidity, iconAlt = json.weather[0].main;
				
				//console.log(iconAlt);
				
				$("#gps").html(currentCity + ", " + country);
				$("#temp").html(temp + "°C" + "<br>" + hum + "% humidity");
				$("#icon").html("<img alt='" + iconAlt + "' src='" + icon + "'/> ");
				
				//console.log($('#icon').html());
				
				//When user clicks the 'units' button
				var isCel = true;
				
				$("#units").on("click", function(){
					if (isCel) {
						$("#temp").html(
							Math.floor(temp * 1.8 + 32) + "°F" + 
							"<br>" + hum + "% humidity");
						$("#units").html("Switch to Celsius");
						isCel = false;
					} else {
						$("#temp").html(temp + "°C" + "<br>" + hum + "% humidity");
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
