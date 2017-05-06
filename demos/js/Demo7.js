
$(document).ready(function () {
    'use strict';
    var currentDate = new Date();
    //console.log(currentDate);
    var listGuid = "FCA67497-A846-4CE1-860E-ED99099BBD2E"; //add your list guid
    currentDate = moment(currentDate).format("YYYY-MM-DD");

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/ListData.svc/Events?select=*&$filter=StartTime+ge+datetime'" + currentDate + "'&$top=3&$orderby=StartTime asc",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: getUserSuccess,
        error: getUserError
    });

    function getUserSuccess(data, request) {

        var html = [];
        var results = data.d;
        var site = getUrl();
        for (var i = 0; i < results.length; i++) {
            var calendarEventDate = moment(results[i].StartTime).format('LT - ');
            var calendarEndDate = moment(results[i].EndTime).format('LT');

            html.push("<div class='eventItem'>");
            var dayOfWeek = moment(results[i].StartTime).format('ddd'); //Day of the dayOfWeek
            var month = moment(results[i].StartTime).format('MMM');
            var dayNumber = moment(results[i].StartTime).format('D');
            html.push("<time datetime='" + results[i].StartTime + "' class='icon'><em>" + dayOfWeek + "</em><strong>" + month + "</strong><span>" + dayNumber + "</span></time></div>");
            html.push("<div class='eventDetails'><div class='eventTitle'><a href=\"#\" onclick=\"javascript:dialogfunction('" + _spPageContextInfo.webAbsoluteUrl + "/Lists/Events/DispForm.aspx?ID=" + results[i].Id + "'); return false;\">" + results[i].Title + "</a></div>");
            html.push("<div class='eventDate'>" + moment(results[i].StartTime).format('dddd, MMMM Do YYYY') + "</div>");
            html.push("<div class='eventLocation'>" + results[i].Location + "</div>");
            html.push("<div class='eventAddCalendarLink'><a href='" + site + "_vti_bin/owssvr.dll?CS=109Cmd=Display&List=" + listGuid + "&CacheControl=1&ID=" + results[i].Id + "&Using=event.ics'>Add to calendar</a></div>");
            html.push("</div></div><br />");


        }
        $('#Events').append(html.join(''));
    }

    function getUserError(error) {
        alert("error");
    }
    function getUrl() {
        var currentUrl = location.href.substring(0, location.href.lastIndexOf('/'));
        if (currentUrl.indexOf('/Pages') > -1) {
            currentUrl = currentUrl.replace('Pages', '');
        }
        if (currentUrl.indexOf('/SitePages') > -1) {
            currentUrl = currentUrl.replace('SitePages', '');
        }
        return currentUrl;
    }
});

function dialogfunction(pageUrl) {

    var options = { url: pageUrl, width: 800, height: 600 };

    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);

}