
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $("label").css("color","#fafafa");
	$greeting.text('So, you want to live at ' + address + '?').css("color","#fafafa");

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '' ;
	
    $body.append('<img class="bgimg" src=" ' + streetviewUrl + ' ">');

	var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityStr+'&sort=newest&api-key=20f0bb7e6e6849ada720f0f5cbf211f5'
	
$.ajax({
    url: nytimesUrl,
    method:'GET',             //from NYT we 'get' JSON data. 
}).done(function(data){     //when NYT API request succeed, then it works.
        $nytHeaderElem.text('New York Times articles about ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];

            $nytElem.append('<li class = "article">' + '<a href = "'+article.web_url+'">' + article.headline.main + '</a>' + 
            '<p>' + article.snippet + '</p>' +
			'</li>');
        };

}).error(function() {
    $nytHeaderElem.txt( 'Handler for .error() called.');
  });
  
    return false;
}
 
 


$('#form-container').submit(loadData);
