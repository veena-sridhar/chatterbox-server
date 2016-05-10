var data = {
  results: []
};

//request itself is an object
//must stringify object, push it back to results array
//and make the response be the results array
//reset results array every time it's sent successfully

var requestHandler = function(request, response) { 

  if (request.url !== '/classes/messages') {
    var statusCode = 404;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'text/plain';
    response.writeHead(statusCode, headers);
    console.log(response);
    response.end();
  }

  if (request.method === 'GET') {
    var statusCode = 200;

    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'text/plain';

    response.writeHead(statusCode, headers);
    var finalPackage = JSON.stringify(data);

    response.end(finalPackage);

  }

  if (request.method === 'POST') {
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
