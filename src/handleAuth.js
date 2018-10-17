const fs = require('fs');
const uuidv4 = require('uuid/v4');
const jsonHandler = require('./jsonResponses.js');

const createUser = (username, password, userData) => {
  const newUserData = userData;
  newUserData[username] = { username, password, id: uuidv4() };

  const newUserDataString = JSON.stringify(newUserData);
  fs.writeFileSync(`${__dirname}/../data/user_data.json`, newUserDataString, 'utf8');

  return {
    success: true, id: newUserData[username].id, username, message: 'User created', httpStatus: 201,
  };
};

const login = (request, response, username, password) => {
  let loginResponse = {};
  fs.readFile(`${__dirname}/../data/user_data.json`, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      loginResponse = {
        success: false, error, message: 'Could not read user_data file', httpStatus: 500,
      };
    } else {
      const userData = JSON.parse(data);

      if (username in userData) {
        if (userData[username].password === password) {
          loginResponse = {
            success: true, id: userData[username].id, username, message: 'Successful login.', httpStatus: 200,
          };
        } else {
          loginResponse = {
            success: false, error: 'Invalid password', message: 'Invalid password (User already exists)', httpStatus: 401,
          };
        }
      } else {
        const newUser = createUser(username, password, userData);
        loginResponse = newUser;
      }
    }

    console.log(loginResponse);
    jsonHandler.handleLogin(request, response, loginResponse);
  });
};

module.exports = {
  login,
};
