$(document).ready(function() {

  		$.ajax({
    		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/", //Gets details on the current Web
    		method: "GET",
    		headers: {"accept": "application/json;odata=verbose"},
			success: function(xData, request){
				var WebTemplate = xData.d.WebTemplate;
				$('div#WebDetails').append(WebTemplate); //Append stringifyed text to WebDetails DIV 
            	console.log(xData); //Log xData to console
        	},    	
        	error: function(message){
    			console.log(message); //Error message for AJAX call
    		}
  		});
} );