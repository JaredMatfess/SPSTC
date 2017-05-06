
$(document).ready(function () {
    var slalomChartData = [];
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Orders')/items?$select=*",
        method: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function (xData, request) {
            for (var i = 0; i < xData.d.results.length; i++) {
                slalomChartData.push(xData.d.results[i].OrderStatus);
            }
            console.log(slalomChartData);
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);


            function drawChart() {

                var received = _.countBy(slalomChartData)['Received'];
                var inProcess = _.countBy(slalomChartData)['In-Process'];
                var shipped = _.countBy(slalomChartData)['Shipped'];

                var data = google.visualization.arrayToDataTable([
                    ['Category', 'Status'],
                    ['Received', received],
                    ['Shipped', shipped],
                    ['In-Process', inProcess]
                ]);

                var options = {
                    title: 'Order Status'
                };

                var chart = new google.visualization.PieChart(document.getElementById('piechart'));

                chart.draw(data, options);
            }
        }
    });
});