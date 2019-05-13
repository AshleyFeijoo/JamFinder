
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB8H5XDQflXx8KxdohIen146B9gyJIEJvA",
    authDomain: "jamfinder-ae411.firebaseapp.com",
    databaseURL: "https://jamfinder-ae411.firebaseio.com",
    projectId: "jamfinder-ae411",
    storageBucket: "jamfinder-ae411.appspot.com",
    messagingSenderId: "933894672452",
    appId: "1:933894672452:web:d8aab0e980741511"
  };
 
  firebase.initializeApp(firebaseConfig);


$(document).ready(function () {
    $('select').formSelect();

    $('.dropdown-trigger').dropdown();

    console.log("yay")

});

$( document ).ready(function() {
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
    
});
