//function to parse our response
const parseJSON = (xhr, content) => {
    //parse response (obj will be empty in a 204 updated)
    const obj = JSON.parse(xhr.response);
    console.dir(obj);
    
    //if message in response, add to screen
    if(obj.message) {
        const p = document.createElement('p');
        p.textContent = `Message: ${obj.message}`;
        content.appendChild(p);
    }
    
    //if users in response, add to screen
    if(obj.users) {
        const userList = document.createElement('p');
        const users = JSON.stringify(obj.users);
        userList.textContent = users;
        content.appendChild(userList);
    }
};
    //function to handle our response
const handleResponse = (xhr) => {
    const content = document.querySelector('#content');
    
    //check the status code
    switch(xhr.status) {
        case 200: //success
        content.innerHTML = `<b>Success</b>`;
        break;
        case 201: //created
        content.innerHTML = '<b>Create</b>';
        break;
        case 204: //updated (no response back from server)
        content.innerHTML = '<b>Updated (No Content)</b>';
        return;
        case 400: //bad request
        content.innerHTML = `<b>Bad Request</b>`;
        break;
        default: //any other status code
        content.innerHTML = `Error code not implemented by client.`;
        break;
    }
    //parse response 
    parseJSON(xhr, content);
};