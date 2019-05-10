var queryURL=
'https://api.seatgeek.com/2/events?highest_price.lte=20&client_id=MTY1NjgwMTl8MTU1NzQyMDI4MC4xMg&client_secret=f9f63594fce4ac5f8aa2acf1e4493535fa0737bc66704e56927978faf6ba5d23'
$.ajax({
    type: "GET",
    url: queryURL,
    success: function (response) {
        console.log(response.events[0].stats); 
      
    }
});


