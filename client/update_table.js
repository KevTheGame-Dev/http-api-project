const generateTable = (data) => {
    const tableDiv = document.querySelector('#potluckTable');
    var table = document.createElement('table');
    var tableHeader = document.createElement('thead');
    var tableBody = document.createElement('tbody');

    table.setAttribute('border', 1);
    table.id = "potluckTableTable";

    var headingRow = tableHeader.insertRow();
    var headingName = headingRow.insertCell();
    headingName.innerHTML = "Name";
    var headingDish = headingRow.insertCell();
    headingDish.innerHTML = "Dish";
    var headingAllergens = headingRow.insertCell();
    headingAllergens.innerHTML = "Allergens";


    if(data != undefined){
        var usernames = Object.keys(data);
        for(let i = 0; i < usernames.length; i++)
        {
            var username = usernames[i];

            var tableRow = tableBody.insertRow();
            var name = tableRow.insertCell();
            name.innerHTML = data[username]['name'];
            var foodItem = tableRow.insertCell();
            foodItem.innerHTML = data[username]['food'];
            var allergens = tableRow.insertCell();
            var allergensContent = '';
            
            for(let j = 0; j < data[username]['allergens'].length; j++){
                let allergen = data[username]['allergens'][j];
                allergen = allergen.charAt(0).toUpperCase() + allergen.slice(1);

                if(j === data[username]['allergens'].length - 1){
                    allergensContent += allergen;
                }
                else{
                    allergensContent += allergen + ', ';
                }
            }
            
            allergens.innerHTML = allergensContent;
        }
    }

    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    if(tableDiv.querySelector('table') != undefined){
        tableDiv.replaceChild(table, tableDiv.querySelector('table'));
    }
    else{
        tableDiv.appendChild(table);
    }
}

const highlightUnmetNeeds = (userData) => {
    var allergies;
    var foodTemp = JSON.parse(userData.response);
    var usersAllergens = Object.keys(foodTemp['data']);

    getAllergyData((data) => { 
        //reset table colors
        var potluckTable = document.querySelector('#potluckTableTable');
        for(var k = 0, row; row < potluckTable.rows[k]; k++){
            row.cells[0].style.backgroundColor = "#ffffff";
            row.cells.setAttribute('tooltip', null);
        }

        allergies = JSON.parse(data.response);

        let users = Object.keys(allergies['data']);
        for(var i = 0; i < users.length; i++){
            let user = users[i];
            let userAllergens = usersAllergens[i];
            
            let userKeys = Object.keys(allergies['data'][user]);
            let allergenKeys = Object.keys(foodTemp['data'][userAllergens]);
            

            if(userKeys.includes('allergies') && allergenKeys.includes('allergens')){
                for(var j = 0; j < allergies['data'][user]['allergies'].length; j++){

                   if(!(allergies['data'][user]['allergies'][j] in foodTemp['data'][userAllergens]['allergens'])){
                       console.log(potluckTable.rows[0]);
                       for(var k = 0; k < potluckTable.rows.length; k++){
                           console.log(potluckTable.rows[k]);
                           if(potluckTable.rows[k].cells[0].innerHTML === user){
                                potluckTable.rows[k].cells[0].style.backgroundColor = "#a33d5d";
                                potluckTable.rows[k].cells[0].setAttribute('title', 'Allergy requirements not met!');
                           }
                       }
                   }

                }
            }
        }
    });
}

const getTableData = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/getPotluckData');
    var requestType = 'application/json';

    xhr.setRequestHeader("Accept", requestType);
    xhr.onload = () => { 
        handleTableData(xhr);
        highlightUnmetNeeds(xhr);
    };
    xhr.send();
}

const getAllergyData = (callback) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/getAllergies');
    var requestType = 'application/json';

    xhr.setRequestHeader("Accept", requestType);
    xhr.onload = () => {
        if (typeof callback === 'function') {
            callback(xhr);
          }
    };
    xhr.send();
}

const handleTableData = (xhr) => {
    const obj = JSON.parse(xhr.response);
    const tableDiv = document.querySelector('#potluckTable');
    
    if(xhr.status === 200){
        generateTable(obj.data);
        if(tableDiv.querySelector('p') != undefined){
            tableDiv.removeChild(tableDiv.querySelector('p'));
        }
    }
    else{
        if(tableDiv.querySelector('table') != undefined){
            tableDiv.removeChild(tableDiv.querySelector('table'));
        }
        var errorMessage = document.createElement('p');
        errorMessage.innerHTML = obj.message;
        tableDiv.appendChild(errorMessage);
    }
}

const updateTableLoop = () => {
    generateTable();

    setInterval(()=>{
        getTableData();
    }, 10000);
}