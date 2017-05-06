var slalomOrders = {} || slalomOrders;

$(document).ready(function () {

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Orders')/items?$select=*,CSAgent/Name,CSAgent/Title&$expand=CSAgent/Id",
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Orders')/items?$select=*,CSAgent/Name,CSAgent/Title&$expand=CSAgent/Id&$filter=OrderStatus eq 'Shipped'",
        method: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function (xData, request) {
            slalomOrders.Table = $('table#SlalomOrders').DataTable({
                "bDestroy": true,
                "bProcessing": true,
                "aLengthMenu": [[10, 20, 30], [10, 20, 30]], //Dropdown choices for how many items to show per page
                "iDisplayLength": 10, //How many items to display by default
                "aaData": xData.d.results, //Data to process in the table
                "order": [[2, "asc"]], //Sort by this column
                "aoColumns": [
                    { "mData": "OrderNumber" },
                    { "mData": "OrderAmount" },
                    {
                        "mData": function (data, type, val) {
                            var items = [];
                            //console.log(data);
                            for (var i = 0; i < data.Items.results.length; i++) {
                                items.push(data.Items.results[i]);
                            }
                            return items;
                        }
                    },
                    { "mData": "CSAgent.Title" },
                    { "mData": "OrderStatus" },
                    {
                        "mData": function (data, type, val) {
                            var available = moment(data.Last_x0020_Update).format('MM/DD/YY');
                            return available;
                        }
                    }
                ]
            });

        }, error: function (message) {
            console.log(message); //Error message for AJAX call
        }
    });
});