// Put your zillow.com API key here


var username = "yashwanthrafa55";
var request = new XMLHttpRequest();
var marker;
var map;
var contents="";

//initMap() which initiates map to a location
function initMap() {

	//initialize map
	
	    var myLatLng={lat: 32.75, lng: -97.13};
		map = new google.maps.Map(document.getElementById('map'), {
          'center': myLatLng,
          'zoom': 17
        });
		
		marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Centennial court - Worst Apts'
        });
		var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
	    infowindow.setContent("1506-1598 W Randol Mill Rd, Arlington, TX 76012, USA");
		infowindow.open(map,marker);
		  
				
	//Initialize a mouse click event on map which then calls reversegeocode function
	
	    google.maps.event.addListener(map, "click", function (result) {

             reversegeocode(geocoder,map,result.latLng,infowindow);

        });
		
		
}



// Reserse Geocoding 
function reversegeocode(geocoder,map,latLng,infowindow) {

  //get the latitude and longitude from the mouse click and get the address.
  
        var newLat=latLng.lat();
        var newLon=latLng.lng();
		geocoder.geocode({'location':latLng}, function(newResults,status){
	              if(status==='OK'){
				     if(newResults[1]){
                        
						 var addr=newResults[0].formatted_address
					    }
						else {
                              window.alert('No results found');
                             }
				    } 
                        else {
                               window.alert('Geocoder failed due to: ' + status);
                             }	
        sendRequest(newLat,newLon,addr,geocoder,infowindow,map,latLng);							 
		});
  
  //call geoname api asynchronously with latitude and longitude 
  
  
}// end of geocodeLatLng()



function displayResult (addr,geocoder,infowindow,map,latLng) {
	return function(){
		if (this.readyState == 4) {
	     
        var xml = request.responseXML;
		marker.setPosition(latLng);
		map.panTo(latLng);
        infowindow.open(map, marker);
       	var temperature = xml.getElementsByTagName("temperature");
		var clouds=xml.getElementsByTagName("clouds");
		var windSpeed=xml.getElementsByTagName("windSpeed");
		console.log(temperature[0]['innerHTML']);
        contents="<ul>"+"<li>"+"Address: "+addr+"<br>"+"Temperature: "+temperature[0]['innerHTML']+"<br>"+"Clouds: "+clouds[0]['innerHTML']+"<br>"+"WindSpeed: "+windSpeed[0]['innerHTML']+"</li>"+"</ul>"+"<br>"+contents;		
        infowindow.setContent("<br>"+"Address: "+addr+"<br>"+"Temperature: "+temperature[0]['innerHTML']+"<br>"+"Clouds: "+clouds[0]['innerHTML']+"<br>"+"WindSpeed: "+windSpeed[0]['innerHTML']);
		document.getElementById('output').innerHTML=contents;
        
	        }
	}


   
	
}


function sendRequest (lat,lng,addr,geocoder,infowindow,map,latLng) {
       
    request.open("GET"," http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+"&username="+username);
	//request.open("GET", "proxy.php?lat="+lat+"&lng="+lng+"&username="+username,true);
	request.onreadystatechange = displayResult(addr,geocoder,infowindow,map,latLng);
	
    //request.withCredentials = "true";
	
	console.log(request);
    request.send(null);


}
function hellomain(){
contents="";
document.getElementById('output').innerHTML = contents;
}
