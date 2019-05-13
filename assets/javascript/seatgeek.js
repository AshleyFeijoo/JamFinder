
      // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
          
      function getConcertByLatLon(lat, lon, range, ticketPrice, datetimeStart, datetimeEnd){

        var client_id = "MTEyMTc0NzN8MTU1NzM0NDE0OS40OA";
        var client_secret = "d6005bfa21771638a4b460529bda0a83178316ba8c20d7ed24f0a383973f6246";
        // var listingCount = "10";
        var baseURL = "https://api.seatgeek.com/2/"; 
        var endpoint = "events";

        var lat = lat;
        var latString = "&lat=" + lat

        var lon = lon;
        var lonString = "&lon=" + lon

        var range = range;
        var rangeString = "&range.lte=" + range

        var ticketPrice = ticketPrice;
        var ticketPriceString = "&lowest_price.lte=" + ticketPrice; 

        var datetimeStart = datetimeStart;
        var datetimeStartString = "&datetime_local.gte=" + datetimeStart;

        var datetimeEnd = datetimeEnd;
        var datetimeEndString = "&datetime_local.lte=" + datetimeEnd;

        var datetimeTodayString = "&datetime_local.gt=" + datetimeStart;


        var taxonomy = "concert";
        var taxonomyString = "&taxonomies.name=" + taxonomy;

        var queryURL;
        
        if (datetimeStart === datetimeEnd) {

          datetimeEnd = (moment(datetimeStart).add(1, 'd').format('MM-DD-YYYY'));

          queryURL = baseURL + endpoint + "/?client_id=" + client_id + "&client_secret="
            + client_secret + latString + lonString + rangeString + ticketPriceString
            + datetimeTodayString + "&datetime_local.lt=" + datetimeEnd+ taxonomyString; 
        }
        
        else {

          queryURL = baseURL + endpoint + "/?client_id=" + client_id + "&client_secret="
          + client_secret + latString + lonString + rangeString + ticketPriceString
          + datetimeStartString + datetimeEndString + taxonomyString; 
        }


        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            // storeVideosId();
        });

      }

    getConcertByLatLon("44.98", "-93.18", "200mi", "10", "2019-05-13", "2019-06-25");
    getConcertByLatLon("44.98", "-93.18", "200mi", "10", "2019-05-14", "2019-05-14");
    
  
      
     