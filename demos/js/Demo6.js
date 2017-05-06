
$(document).ready(function () {
    var results = [];
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/search/query?querytext='ContentType=Item'&path='/sites/hartford/TE/demo/Lists/StatePayroll/'&refiners='RefinableString102'",
        method: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function (xData, request) {
            console.log(xData);
            results = xData.d.query.PrimaryQueryResult.RefinementResults.Refiners.results[0].Entries.results;

            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

                var data = new google.visualization.DataTable();
                // Add columns
                data.addColumn('string', 'Department');
                data.addColumn('number', 'Expenditures');
                //Add rows
                data.addRows(results.length);
                for (var i = 0; i < results.length; i++) {
                    data.setCell(i, 0, results[i].RefinementName);
                    data.setCell(i, 1, results[i].RefinementCount);
                }
                var options = {
                    title: 'State Budget'
                };

                var chart = new google.visualization.ScatterChart(document.getElementById('piechart'));

                chart.draw(data, options);
            }
        }
    });
});