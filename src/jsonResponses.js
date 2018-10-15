const handleData = require('./handleData.js');

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


const handleLogin = (request, response, results) => {
  if (results.success === true) {
    const responseJSON = {
      message: results.message,
      userID: results.id,
    };

    respondJSON(request, response, results.httpStatus, responseJSON);
  } else {
    const responseJSON = {
      message: results.message,
      error: results.error,
    };
    respondJSON(request, response, results.httpStatus, responseJSON);
  }
};

const getUsername = (request, response, userID) => {
  console.log('getting username...');
  handleData.confirmUser(userID, (userFound) => {
    if (userFound) {
      console.log('userID found');
      handleData.readData(userID, 'username', (usernameReq) => {
        if (usernameReq.httpStatus === 200) {
          console.log(usernameReq);
          const responseJSON = {
            username: usernameReq.data,
          };
          console.log('username found');
          respondJSON(request, response, usernameReq.httpStatus, responseJSON);
        } else {
          const responseJSON = {
            message: usernameReq.message,
          };
          console.log(usernameReq.message);
          respondJSON(request, response, usernameReq.httpStatus, responseJSON);
        }
      });
    } else {
      const responseJSON = {
        message: 'userID not found',
      };

      respondJSON(request, response, 404, responseJSON);
    }
  });
};

const updateAllergies = (request, response, userID, params) => {
  handleData.confirmUser(userID, (userFound) => {
    if (userFound) {
      handleData.updateAllergies(userID, params);
    } else {
      const responseJSON = {
        message: 'userID not found',
      };

      respondJSON(request, response, 404, responseJSON);
    }
  });
};

const getAllergies = (request, response) => {
  handleData.getAllergyData((data) => {
    const responseJSON = {
      data,
    };

    respondJSON(request, response, 200, responseJSON);
  });
};

const getPotluckData = (request, response) => {
  handleData.getPotluckData((data) => {
    const responseJSON = {
      data,
    };

    respondJSON(request, response, 200, responseJSON);
  });
};

const putPotluckData = (request, response, params) => {
  handleData.postPotluckData(params, (data) => {
    console.log(data);
    if (data.httpStatus === 201) {
      const responseJSON = {
        message: 'Added potluck entry',
      };

      respondJSON(request, response, 201, responseJSON);
    } else {
      const responseJSON = {
        message: data.message,
      };

      respondJSON(request, response, data.status, responseJSON);
    }
  });
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'Page not found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  handleLogin,
  getUsername,
  updateAllergies,
  getAllergies,
  getPotluckData,
  putPotluckData,
  notFound,
};
