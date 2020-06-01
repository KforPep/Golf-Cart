
//You need to use the correct Salesforce OAuth endpoint when issuing authentication requests in your application. The primary OAuth endpoints are:
//    For authorization: https://login.salesforce.com/services/oauth2/authorize
//    For token requests: https://login.salesforce.com/services/oauth2/token
//    For revoking OAuth tokens: https://login.salesforce.com/services/oauth2/revoke


//$(function () {
//    jsforce.browser.init({
//        clientId: '3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh',
//        redirectUri: 'https://localhost:1525/'
//    });
//    console.log("through");
//    label = document.getElementById('lblConfirm');
//    label.innerHTML = "This has made it this far";
//})

//function getSalesForce() {
//$.ajax
//                ({
//                    type: "POST",
//                    url: "https://login.salesforce.com/services/oauth2/authorize",
//                    xhrFields: { withCredentials: true },
//                    headers: {"client_id": '3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh', "client_secret": "391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590", "username" : "jeshleman@pharmethod.com", "password" : "Sweethipsterbeard@2" },
//                    success: function (json) {
//                        alert("It Worked!");
//                    },
//                    error: function () {
//                        alert("Something seems to have gone wrong.  Please make sure the information you have provided is correct, and then try again.");
//                    }
//                });
//console.log('this is the end of getSalesForce');
//}

//This is a method that joe sent me.  It doesn't work because "sforce is not defined"
//Internet has been telling me that I need connection.js
//connection.js is a part of AjaxContolToolkit
//No idea how call it though.  Everyone online says to use
//<script src="/soap/ajax/32.0/connection.js" type="text/javascript"/>
//and
//<script src="/soap/ajax/32.0/apex.js" type="text/javascript"/>
//^404 out
function login() {
    try {
        console.log("Inside of try block");
        sforce.connection.serverUrl = "https://login.salesforce.com/services/Soap/u/35.0"
        var result = sforce.connection.login("jeshleman@pharmethod.com", "Sweethipsterbeard@22wuMxiugmJi16JeMobSl8kZ0B");
        console.log("logged in with session id " + result.sessionId);
    } catch (error) {
        console.log(error);
        if (error.faultcode.indexOf("INVALID_LOGIN") != -1) {
            console.log("check your username and passwd, invalid login");
        }else{
            console.log(error);
        }
    }
}

//found this method online.  The only one that's done anything for me so far.
//authEndpoint may need to be "https://login.salesforce.com/services/oauth2/token", but that says it needs to be a "POST"
//also need to add grant_type to the url for that message.
//currently takes you to Site isn't secure, or something like that
function authenticateUser() {
    var grant_type = 'password';
    var client_id = '3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh';
    var consumerSecret = "391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590";
    var authEndpoint = "https://login.salesforce.com/services/oauth2/authorize";
    var response_type = "token";
    var redirectURI = "http://localhost:2304/Index.html";
    var requestURL = authEndpoint + '?client_id=' + client_id + '&response_type=' + response_type + '&redirect_uri=' + redirectURI;
    console.log(requestURL);
    window.location = requestURL;
}
function getAccountInfo() {

    var endpoint = "https://login.salesforce.com/services/data/v39.0/sobjects/Account";
    var token = document.getElementById('token').innerHTML
    var requestURL = endpoint + '?access_token=' + token;
    $.ajax({
        url: requestURL,
        type: 'Get',
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            console.log(data);
            //alert(data);
        },
        error: function () { alert("Failure"); }
    });
}
//This one just flat out doesn't work
//ajax is the only thing i have experience with, so i was hopefull for this one
function gettoken() {
    var grant_type = 'password';
    var client_id = '3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh';
    var consumerSecret = "391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590";
    var authEndpoint = "https://login.salesforce.com/services/oauth2/token";
    var response_type = "token";
    var redirectURI = "http://localhost:2304/Index.html";
    var requestURL = authEndpoint + '?client_id=' + client_id + '&response_type=' + response_type + '&redirect_uri=' + redirectURI;
    console.log(requestURL);
    $.ajax({
        url: requestURL,
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            alert(data);
        },
        error: function () { alert("Failure"); }
    });
}

//This one just flat out doesn't work
//ajax is the only thing i have experience with, so i was hopefull for this one
//function gettttttoken() {
//    var param = { 'grant_type': 'authorization_code', 'client_id': '3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh', 'client_secret': '391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590', 'username': 'jeshleman@pharmethod.com', 'password': 'Sweethipsterbeard@2' };
//    JSON.stringify(param);
//    $.ajax({
//        url: 'https://login.salesforce.com/services/oauth2/token',
//        type: 'POST',
//        data: param,
//        dataType: "json",
//        contentType: "application/x-www-form-urlencoded",
//        success: function (data) {
//            alert(data);
//        }

//    });
//}

//jsforce sucks shit.  No idea what's up with it.
//Couldn't even get jsforce to load
//function tryjsforce() {
//var conn = new jsforce.Connection({
//    oauth2: {
//        // you can change loginUrl to connect to sandbox or prerelease env.
//        loginUrl: 'https://login.salesforce.com/services/oauth2/token',
//        clientId: "3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh",
//        clientSecret: "391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590",
//        redirectUri: "https://localhost:2304/Index.html"
//    }
//});
//conn.login("jeshleman@pharmethod.com", "Sweethipsterbeard@22wuMxiugmJi16JeMobSl8kZ0B", function (err, userInfo) {
//    if (err) { return console.error(err); }
//    // Now you can get the access token and instance URL information.
//    // Save them to establish connection next time.
//    console.log(conn.accessToken);
//    console.log(conn.instanceUrl);
//    // logged in user property
//    console.log("User ID: " + userInfo.id);
//    console.log("Org ID: " + userInfo.organizationId);
//    // ...
//});
//}

// Create the XHR object.
//function createCORSRequest(method, url) {
//    var xhr = new XMLHttpRequest();
//    if ("withCredentials" in xhr) {
//        // XHR for Chrome/Firefox/Opera/Safari.
//        xhr.open(method, url, true);
//    } else if (typeof XDomainRequest != "undefined") {
//        // XDomainRequest for IE.
//        xhr = new XDomainRequest();
//        xhr.open(method, url);
//    } else {
//        // CORS not supported.
//        xhr = null;
//    }
//    return xhr;
//}

//// Helper method to parse the title tag from the response.
//function getTitle(text) {
//    return text.match('<title>(.*)?</title>')[1];
//}

//// Make the actual CORS request.
//function makeCorsRequest() {
//    // This is a sample server that supports CORS.
//    var url = 'https://login.salesforce.com/services/oauth2/authorize';

//    var xhr = createCORSRequest('GET', url);
//    if (!xhr) {
//        alert('CORS not supported');
//        return;
//    }

//    // Response handlers.
//    xhr.onload = function () {
//        var text = xhr.responseText;
//        var title = getTitle(text);
//        alert('Response from CORS request to ' + url + ': ' + title);
//    };

//    xhr.onerror = function () {
//        alert('Woops, there was an error making the request.');
//    };
//    var json = { "grant_type" : "password", "client_id": '3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh', "client_secret": "391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590", "username": "jeshleman@pharmethod.com", "password": "Sweethipsterbeard@2" };
//    xhr.send(json);
//}
function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?#&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    console.log(vars);
    return vars;
}