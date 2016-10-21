$( document ).ready(function() {
          //console.log('hope');
$('#selection').heapbox({'onChange':function(){
       $('.loader').show();

       //when you select category, shrinks header
       $('.wrapper').addClass('shrinkHeader');
	
		event.preventDefault(); 
	
		//API article grid 
		var $news = $('.news');

		//option user selects
    var optSelect = $('#selection').val();
        
        //API with option user selected

		var url = 'https://api.nytimes.com/svc/topstories/v2/'+optSelect+'.json';

		url += '?' + $.param({
  'api-key': '7f327b6d81a44b53855a2d2c17d3c2ea'
});

	$.ajax({
		url: url,
		method: 'GET',
	})
	.done(function(data) {
    // article grid area empties after each selection
		$news.empty();
		//content is the output from the API
    var content='';
            //console.log(data.results);
            var dataResults = data.results.filter(function(value){

                return value.multimedia.length >=5;
              }) 
              dataResults.splice(12);

          $.each(dataResults, function(key, value){
            

            //each article's content
            var articleLink = value.url;
            var abstract = value.abstract;
            var multimedia = value.multimedia;
            //filter out empty arrays
            //console.log(multimedia.length);

            if (multimedia.length !== 0){


             content += '<li>';
             content += '<a href="'+ articleLink + '" target="_blank">';
             content += '<div class="inner-article">';

             content += '<div class="article_images" style="background-image:url('+multimedia[4].url + ')">';

            content	+= '<div class="abstract">';
             content +='<p>' + abstract + '</p>';
             content += '</div>';
             content += '</div>';
             content += '</div>';

             content += '</a>';
             content +='</li>';

            }

           })
      $news.append(content);
  
      })
	

	.fail(function() {

		$news.append('<li>Sorry! There was a problem, please try again.</li>');
	})

.always(function(){
          $('.loader').hide();
    }); 
}
});


});






