
      // constructing a queryURL variable we will use instead of the literal string inside of the ajax method

      var latStart;
    var lonStart;
    var numPages = 1;
    var genreTerm;
    var priceTerm;
    var startDateTerm;
    var endDateTerm;

      // $(document).ready(function () { 
      $('select').formSelect();
  
  

      // $('form').submit(function(evt) {
      //   evt.preventDefault();
      //   // var data = $("#jamForm :input").serializeArray();
    //     var data = $('#jamForm') + '<br/>';
    //     console.log($('form').serialize());
    // });


    navigator.geolocation.getCurrentPosition(function(location) {
      latStart = (location.coords.latitude);
      lonStart = (location.coords.longitude);
      console.log(lonStart);
      console.log(latStart);
      // getConcertByLatLon(latStart, lonStart, "50mi", "200", "2019-05-25");
    });
    
    
    function paginationNextFunction() {
      numPages++
      console.log(numPages);
      // getConcertByLatLon(latStart, lonStart, "50mi", "200", "2019-05-25");
    
    }

    
    $('form').submit(function(evt) {
      evt.preventDefault();
      formData= new FormData(evt.target);
      console.log(formData.get('dateSelect'));
      console.log(formData.get('genreSelect'));
      console.log(formData.get('priceSelect'));
      //Dates parsed here 
      switch (formData.get('dateSelect')){
        case "Today":
          console.log('today processed');
          startDateTerm = moment().format('MM-DD-YYYY');
          endDateTerm =  moment().format('MM-DD-YYYY');
          break;
        case "Tomorrow":
          console.log ('tom. proccessed');
          startDateTerm = moment().add(1, 'd').format('MM-DD-YYYY');
          endDateTerm = moment().add(1, 'd').format('MM-DD-YYYY');
          break;
        case "This Weekend":
          console.log (' this weekend processed');
          weekend = getWeekendDates();
          startDateTerm = weekend.Friday;
          endDateTerm = weekend.Sunday;
          break;
        case "This Month":
          console.log ('month processed');
          startDateTerm = moment().format('MM-DD-YYYY');
          endDateTerm = moment().date(31).format('MM-DD-YYYY');
          console.log (endDateTerm + "is the last day of the month");
          break;
        case "Next Month":
          console.log ('next month processed');
          startDateTerm = moment().add(1, 'M').date(1).format('MM-DD-YYYY');
          endDateTerm = moment().add(1, 'M').date(31).format('MM-DD-YYYY');  //investigate/fix off by one day 
          console.log (startDateTerm + "is the 1st of next month. " +endDateTerm + "is the last day of next month");
          break;
      }
      genreTerm = formData.get('genreSelect');
      priceTerm = formData.get('priceSelect');
      getConcertByLatLon(latStart, lonStart, "200mi", priceTerm, startDateTerm, endDateTerm, genreTerm);
    });
    

//returns an object with friday's date and sunday's date
    function getWeekendDates(){
      // console.log(moment().format('MM-DD-YYYY'));
      // console.log(moment().day(5).format('MM-DD-YYYY'));
      // console.log(moment().day(7).format('MM-DD-YYYY'));
      thisFriday = moment().day(5).format('MM-DD-YYYY');
      thisSunday = moment().day(7).format('MM-DD-YYYY');
      return {"Friday": thisFriday, "Sunday": thisSunday};
    }
        // getConcertByLatLon("44.98", "-93.18", "200mi", "10", weekend.Friday , weekend.Sunday);
      // $("li").click(function(){
      //   date = $(this).text();
      //   console.log("date selected:" + date);
      // });
      // $("#genreSelect option").click(function(){
      //   genre = $(this).text()
      //   console.log("genre selected:" + genre);

      // });
      // $("#priceSelect option").click(function(){
      //   price = $(this).text()
      //   console.log("price selected:" + price);

      // });


      //handle the search box and button
      // $("#jamBtn").click(function(evt){
      //     evt.preventDefault();
      //     console.log("seach term was: ");

      
      //   });
  
      function getConcertByLatLon(lat, lon, range, ticketPrice, datetimeStart, datetimeEnd, genre){

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

        if (ticketPrice){
          var ticketPrice = ticketPrice;
        }
        else{
          var ticketPrice = 100000;
        }

        var ticketPriceString = "&lowest_price.lte=" + ticketPrice; 

        
        
        if (datetimeStart){
          var datetimeStart = datetimeStart;  
          var datetimeEnd = datetimeEnd;
          
        }
        else {
          var datetimeStart = moment().format('MM-DD-YYYY');
          var datetimeEnd = moment().add(1, 'd').format('MM-DD-YYYY');
        }
        var datetimeStartString = "&datetime_local.gte=" + datetimeStart;
        var datetimeEndString = "&datetime_local.lte=" + datetimeEnd;                
        var datetimeTodayString = "&datetime_local.gt=" + datetimeStart;

        var taxonomy = "concert";
        var taxonomyString = "&taxonomies.name=" + taxonomy;

        var genre = genre;
        if (genre){
          var genreString = "&genres.slug=" +genre;
        }
        else genreString = "";

        if (datetimeStart === datetimeEnd) {

          datetimeEnd = (moment(datetimeStart).add(1, 'd').format('MM-DD-YYYY'));

          queryURL = baseURL + endpoint + "/?client_id=" + client_id + "&client_secret="
            + client_secret + latString + lonString + rangeString + ticketPriceString
            + datetimeTodayString + "&datetime_local.lt=" + datetimeEnd+ taxonomyString +genreString; 
        }
        
        else {

          queryURL = baseURL + endpoint + "/?client_id=" + client_id + "&client_secret="
          + client_secret + latString + lonString + rangeString + ticketPriceString
          + datetimeStartString + datetimeEndString + taxonomyString + genreString; 
        }

        

        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            for (i = 0; i < response.events.length; i++){
              var genreGen = response.events[i].performers[0].genres[0].name;
              console.log('the genre of the event is: ' + genreGen);
              // console.log(response.events[0].title);
              var eventTitle = response.events[i].title;
              // console.log(response.events[0].venue.name);
              var venueName = response.events[i].venue.name;
              // console.log(response.events[0].datetime_local);
              var eventLocalTime = response.events[i].datetime_local;


              var fields = eventLocalTime.split("T");
              date = fields[0];
              date = moment(date).format("MM-DD-YYYY");
              time = fields[1];
              console.log(time);
              timez = moment(time, 'H:mm:ss').format('hh:mm a')
              console.log('the date of this show is: ' + date);
              console.log('the time of this show is: ' + timez);
    

              // console.log(response.events[0].stats.average_price);
              var eventAveragePrice = response.events[i].stats.median_price;
              var eventUrl = response.events[i].venue.url;
              // if statement to replace null
              if (eventAveragePrice === null){
                eventAveragePrice = "Price Un-Listed";
              } else {
                eventAveragePrice = "$" + response.events[i].stats.average_price;
              }
              var tableLineData = "<tr><td>" + "<a href=" + eventUrl + ">" + venueName + "</a>" + "</td><td>" + date + "</td><td>" + timez + "</td><td>" + eventTitle + "</td><td>" + eventAveragePrice + "</td><td>";
              $("table tbody").append(tableLineData);
              
            };
        });

      }


    
  // }); //end document ready
     