var dat = "test"; 

var popup = L.popup();//initialize new popup var

/* function used to determine where a user has clicked on a map */
function onMapClick(e){
  popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

function uploadFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file,  false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {	                
                console.log('Uploaded:' + file);	               
            }
        }
    }
    rawFile.send();
    return JSON.parse(rawFile.responseText);
}


function getColor(d)
{
	return d > 1000 ? '#084594' :
           d > 500  ? '#2171b5' :
           d > 200  ? '#4292c6' :
           d > 100  ? '#6baed6' :
           d > 50   ? '#9ecae1' :
           d > 20   ? '#c6dbef' :
           d > 10   ? '#deebf7' :
                      '#f7fbff';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties[window.dat]),
        weight: 1,
        opacity: 1,
        color: 'white',        
        fillOpacity: 0.6
    };
}


function buttonSelector(topic)
{
	switch(topic)
	{
		case "Immigration":
			text = '<h5>Age at Immigration</h5><input type="radio" name="Immigration" value="healthdat_all_Age at immigration 5 to 14 years"> 5 - 14<br>'
	  		+ '<input type="radio" name="Immigration" value="healthdat_all_Age at immigration 15 to 24 years"> 15 - 24<br>'
	  		+ '<input type="radio" name="Immigration" value="healthdat_all_Age at immigration 25 to 44 years"> 25 - 44<br>'
	  		+ '<input type="radio" name="Immigration" value="healthdat_all_Age at immigration 45 years and over"> 45+';
			return text;
			break;

		case "Transportation":
			text = '<h5>Commuting Method</h5><input type="radio" name="Transportation" value="healthdat_all_Mode of transportation Bicycle"> Bicycle<br>'
	  		+ '<input type="radio" name="Transportation" value="healthdat_all_Mode of transportation Car, truck or van - as a driver"> Drive Automobile<br>'
	  		+ '<input type="radio" name="Transportation" value="healthdat_all_Mode of transportation Car, truck or van - as a passenger"> Ride in Automobile<br>'
	  		+ '<input type="radio" name="Transportation" value="healthdat_all_Mode of transportation Public transit"> Public Transit';
			return text;
			break;

		case "Household Income":
			text = '<h5>Household Income in 2010</h5><input type="radio" name="Household Income" value="healthdat_all_Income of individuals in 2010 $100,000 to $124,999"> $100k to $125k<br>'
	  		+ '<input type="radio" name="Household Income" value="healthdat_all_Income of households in 2010 $125,000 to $149,999"> $125k to $150k<br>'
	  		+ '<input type="radio" name="Household Income" value="healthdat_all_Income of households in 2010 $150,000 and over"> >$150k<br>';	  		
			return text;
			break;

		case "Visible Minorities":
			text = '<h5>Visible Minorities</h5><input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Arab"> Arab<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Chinese"> Chinese<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Filipino"> Filipino<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Japanese"> Japanese<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Korean"> Korean<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Latin American"> Latin American<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population South Asian"> South Asian<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Southeast Asian"> Southeast Asian<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population West Asian"> West Asian<br>'
	  		+ '<input type="radio" name="Visible Minorities" value="healthdat_all_Visible minority population Not a visible minority"> White<br>'  		
			return text;
			break;			

		default:
			text = '<h5>Coming Soon!</h5>';
			return text;
			break;	
	}

}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Full_Address) {
        //console.log(feature.properties);
        layer.bindPopup("<b>Organization Name: </b>" + " " + feature.properties.Org_Name + "<br>" +
          "<b>Address: </b>" + " " + feature.properties.Full_Address + "<br>" +
          "<b>Target Community: </b>" + " " + feature.properties.Targ_Comm + "<br>" +
          "<b>Target Population: </b>" + " " + feature.properties.Targ_Pop + "<br>" +
          "<b>Target Age: </b>" + " " + feature.properties.Targ_Age + "<br>" +
          "<b>Website: </b>" + " <a target='_blank' href=" + feature.properties.Website + ">" + feature.properties.Website + 
          "</a>" + "<br>" +
          "<b>Target Population Specification: </b>" + " " + feature.properties.Targ_Pop_Spe + "<br>" +
          "<b>Hours: </b>" + " " + feature.properties.Hours + "<br>" +
          "<b>Phone #: </b>" + " <a href=tel:" + feature.properties.Phone_Number + " >" + feature.properties.Phone_Number + 
          "</a>" + "<br>" +
          "<b>Lead Agency: </b>" + " " + feature.properties.Lead_Agency + "<br>" +
          "<b>YOW FTE: </b>" + " " + feature.properties.YOW_FTE + "<br>" +
          "<b>EYOW FTE: </b>" + " " + feature.properties.EYOW_FTE + "<br>" 
        );
    }
}

var mymap = L.map('mapid',{ zoomControl:false }).setView([43.6532, -79.3832], 6);

        L.control.zoom({position: 'topright'}).addTo(mymap)


        var pts = uploadFile("data/geojson/YOW_data.geojson");
        console.log(pts);

        var ptsLayer = L.geoJson(pts, {
          onEachFeature: onEachFeature
        }).addTo(mymap);

        
       L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(mymap);

window.onload = function(){
    document.getElementById("topicSelect").onchange = function()
    {            
        document.getElementById("buttons").innerHTML = buttonSelector(document.getElementById("topicSelect").value)
        ptsLayer.clearLayers();

        L.geoJson(pts).addTo(mymap);
    }
    document.getElementById("buttons").onchange = function()
    {
        
        dat = document.querySelector('input[type="radio"]:checked').value;               
        ptsLayer.clearLayers();
        ptsLayer = L.geoJson(pts).addTo(mymap);      
    }

    var myIcon = L.icon({
    iconUrl: 'img/marker.svg',
    iconSize: [38, 95]
});

    var options = {
  		bounds: true,
  		position: 'topright',
  		expanded: true,
      markers: true,
      markers: {draggable: false, icon: myIcon},
      autocomplete: true,
      place: true,
      panToPoint: true
	};

  L.control.geocoder('mapzen-Ltbsia1', options).addTo(mymap);
  mymap.on('click');
};