$(document).ready( function (){
	$(document).on("click", /*button name*/, getResults);
	function getResults() {
		var queryURL;
		//get data from input search term
		var searchTerm=$("#search-text").val();
		//check if required feild are type and return error if not
		if (searchTerm.length <= 0)
		{
			alert("Enter a search term");
			return;
		}
		//get data from input number of records
		var resultsWanted=$(/*number of results input*/).val();
		if (resultsWanted.parseInt() === NaN)
		{
			alert("input a number");
			return;
		}
		//check if dates given

		//setup search term to add to queryURL
		queryURL="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=93fca3162e684fca9fcbe6ffe6185486&q="+searchTerm+"&fq="+resultsWanted;
		//pass to queryURL
		//call AJAx get withj queryURL
		$.ajax({
          url: queryURL,
          method: "GET"
        })
		//.done with respones console log
		.done(function(response){
		console.log(response);
		var results=response.response.docs;
		//start for loop
		for (var i = 1; i <= resultsWanted.parseInt(); i++) {
			results[i]
		}
		//create a div for article 
		//populate article with title (possibly make anchor), author and index
		//append article to where ever it goes
		//end for loop
		});
	}
});