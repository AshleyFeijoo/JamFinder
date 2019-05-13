
  // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
  var latStart;
  var lonStart;

  navigator.geolocation.getCurrentPosition(function(location) {
    latStart = (location.coords.latitude);
    lonStart = (location.coords.longitude);
    console.log(latStart);
    console.log(lonStart);
  });    

  function getConcertByLatLon(lat, lon, range, ticketPrice, datetime){

    var client_id = "MTEyMTc0NzN8MTU1NzM0NDE0OS40OA";
    var client_secret = "d6005bfa21771638a4b460529bda0a83178316ba8c20d7ed24f0a383973f6246";
    // var listingCount = "10";
    var baseURL = "https://api.seatgeek.com/2/"; 
    var endpoint = "events";

    var lat = lat;
    var latString = "&lat=" + lat;

    var lon = lon;
    var lonString = "&lon=" + lon;

    var range = range;
    var rangeString = "&range.lte=" + range;

    var ticketPrice = ticketPrice;
    var ticketPriceString = "&lowest_price.lte=" + ticketPrice; 

    var datetime = datetime;
    var datetimeString = "&datetime_local.lte=" + datetime;

    var taxonomy = "concert";
    var taxonomyString = "&taxonomies.name=" + taxonomy;

    var queryURL = baseURL + endpoint + "/?client_id=" + client_id + "&client_secret=" + client_secret + latString + lonString + rangeString + ticketPriceString + datetimeString + taxonomyString;

    console.log(queryURL);
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // then call function to update table    
      // function updateMusicTable(){
        console.log(response);
        for (i = 0; i < response.events.length; i++){
          // console.log(response.events[0].title);
          var eventTitle = response.events[i].title;
          // console.log(response.events[0].venue.name);
          var venueName = response.events[i].venue.name;
          // console.log(response.events[0].datetime_local);
          var eventLocalTime = response.events[i].datetime_local;
          // console.log(response.events[0].stats.average_price);
          var eventAveragePrice = response.events[i].stats.average_price;
          var tableLineData = "<tr><td>" + venueName + "</td><td>" + eventLocalTime + "</td><td>" + eventTitle + "</td><td>" + "$" + eventAveragePrice + "</td><td>";
          $("table tbody").append(tableLineData);
        };

    });
    
  };
  // calling our function that spells out our queryURL
  getConcertByLatLon("44.98", "-94.18", "20mi", "200", "2019-05-17");

  // getConcertByLatLon(latStart, LongStart, radius, price, datetime)
  



     
  

  