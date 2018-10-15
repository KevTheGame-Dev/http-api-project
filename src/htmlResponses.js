const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client_potluck.html`);
const login = fs.readFileSync(`${__dirname}/../client/client_login.html`);

const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const handleResponse = fs.readFileSync(`${__dirname}/../client/handleResponse.js`);
const handleLogin = fs.readFileSync(`${__dirname}/../client/handle_login.js`);
const postEntry = fs.readFileSync(`${__dirname}/../client/postEntry.js`);
const postLogin = fs.readFileSync(`${__dirname}/../client/post_login.js`);
const potluckGetRequests = fs.readFileSync(`${__dirname}/../client/potluck_getRequests.js`);
const handleLogout = fs.readFileSync(`${__dirname}/../client/handle_logout.js`);
const postAllergies = fs.readFileSync(`${__dirname}/../client/post_allergies.js`);
const updateTable = fs.readFileSync(`${__dirname}/../client/update_table.js`);


const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getLogin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(login);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getHandleResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(handleResponse);
  response.end();
};

const getHandleLogin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(handleLogin);
  response.end();
};

const getPostEntry = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(postEntry);
  response.end();
};

const getPostLogin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(postLogin);
  response.end();
};

const getPotluckGetRequests = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(potluckGetRequests);
  response.end();
};

const getHandleLogout = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(handleLogout);
  response.end();
};

const getPostAllergies = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(postAllergies);
  response.end();
};

const getUpdateTable = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(updateTable);
  response.end();
};

module.exports = {
  getIndex,
  getLogin,
  getCSS,
  getHandleResponse,
  getHandleLogin,
  getPostEntry,
  getPostLogin,
  getPotluckGetRequests,
  getHandleLogout,
  getPostAllergies,
  getUpdateTable,
};
