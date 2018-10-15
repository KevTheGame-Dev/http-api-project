const getUserData = (potluckID, url) => {
    const xhr = new XMLHttpRequest();
    
    const userID = `userID=${potluckID}`;
    url = url + "?" + userID;

    xhr.open('GET', url);
    var requestType = 'application/json';

    xhr.setRequestHeader("Accept", requestType);
    xhr.onload = () => handleUserData(xhr);
    xhr.send();
};

const handleUserData = (xhr) => {
    const obj = JSON.parse(xhr.response);
    const content = document.querySelector('#user_username');
    
    switch(xhr.status){
        case 200:
            content.innerHTML = `Hello, ${obj.username}!`;
            break;
        case 404:
            content.innerHTML = 'No User Found';
            break;
        case 500:
            content.innerHTML = 'Server couldnt access user data';
            break;
    }
};