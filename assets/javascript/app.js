
// this is Michael Clautice's Giphy API Site V5 √
// *
// •••••••••••••••••••••••••••••
// ----THE GOOD OLE DOC.READY FUNCTION---- √√
// so the html loads before the JS executes √√
$( document ).ready(function() {
// *
// •••••••••••••••••••••••••••••
// ----CREATE AN ARRAY OF GIPHY TOPICS---- √√
// 1st code i must write is an array of strings √√
// ea str is related to a Giphy topic of my choice √√
// new Giphy topics will be "pushed" into this array via... √√
// the gif-form's submit button √√
var emotionsArray = ["Surprise", "Anger", "Joy"];
// •••••••••••••••••••••••••••••
// *
// •••••••••••••••••••••••••••••
// ----DEFINE A FUNCTION THAT DISPLAYS THE GIPHY TOPIC BUTTONS---- √√
// this function accepts no values √√
function displayGifButtons(){
// jQ calls the empty() function on the targeted #gifButtonsView div √√
// empty() will empty EVERYTHING in #gifButtonsView div first so... √√
// it won't contain any duplicate Giphy buttons √√
    $("#gifButtonsView").empty();
// THIS FOR-LOOP WILL LOOP-ITERATE THRU THE emotionsArray ... √√
// WITH EA LOOP IT WILL EXECUTE 5 ACTIONS √√
    for (var i = 0; i < emotionsArray.length; i++) {
// action #01 √√
// define this var √√
        var gifButton = $("<button>");
// action #02 √√
// call addClass() on that var √√
        gifButton.addClass("action btn btn-primary");
// action #03 √√
// add an attribute & value to that var √√
// the attr is "data-name", its value is the submitted Giphy topic √√
        gifButton.attr("data-name", emotionsArray[i]);
// action #04  √√
// add a text value to that variable √√
// text() will give the new Giphy button a text label √√
        gifButton.text(emotionsArray[i]);
// action #05 √
// jQ will target the empty #gifButtonsView div and... √√
// append our finished gifButton to that markup √√
        $("#gifButtonsView").append(gifButton);
    }
// end of for loop √√
}
// end of displayGifButtons() definition √√
// •••••••••••••••••••••••••••••
// *
// •••••••••••••••••••••••••••••
// ----DEFINE A FUNCTION THAT ADDS A NEW GIPHY TOPIC BUTTON---- √√
function addNewButton(){
    $("#addGifButton").on("click", function(){
// define a var to hold the submitted emotion √√
    var emotion = $("#emotion-input").val().trim();
// added so user cannot add a blank button √√
    if (emotion === " "){
      return false;
    } else {
      emotionsArray.push(emotion);
    displayGifButtons();
    return false;
    }
    });
}
// •••••••••••••••••••••••••••••
// *
// •••••••••••••••••••••••••••••
// ----DEFINE A FUNCTION THAT REMOVES THE MOST RECENT GIPHY TOPIC BUTTON---- √√
function removeLastButton(){
// #removeGifButton is the "Remove last emotion" button √√
    $("#removeGifButton").on("click", function(){
// pop() removes the last element of an array √√
    emotionsArray.pop(emotion);
// call displayGifButtons() to display remaining buttons after pop() √√
    displayGifButtons();
    return false;
    });
}
// •••••••••••••••••••••••••••••
// *
// this is Michael Clautice's Giphy API Site V5 √√
// *
// •••••••••••••••••••••••••••••
// ----DEFINE A FUNCTION THAT DISPLAYS THE GIPHYS---- √√
function displayGifs(){
// define a var to hold the submitted emotion √√
    var emotion = $(this).attr("data-name");
// define a var to hold the API Key & request √√
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=dc6zaTOxFJmzC&limit=10";
// displays the constructed url √√
    console.log(queryURL);
// the AJAX function √√
// The ajax() method is used to perform an AJAX (asynchronous HTTP) request √√
    $.ajax({
        url: queryURL,
// 2 methods for a request-response between client & server: GET and POST √√
        method: 'GET'
    })
// here is the "promise" via the done() function √√
    .done(function(giphyResponse) {
// console test to make sure something returns - IT WORKS!! √√
        console.log(giphyResponse);
// emptying the previous gifs in this div to make room for the current gifs √√
        $("#gifsView").empty();
//shows results of gifs √√
        var results = giphyResponse.data;
        if (results === ""){
// an ALERT BOX!! √√
          alert("Hey, buddy! There ain't a gif for this selected button");
        } else {
        for (var i=0; i<results.length; i++){
//div for the gifs to go inside √√
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
// pulling rating of ea gif √√
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
// pulling gif √√
            var gifImage = $("<img>");
// still image stored into src of image √√
            gifImage.attr("src", results[i].images.fixed_height_small_still.url);
// data-state: still gif image √√
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
// data-state: animated gif image √√
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
// set the image's data-state √√
            gifImage.attr("data-state", "still");
// add this class to the gif image √√
            gifImage.addClass("image");
// append the gifImage into the gifDiv √√
            gifDiv.append(gifImage);
// prepending the gifDiv into the gifsView idv in the markup √√
            $("#gifsView").prepend(gifDiv);
            }
        }
    });
}
// •••••••••••••••••••••••••••••
// *
// •••••••••••••••••••••••••••••
// ----FUNCTION CALLS----
// displays the giphy topic buttons √√
displayGifButtons();
// adds a new Giphy topic button √√
addNewButton();
// Function to remove last emotion button √√
removeLastButton();
// •••••••••••••••••••••••••••••
// ----2 EVENT LISTENERS----
// click event that displays the Giphys √√
// the gif buttons dont have id attrs so...
// we call the on() function on the document obj √√
$(document).on("click", ".action", displayGifs);
// click event that "toggles" ea Giphy from static to animated √√
// the value static doesn't work so i used the value "still" √√
$(document).on("click", ".image", function(){
// save the data-state attr in a var called giphyState √√
    var giphyState = $(this).attr('data-state');
    if ( giphyState === 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
// •••••••••••••••••••••••••••••
});
// close the doc.ready() function √√
// this is Michael Clautice's Giphy API Site V5 √√
