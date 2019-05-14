
//=========++++++++++========================++++++++++===============//
  // GLOBAL VARIABLES
//=========++++++++++========================++++++++++===============//
window['moment-range'].extendMoment(moment);

var today = moment().format('YYYY-MM-DD');
var tomorrow = moment().add(1,'days').format("YYYY-MM-DD");
var nextWeek = moment().add(7,'days').format('YYYY-MM-DD');
var nextMonth = moment().add(30,'days').format('MM-DD-YYYY');
var date;
var latOne;
var longOne;
var dateTime=[];
var venueLoc;
var selectedDate;
var selected;
var dateSel;
var selectedTwo;
var genreSel;
var selectedThree;
var priceSel;


var startDate = new Date(today);
var endDate = new Date(nextWeek);


  // date array
var getDateArray = function(start, end) {

  var
    arr = new Array(),
    dt = new Date(start);

  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;

}

//=========++++++++++========================++++++++++===============//
  //DOCUMENT LOAD++++
//=========++++++++++========================++++++++++===============//
$(document).ready(function () {
$('#mainForm').hide();
$('#resultsDiv').hide()
$('.tableRow').hide();
$('#spinner').hide()
getLocation(); //FUNCTION FOR GEOLOCATION


//=========++++++++++========================++++++++++===============//
  //MATERIALIZE INITIALIZERS  
//=========++++++++++========================++++++++++===============//

M.AutoInit();
$('.pushpin').pushpin();
$('select').formSelect();
$('.dropdown-trigger').dropdown();

//=========++++++++++========================++++++++++===============//
//GEOLOCATION HTML THAT ASKS USER FOR THEIR GEOLOCATION
//=========++++++++++========================++++++++++===============//

  function getLocation() {
    
    if (navigator.geolocation) {
      $('#spinner').show();
      //IF USER GRANTS THE LOCATION IT RUNS THE FUNCTION 'show position'
      navigator.geolocation.getCurrentPosition(showPosition);
      
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//=========++++++++++========================++++++++++===============//
//FUNCTION THAT SHOWS THE LONG AND LAT OF USER'S POSITION
//=========++++++++++========================++++++++++===============//

function showPosition(position) {
  $('.locSpinner').hide();
  $('.begin').hide();
  $('#mainForm').show();


  var tempLong = position.coords.longitude;
  var tempLat= position.coords.latitude;
  longOne = tempLong.toFixed(2);
  latOne = tempLat.toFixed(2);
  console.log('your longitude is ' + longOne);
  console.log('your latitude is ' + latOne);

}


$('#jamBtn').click(function(event) {
  event.preventDefault()

  // GETTING THE DATES & GENRES AND PRICE //
   selected = $('.datesDiv option:selected');
   dateSel = selected[0].label;
   selectedTwo = $('.genreDiv option:selected');
   genreSel = selectedTwo[0].label;
   selectedThree = $('.priceDiv option:selected');
   priceSel = selectedThree[0].label;

  console.log('The date you chose is: '  + dateSel);
  console.log('The Genre you chose is: '  + genreSel);
  console.log('The Price you chose is: '  + priceSel);
  if (dateSel !== undefined && genreSel !== undefined && priceSel !== undefined){
    console.log('you filled out some shit, good work!')
    $('#resultsDiv').show()
    $('.tableRow').show();

  }
  if (dateSel === 'Today'){
    datetime = today;
    console.log(datetime)

  }else if(dateSel === 'Tomorrow'){
    datetime = moment().add(1,'days').format('MM-DD-YYYY');
    console.log(datetime);
  }else if(dataSel === 'Next Week'){
    datetime = moment().add(7,'days').format('MM-DD-YYYY');
    console.log(date)
  }


    var client_id = "MTEyMTc0NzN8MTU1NzM0NDE0OS40OA";
    var client_secret = "d6005bfa21771638a4b460529bda0a83178316ba8c20d7ed24f0a383973f6246";
    // var listingCount = "10";
    var baseURL = "https://api.seatgeek.com/2/"; 
    var endpoint = "events";

    var lat = latOne;
    var latString = "&lat=" + lat

    var lon = longOne;
    var lonString = "&lon=" + lon


    var ticketPrice = '100';
    var ticketPriceString = "&lowest_price.lte=" + ticketPrice; 


    // var datetime = datetime;
    var datetimeString = "&datetime_local.lte=" + datetime;

    var taxonomy = "concert";
    var taxonomyString = "&taxonomies.name=" + taxonomy;

    var queryURL = baseURL + endpoint + "/?client_id=" + client_id + "&client_secret=" + client_secret + latString + lonString + ticketPriceString + datetimeString + taxonomyString; 

    console.log('the dateTime is ' + dateTime);

    console.log(queryURL);

  //=========++++++++++========================++++++++++===============//
    // AJAX CALL //
  //=========++++++++++========================++++++++++===============//
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var responseNew = response.events;
      console.log(responseNew);
      if (responseNew.length == 0){
        swal('NO RESULTS!');
      
      }
        for (let i=0; i < responseNew.length; i++){
          console.log(responseNew[i]);
          console.log(genreSel);
          var genreGen = responseNew[i].performers[0].genres[0].name;
          console.log(genreGen);
          var title = response.events[i].title;
          console.log('the title is: ' + response.events[i].title);
          dateTime1 = response.events[i].datetime_local;
          var venueName = responseNew[i].venue.name;

          var price = responseNew[i].stats.median_price;
          console.log('the price is: ' + price);

          venueLoc = response.events[i].venue.city + ', ' + response.events[i].venue.country;
          console.log('the venue is: ' + venueLoc)
          if (venueLoc !== ''){
          }
          var fields = dateTime1.split("T");
          date = fields[0];
          date = moment(date).format("MM-DD-YYYY");
          time = fields[1];
          console.log(time);
          timez = moment(time, 'H:mm:ss').format('hh:mm a')
          console.log('the date of this show is: ' + date);
          console.log('the time of this show is: ' + time);

          if (genreGen == genreSel){
            $('#responseTable').append('<thead>' +
            '<tr>'+
            '<th>' + venueLoc + '</th>'+ '<th>' + venueName + '</th>' + '<th>' + date + '</th>' + '<th>' + timez + '</th>'
            + '<th>' + title + '</th>' + '<th> $'+ price + '</th>'+
            '</tr>'+ 
            '</thead>'
            )
            console.log('same!')
          }else {
            swal('SORRY NO RESULTS!');
          
          }
 

       
        }


    });



//end showLocation

  // getConcertByLatLon(latOne, longOne, "200mi", "20", "2019-05-17");


});

//=========++++++++++========================++++++++++===============//
  // FUNCTION FOR GETTING THE EVENT INFORMATION
//=========++++++++++========================++++++++++===============//




  
}); //end document ready


     