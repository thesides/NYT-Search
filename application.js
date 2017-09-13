$(document).ready( function (){
	$('#search').on("click", function(){
		event.preventDefault();
		//get data from input search term
		var searchTerm= $("#search-text").val();
		//check if required feild are type and return error if not
		if (searchTerm.length <= 0)
		{
			alert("Enter a search term");
			return;
		}

		//get data from input number of records
		var resultsWanted=$('#records').val()
		if (resultsWanted === NaN || resultsWanted === "" || resultsWanted==='undefined')
		{
			resultsWanted = 5;
		}

		//check if dates given
		var startDate=$('#start-year').val();
		var endDate=$('#end-year').val();
		// if dates not provided by user, set the startDate to a date two years before endDate as current date in form of YYYMMDD
		if(startDate==='' || endDate===''){
			var date= new Date();
			var month=date.getMonth()+1,
				day=date.getDate(),
				year=date.getFullYear();
			/*alert("please enter valid start and/or end dates");
			return;*/
			if (month < 10){
				month = '0' + month;
				endDate=year+''+month+''+day;	
				startDate=(year-2)+''+month+''+day;
			} 
			if (day < 10) {
				day = '0' + day;
				endDate=year+''+month+''+day;	
				startDate=(year-2)+''+month+''+day;
			}
		}
		
		//setup search term to add to queryURL
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		url += '?' + $.param({
			'api-key': "93fca3162e684fca9fcbe6ffe6185486",
			'q': searchTerm,
			'fq': resultsWanted,
			'begin_date': startDate,
			'end_date' : endDate
		});
		
		$.ajax({
			url: url,
			method: 'GET',
			dataType: "json",
		})
		.done(function(result) {
			//if results.length < resultsWanted
			if(resultsWanted>result.response.docs.length){
				resultsWanted=result.response.docs.length;
			}			
			//clear a list to display search results into 
			var uldisplay='<ul class="list-group">';			
			for(var i=0 ; i < resultsWanted ; i++ ){
				var author=result.response.docs[i].byline;
				if(author=== undefined){
					author='By Anonymous';
				}else{
					author=result.response.docs[i].byline.original;
				}
				var liDisplay='<li class="list-group-item" id="articleList"><div class="panel panel-default"><div class="panel-heading panel-heading-custom"><h6 class="panel-title">'+result.response.docs[i].headline.main+'<h6><p>Article '+author+'</p><p>Published on: '+result.response.docs[i].pub_date+ '</p></div> <div class="panel-body" id="articleList"><p>'+result.response.docs[i].snippet+'</p><a href='+result.response.docs[i].web_url+' target= _blank>Click to view full article.</a></div></li><br>'
				uldisplay+=liDisplay;
			}
			$('#articleList').html(uldisplay);
		})
		.fail(function(err) {
			console.log(err);
		});
	});
});