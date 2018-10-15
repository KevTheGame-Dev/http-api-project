const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const handleAuth = require('./handleAuth.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const extractPostParams = (request, response, callback) => {
  const res = response;
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });


  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    if (typeof callback === 'function') {
      callback(bodyParams);
    }
  });
};

const extractGetParams = (parsedURL) => {
  const params = {};
  const paramPairs = parsedURL.query.split('&');
  for (let i = 0; i < paramPairs.length; i++) {
    const keyValue = paramPairs[i].split('=');
    const key = 0;
    const value = 1;
    params[keyValue[key]] = keyValue[value];
  }
  return params;
};

const handlePOST = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    extractPostParams(request, response, (bodyParams) => {
      jsonHandler.addUsers(request, response, bodyParams);
    });
  } else if (parsedUrl.pathname === '/login') {
    extractPostParams(request, response, (bodyParams) => {
      handleAuth.login(request, response, bodyParams.username, bodyParams.password);
    });
  } else if (parsedUrl.pathname === '/updateAllergies') {
    extractPostParams(request, response, (bodyParams) => {
      jsonHandler.updateAllergies(request, response, bodyParams.userID, bodyParams);
    });
  } else if (parsedUrl.pathname === '/addEntry') {
    extractPostParams(request, response, (bodyParams) => {
      jsonHandler.putPotluckData(request, response, bodyParams);
    });
  } else {
    jsonHandler.notFound(request, response);
  }
};

const handleGET = (request, response, parsedURL) => {
  switch (parsedURL.pathname) {
    case '/':
      htmlHandler.getLogin(request, response);
      break;
    case '/potluck':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/handleResponse.js':
      htmlHandler.getHandleResponse(request, response);
      break;
    case '/handle_login.js':
      htmlHandler.getHandleLogin(request, response);
      break;
    case '/postEntry.js':
      htmlHandler.getPostEntry(request, response);
      break;
    case '/post_login.js':
      htmlHandler.getPostLogin(request, response);
      break;
    case '/potluck_getRequests.js':
      htmlHandler.getPotluckGetRequests(request, response);
      break;
    case '/handle_logout.js':
      htmlHandler.getHandleLogout(request, response);
      break;
    case '/post_allergies.js':
      htmlHandler.getPostAllergies(request, response);
      break;
    case '/update_table.js':
      htmlHandler.getUpdateTable(request, response);
      break;
    case '/username':
      jsonHandler.getUsername(request, response, extractGetParams(parsedURL).userID);
      break;
    case '/getPotluckData':
      jsonHandler.getPotluckData(request, response);
      break;
    case '/getAllergies':
      jsonHandler.getAllergies(request, response);
      break;
    default:
      jsonHandler.notFound(request, response);
      break;
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePOST(request, response, parsedUrl);
  } else {
    handleGET(request, response, parsedUrl);
  }
  console.log(request.url);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
