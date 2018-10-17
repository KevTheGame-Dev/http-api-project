//function to handle our response
const handle_login = (xhr) => {
    const obj = JSON.parse(xhr.response);
    const content = document.querySelector('#loginError');
    
    if(xhr.status === 200 || xhr.status === 201){
        window.localStorage.setItem('potluckID', obj.userID);
        window.localStorage.setItem('potluckUsername', obj.username);
        window.location = '/potluck';
    }
    else{
        content.innerHTML = `<b>${obj.error}</b>`;
    }
};