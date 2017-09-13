$(document).ready( function (){
	$('#search').on("click", function(){

		//get data from input search term
		var searchTerm= $("#search-text").val();
		console.log(searchTerm);
		//check if required feild are type and return error if not
		if (searchTerm.length <= 0)
		{
			alert("Enter a search term");
			return;
		}
		//get data from input number of recordss
		var resultsWanted=$('#records').val();

		if (resultsWanted === NaN || resultsWanted === "" || resultsWanted==='undefined')
		{
			resultsWanted = 1;
		}
		//check if dates given

		//setup search term to add to queryURL
		/*queryURL="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=93fca3162e684fca9fcbe6ffe6185486&q="+searchTerm+"&fq="+resultsWanted;*/
		//pass to queryURL
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+searchTerm+"&fq="+resultsWanted+"&api-key=93fca3162e684fca9fcbe6ffe6185486";
		queryURL += '?' + $.param({
			'api-key': "93fca3162e684fca9fcbe6ffe6185486",
			'q': "searchTerm",
			'fq': "resultsWanted"

		});

		console.log(queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		//.done with respones console log
		.done(function(response){
			var results=response.response.docs;
			var para = $('<p>');
			para.text(results);
			$('.panel-body').append(para);
			

			
		//start for loop
		/*for (var i = 1; i <= resultsWanted.parseInt(); i++) {
			results[i]
		}*/
		//create a div for article 
		//populate article with title (possibly make anchor), author and index
		//append article to where ever it goes
		//end for loop
		 console.log(results);
	
	
});
		 
});

});