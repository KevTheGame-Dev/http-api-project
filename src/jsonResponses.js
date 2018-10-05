const users = {};

const respondJSON = (request, response, status, object) => {
  if (request.headers.accept === 'text/xml') {
    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(`<response><message>${object.message}</message><id>${object.id}</id></response>`);
  } else {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
  }
  response.end();
};

const getUsers = (request, response) => {
  console.log(request.method);
  if (request.method === 'HEAD') {
    const responseJSON = {
      message: 'Successful response',
    };

    respondJSON(request, response, 200, responseJSON);
  } else {
    const responseJSON = {
      message: users,
    };

    respondJSON(request, response, 200, responseJSON);
  }
};

const addUsers = (request, response, params) => {
  console.log(params);
  if (params.name === '') {
    const responseJSON = {
      message: 'Missing name parameter',
      id: 'Missing Param',
    };
    respondJSON(request, response, 400, responseJSON);
  } else if (params.age === '') {
    const responseJSON = {
      message: 'Missing age parameter',
      id: 'Missing Param',
    };
    respondJSON(request, response, 400, responseJSON);
  } else if (params.name in users) {
    users[params.name] = params;
    const responseJSON = {
      message: 'Updated user',
    };
    console.log(users);

    respondJSON(request, response, 204, responseJSON);
  } else {
    users[params.name] = params;
    const responseJSON = {
      message: 'Added user',
    };
    console.log(users);

    respondJSON(request, response, 201, responseJSON);
  }
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'Page not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  addUsers,
  notFound,
};
