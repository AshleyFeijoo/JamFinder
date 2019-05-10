$(document).ready(function () {
    $('.dropdown-trigger').dropdown();
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