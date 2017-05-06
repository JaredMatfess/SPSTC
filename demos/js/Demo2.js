$(document).ready(function() {

  		$.ajax({
    		url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Orders')/items?$select=*", //Gets Orders
    		method: "GET",
    		headers: {"accept": "application/json;odata=verbose"},
			success: function(xData, request){
				console.log(xData);
				var html = [];			
				for(var i=0; i < xData.d.results.length; i++){
					html.push("<tr><td>"+xData.d.results[i].OrderNumber+"</td><td>"+xData.d.results[i].OrderAmount+"</td><td>"+xData.d.results[i].CSAgentId+"</td><td>"+xData.d.results[i].OrderStatus+"</td><td>"+xData.d.results[i].Last_x0020_Update+"</td><td>"+xData.d.results[i].Items+"</td></tr>");
				}
				$('table#SlalomOrders').append(html); //Append stringifyed text to WebDetails DIV 
        	},    	
        	error: function(message){
    			console.log(message); //Error message for AJAX call
    		}
  		});
} );