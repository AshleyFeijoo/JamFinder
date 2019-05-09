var crd;

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    var queryURL = "https://nominatim.openstreetmap.org/reverse?format=geojson&lat=" + 
    crd.latitude + "&lon=" + crd.longitude;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.features[0].properties.address.postcode);
    });

  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

  

