//function to send our post request
const sendLogin_Post = (e, loginForm) => {
    //grab the forms action (url to go to)
    //and method (HTTP method - POST in this case)
    const loginFormAction = loginForm.getAttribute('action');
    const loginFormMethod = loginForm.getAttribute('method');
    
    //grab the form's name and age fields so we can check user input
    const usernameField = loginForm.querySelector('#usernameField');
    const passwordField = loginForm.querySelector('#passwordField');
    
    //create a new Ajax request (remember this is asynchronous)
    const xhr = new XMLHttpRequest();
    //set the method (POST) and url (action field from form)
    xhr.open(loginFormMethod, loginFormAction);
    
    //set our request type to x-www-form-urlencoded
    //which is one of the common types of form data. 
    //This type has the same format as query strings key=value&key2=value2
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //set our requested response type in hopes of a JSON response
    xhr.setRequestHeader ('Accept', 'application/json');
    
    //set our function to handle the response
    xhr.onload = () => handle_login(xhr);
    
    //build our x-www-form-urlencoded format. Without ajax the 
    //browser would do this automatically but it forcefully changes pages
    //which we don't want.
    //The format is the same as query strings, so key=value&key2=value2
    //The 'name' fields from the inputs are the variable names sent to
    //the server. 
    //So ours might look like  name=test&age=22
    //Again the 'name' fields in the form are the variable names in the string
    //and the variable names the server will look for.
    const formData = `username=${usernameField.value}&password=${passwordField.value}`;
    
    //send our request with the data
    xhr.send(formData);
    
    //prevent the browser's default action (to send the form on its own)
    e.preventDefault();

    //return false to prevent the browser from trying to change page
    return false;
};