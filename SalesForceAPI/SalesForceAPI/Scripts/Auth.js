function UserPass() {
    var url = 'https://cors-anywhere.herokuapp.com/' + 'https://login.salesforce.com/services/oauth2/token'
    $.ajax({
        type: 'POST',
        crossOrigin: true,
        url: url,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
        },
        data: { "grant_type": "password", "client_id": "3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh", "client_secret": "391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590", "username": "jeshleman@pharmethod.com", "password": "Sweethipsterbeard@22wuMxiugmJi16JeMobSl8kZ0B" },
        success: function (data) {
            commitToken(data.access_token);
            var div = document.getElementById('apiFields');
            div.style.display = 'block';
        },
        error: function (data, errorThrown, status) {

        }
    });
}

function UserAgent() {
    var client_id = '3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh';
    var consumerSecret = "391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590";
    var authEndpoint = "https://login.salesforce.com/services/oauth2/authorize";
    var response_type = "token";
    var redirectURI = "http://localhost:2304/Index.html";
    var requestURL = authEndpoint + '?client_id=' + client_id + '&response_type=' + response_type + '&redirect_uri=' + redirectURI;
    console.log(requestURL);
    window.location = requestURL;
}

function WebServer() {
    var client_id = '3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh';
    var consumerSecret = "391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590";
    var authEndpoint = "https://login.salesforce.com/services/oauth2/authorize";
    var response_type = "code";
    var redirectURI = "http://localhost:2304/Index.html";
    var requestURL = authEndpoint + '?client_id=' + client_id + '&response_type=' + response_type + '&redirect_uri=' + redirectURI;
    console.log(requestURL);
    window.location = requestURL;
}

function WebServerOAuth(code){
    var url = 'https://cors-anywhere.herokuapp.com/' + 'https://login.salesforce.com/services/oauth2/token'
    var sendData = { "grant_type": "authorization_code", "client_secret": "391852047886D4E921CEA4FD3CE855AB1829F4B10450E2EF82AAFFDC70D3A590", "client_id": "3MVG9LBJLApeX_PBr0aN2MY3XFZPfxpnej2OdGEyS4Oizp_EQ_eTzN9Nt7TnnHj3iJivqZTgqB5kZpkinW6rh", "redirect_uri": "http://localhost:2304/Index.html", "code": code };
    console.log(sendData);
    $.ajax({
        type: 'POST',
        crossOrigin: true,
        url: url,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
        },
        data: sendData,
        success: function (data) {
            checkUrl()
            var div = document.getElementById('apiFields');
            div.style.display = 'block';
        },
        error: function (data, errorThrown, status) {

        }
    });
}
// End of Auth Functions
function commitToken(token) {
    document.getElementById('token').innerHTML = token;
}
function checkUrl() {
    var accessToken = getUrlVars()['access_token'];
    console.log(accessToken);
    if (typeof accessToken != 'undefined') {
        var refreshToken = getUrlVars()['refresh_token']
        var aToken = document.getElementById('aToken');
        var rToken = document.getElementById('rToken');
        aToken.innerHTML = accessToken;
        rToken.innerHTML = refreshToken;
        console.log("aToken is " + aToken.innerHTML);
        console.log("rToken is " + rToken.innerHTML);
    } else {
        var code = getUrlVars()['code'];
        //var end = weakCode.indexOf('%3D%3D');
        //var begining = weakCode.substring(0, end);
        //var code = begining + "==";
        WebServerOAuth(code);
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

function apiCall(url, type) {
    if (document.getElementById('token').value != "") {
        if ((url == "") || (type == "")) {

        } else {
            var proxy = 'https://cors-anywhere.herokuapp.com/';
            var token = document.getElementById('token').innerHTML;
            console.log(token);
            var data = document.getElementById('requestBody').value;
            var endpoint = proxy + 'https://na174.lightning.force.com/services/data/v39.0/' + url;
            $.ajax({
                type: type,
                contentType: 'application/x-www-form-urlencoded',
                url: endpoint,
                cache: false,
                data: data,
                headers: { 'Authorization': 'Bearer ' + token },
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error: ' + jqXHR.status);
                    console.log('textStatus: ' + textStatus)
                }
            });
        }
    }
}
function printJSON(json) {
    var response = $.parseJSON(json);
    var group = response.groupIds[i];

    var allPropertyNames = Object.keys(group);
    for (var j = 0; j < allPropertyNames.length; j++) {
        var name = allPropertyNames[j];
        var value = group[name];
        // Do something
    }
}