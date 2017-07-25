var searchBtn;
var resultGif;
var gifSearchBtn;
var gifsGoHere = $("#gifsGoHere");
var APIKey = "3e43d0053a0243f29982948ebc1ab07e";
var queryURL = "https://api.giphy.com/v1/gifs/search?";
var state = "animated";

//for soccer, boxing and baseball variables
// var topics = [];

function search() {
  gifSearchBtn = $("#gifSearchBtn");
  var searchButton = $("#search").val();
  searchBtn = $("<button>");
  searchBtn.attr("data-value", searchButton);
  searchBtn.text(searchButton);
  searchBtn.addClass("btn btn-default btn-lg active gifbutton");
  gifSearchBtn.append(searchBtn);

};

  $("button").on("click", function(){
    var sports = $(this).attr("data-value");
    console.log(sports);
    gifsGoHere.empty()
    var ajaxURL = queryURL+"q="+sports+"&api_key="+APIKey;
    console.log(ajaxURL);

    $.ajax({
      url: ajaxURL, 
      method: "GET"
    }).done(function(response) {
      for(var i = 0; i < response.data.length; i++){
        var searchDiv = $("<div>");
        var p = $("<p>").text("Rating: " + response.data[i].rating);
        var searchGif = $("<img>");

        searchGif.attr("data-value", response.data[i].id);
        searchGif.attr("animate-url", response.data[i].images.fixed_height.url);
        searchGif.attr("still-url", response.data[i].images.fixed_width_still.url);
        searchGif.attr("state", "animate");
        searchGif.addClass("giph");

        searchGif.attr("src", response.data[i].images.fixed_height.url);
        searchGif.append(p);
        searchGif.append(response.data);
        $("gifsGoHere").append(resultGif);
      }
    });
  });




