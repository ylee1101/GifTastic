var searchBtn;
var resultGif;
var gifSearchBtn;
var gifsGoHere = $("#gifsGoHere");
var APIKey = "3e43d0053a0243f29982948ebc1ab07e";
var queryURL = "https://api.giphy.com/v1/gifs/search?";
var state = "animated";

//for soccer, boxing and etc variables
// var topics = [];

function search() {

  gifSearchBtn = $("#gifSearchBtn");
  var searchButton = $("#search").val();
  console.log(searchButton);
  searchBtn = $("<button>");
  searchBtn.attr("data-value", searchButton);
  searchBtn.text(searchButton);
  searchBtn.addClass("btn btn-default btn-lg active gifbutton");
  gifSearchBtn.append(searchBtn);

};

function downloadgifs () {
  var sports = $(this).attr("data-value");
    console.log(sports);
    gifsGoHere.empty()
    var ajaxURL = queryURL+"q="+sports+"&api_key="+APIKey;
    console.log(ajaxURL);

    $.ajax({
      url: ajaxURL, 
      method: "GET"
    }).done(function(response) {
      console.log(response);
      for(var i = 0; i < response.data.length; i++){
        var searchDiv = $("<div>");
        searchDiv.addClass("inline");
        var p = $("<p>").text("Rating: " + response.data[i].rating);
        var searchGif = $("<img>");

        searchGif.attr("data-value", response.data[i].id);
        searchGif.attr("animate-url", response.data[i].images.fixed_height.url);
        searchGif.attr("still-url", response.data[i].images.fixed_width_still.url);
        searchGif.attr("state", "animate");
        searchGif.addClass("giph");

        searchGif.attr("src", response.data[i].images.fixed_height.url);
        searchDiv.append(p);
        searchDiv.append(searchGif);
        $("#gifsGoHere").append(searchDiv);
      }
    });
};

function animateGif (){
  var state = $(this).attr("state");
  console.log(state);
      if (state === "still") {
        $(this).attr("src", $(this).attr("animate-url"));
        $(this).attr("state", "animate");
      } else {
        $(this).attr("src", $(this).attr("still-url"));
        $(this).attr("state", "still");
      }
};


$(document).ready(function(){
  $(document).on("click", "#searchButton", search);
  $(document).on("click", ".gifbutton", downloadgifs);
  $(document).on("click", ".giph", animateGif);
});

//need to resize the still image with animated image & have spacing with individual gifs
