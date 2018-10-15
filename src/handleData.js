const fs = require('fs');

const confirmUser = (userID, callback) => {
  let userFound = false;
  fs.readFile(`${__dirname}/../data/user_data.json`, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
    } else {
      const userData = JSON.parse(data);

      const userKeys = Object.keys(userData);
      for (let i = 0; i < userKeys.length; i++) {
        const username = userKeys[i];

        if (userData[username].id === userID) {
          userFound = true;
        }
      }
    }

    if (typeof callback === 'function') {
      callback(userFound);
    }
  });
};

const readData = (userID, requestedKey, callback) => {
  let requestedData = {};
  fs.readFile(`${__dirname}/../data/user_data.json`, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      requestedData = { httpStatus: 500, message: 'Unable to parse user data' };
    }

    const userData = JSON.parse(data);

    const userKeys = Object.keys(userData);
    let found = false;
    for (let i = 0; i < userKeys.length; i++) {
      const username = userKeys[i];
      if (userData[username].id === userID) {
        requestedData = { httpStatus: 200, data: userData[username][requestedKey] };
        found = true;
      }
    }

    if (!found) {
      requestedData = { httpStatus: 404, message: 'userID not found' };
    }

    if (typeof callback === 'function') {
      callback(requestedData);
    }
  });
};

// Data is expected in valid key value pairs
const updateAllergies = (userID, allergyData, callback) => {
  const allergyDataTemp = allergyData;
  let requestedData = {};
  fs.readFile(`${__dirname}/../data/user_data.json`, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      requestedData = { httpStatus: 500, message: 'Unable to parse user data' };
    }
    delete allergyDataTemp.id;


    const userData = JSON.parse(data);
    const userKeys = Object.keys(userData);
    const allergyKeys = Object.keys(allergyDataTemp);

    let found = false;
    for (let i = 0; i < userKeys.length; i++) {
      const username = userKeys[i];
      if (userData[username].id === userID) {
        const allergies = [];
        for (let j = 0; j < allergyKeys.length; j++) {
          const key = allergyKeys[j];
          if (allergyDataTemp[key] === 'true') {
            allergies.push(key);
          }
        }
        userData[username].allergies = allergies;

        found = true;
        break;
      }
    }

    if (!found) {
      requestedData = { httpStatus: 404, message: 'userID not found' };
    } else {
      const newUserDataString = JSON.stringify(userData);
      fs.writeFileSync(`${__dirname}/../data/user_data.json`, newUserDataString, 'utf8');
    }

    if (typeof callback === 'function') {
      callback(requestedData);
    }
  });
};

const getAllergyData = (callback) => {
  let requestedData = {};
  fs.readFile(`${__dirname}/../data/user_data.json`, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      requestedData = { httpStatus: 500, message: 'Unable to parse user data' };
    }

    requestedData = JSON.parse(data);

    if (typeof callback === 'function') {
      callback(requestedData);
    }
  });
};

const getPotluckData = (callback) => {
  let requestedData = {};
  fs.readFile(`${__dirname}/../data/potluck_data.json`, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      requestedData = { httpStatus: 500, message: 'Unable to parse user data' };
    }

    requestedData = JSON.parse(data);

    if (typeof callback === 'function') {
      callback(requestedData);
    }
  });
};

const postPotluckData = (entry, callback) => {
  const entryTemp = entry;
  let requestedData = {};
  fs.readFile(`${__dirname}/../data/potluck_data.json`, 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      requestedData = { httpStatus: 500, message: 'Unable to parse user data' };
    }
    const name = String(entryTemp.name);
    delete entryTemp.name;
    const food = String(entryTemp.food);
    delete entryTemp.food;

    const userData = JSON.parse(data);
    userData[name] = { name, food };

    const allergens = [];
    const entryKeys = Object.keys(entryTemp);

    for (let i = 0; i < entryKeys.length; i++) {
      const key = entryKeys[i];
      if (entryTemp[key] === 'true') {
        allergens.push(key);
      }
    }
    userData[name].allergens = allergens;

    const newUserDataString = JSON.stringify(userData);
    fs.writeFileSync(`${__dirname}/../data/potluck_data.json`, newUserDataString, 'utf8');
    requestedData = { httpStatus: 201, message: 'Entry added' };


    if (typeof callback === 'function') {
      callback(requestedData);
    }
  });
};

module.exports = {
  readData,
  confirmUser,
  updateAllergies,
  getAllergyData,
  getPotluckData,
  postPotluckData,
};
