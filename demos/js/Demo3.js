$(document).ready(function() {

  		$.ajax({
    		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Orders')/items?$select=*,CSAgent/Id,CSAgent/Title&$expand=CSAgent/Id", //Gets Orders
    		method: "GET",
    		headers: {"accept": "application/json;odata=verbose"},
			success: function(xData, request){
				console.log(xData);
				var html = [];
				//Iterate through the results of the REST call
				for(var i=0; i < xData.d.results.length; i++){
					//Leverage underscore to flatten an object to a string which gives you pencils,folders,envelopes
					var allItems = _.flatten(xData.d.results[i].Items.results);
					var lastUpdated =  moment(data.Last_x0020_Update).format('MM/DD/YY');

					html.push("<tr><td>"+xData.d.results[i].OrderNumber+"</td><td>"+xData.d.results[i].OrderAmount+"</td><td>"+xData.d.results[i].CSAgent.Title+"</td><td>"+xData.d.results[i].OrderStatus+"</td><td>"+lastUpdated+"</td><td>"+allItems+"</td></tr>");

				}
				$('table#SlalomOrders').append(html); //Append stringifyed text to WebDetails DIV 
            	console.log(xData); //Log xData to console
        	},    	
        	error: function(message){
    			console.log(message); //Error message for AJAX call
    		}
  		});
} );