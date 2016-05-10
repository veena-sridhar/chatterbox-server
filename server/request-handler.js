/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var data = {
  results: []
};

//request itself is an object
//must stringify object, push it back to results array
//and make the response be the results array
//reset results array every time it's sent successfully

var requestHandler = function(request, response) {
  console.log(request);
  if (request.method === 'GET') {
    // data.results.push(request._postData); 
    var statusCode = 200;

    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'text/plain';

    response.writeHead(statusCode, headers);
    var finalPackage = JSON.stringify(data);

    response.end(finalPackage);

  } else if (request.method === 'POST') {
    var requestString = '';

    request.on('data', function(chunks) {
      requestString += chunks;
    });

    var final;

    request.on('end', function () {
      final = JSON.parse(requestString);
      data.results.push(final);
      var statusCode = 201;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/plain';
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(final));
    });    
  }
};

//url is different for rooms

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;

