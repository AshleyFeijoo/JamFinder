var bandName;
var ticketPrice;


$(document).ready(function () {
    var queryURL=
'https://api.seatgeek.com/2/events?highest_price.lte=20&client_id=MTY1NjgwMTl8MTU1NzQyMDI4MC4xMg&client_secret=f9f63594fce4ac5f8aa2acf1e4493535fa0737bc66704e56927978faf6ba5d23'
$.ajax({
    type: "GET",
    url: queryURL,
    success: function (response) {
        console.log(response.events[0].stats); 
      
    }
});

    $('.dropdown-trigger').dropdown();
    // $(function() {
    //     $('.item').matchHeight({
    //         target: $('.sidebar')
    //     });
    // });
    console.log("yay")


    // $('#tableContents').append('<thead>' +
    //     '<tr>'+
    //     '<th><img class="butt" id="' + csKey + '"' +  'style="width:25px; height:25px"  src="./assets/images/x-button.svg"></th>'+
    //     '<th>' + trainName + '</th>' + 
    //    '<th>' + trainDestin + '</th>'+
    //    '<th>' + trainFreq + '</th>'+
    //    '<th>' + nextTrain + '</th>'+
    //    '<th>' + timeUntilTrain + '</th>'+
    //    '</tr>'+
    //    '</thead>'
    //    )

});
