
      // constructing a queryURL variable we will use instead of the literal string inside of the ajax method
      $(document).ready(function () { 
        M.AutoInit();

      $('select').formSelect();

      $('.dropdown-trigger').dropdown();
  
      console.log("yay")
  
      //initializes all the dropdowns
      $('.dropdown-trigger').dropdown();
      
      //handle clicks for dates dropdown
      $("#dropdown1 > li").click(function(){
          var clicked1 = $(this).text();
          console.log(clicked1);
      });
      //handle clicks for genres dropdown
      $("#dropdown2 > li").click(function(){
          var clicked2 = $(this).text();
          console.log(clicked2);
      });
  
      //handle the search box and button
      $("#searchButton").click(function(){
          term = $("#searchBox").val();
          console.log("seach term was: "+term);
          $("#searchBox").val("");
      });
  
      function getConcertByLatLon(lat, lon, range, ticketPrice, datetime){

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

        var datetime = datetime;
        var datetimeString = "&datetime_local.lte=" + datetime;

        var taxonomy = "concert";
        var taxonomyString = "&taxonomies.name=" + taxonomy;

        var queryURL = baseURL + endpoint + "/?client_id=" + client_id + "&client_secret=" + client_secret + latString + lonString + rangeString + ticketPriceString + datetimeString + taxonomyString; 

        

        console.log(queryURL);

        // $.ajax({
        //   url: queryURL,
        //   method: "GET"
        // }).then(function(response) {
        //     console.log(response);
        //     for (i=0; i < 21; i++)
        //     console.log(response.genres[i].name);
        // });

      }

    getConcertByLatLon("44.98", "-93.18", "200mi", "10", "2019-05-17");
    
    
  }); //end document ready
     