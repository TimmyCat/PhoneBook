// Listen for form submit
document.getElementById('mainForm').addEventListener('submit', savePhone);

// Save phone number
function savePhone(e){

    // Get form values
    var phoneRecord = {
        name : document.getElementById('Name').value,
        phone : document.getElementById('Phone').value
    };

    //validation model
    if(!validation(phoneRecord)){
        return false;
    }
    
    // save object in local storage
    if(localStorage.getItem('phones') === null){
        // init array
        var phones = [];
        // add to array
        phones.push(phoneRecord);
        localStorage.setItem('phones', JSON.stringify(phones));
    }
    else{
        // get all records
        var phones = JSON.parse(localStorage.getItem('phones'));
        // add record to array
        phones.push(phoneRecord);
        // re-set local storage
        localStorage.setItem('phones', JSON.stringify(phones));
    }

    // re-set the form
    document.getElementById('mainForm').reset();
    fetchPhones();
    e.preventDefault();
}

// delete phones

function deletePhones(phone){
    // get phone from local storage
    var phones = JSON.parse(localStorage.getItem('phones'));
    // loop to find item
    for(var i = 0; i < phones.length; i++){
        if(phones[i].phone == phone){
            // remove item from storage
            phones.splice(i,1);
        }
    }
    // re-set local storage
    localStorage.setItem('phones', JSON.stringify(phones));

    // re-fetch phones
    fetchPhones();
}

// fetch Phones
function fetchPhones(){
    // get all phones
    var phones = JSON.parse(localStorage.getItem('phones'));
    if(phones == null) return;
    
    // output
    var phonesResults = document.getElementById('phoneResults');
    phonesResults.innerHTML = '';
    for(var i = 0; i < phones.length; i++){
        var Name = phones[i].name;
        var Phone = phones[i].phone;

        phonesResults.innerHTML += '<div class="row">' + 
                                    '<h3 margin="100px">' + Name + '</h3>' + 
                                    '<p>' + Phone + '</p>' + 
                                    '<a onclick="deletePhones(\''+Phone+'\')" class="btn btn-danger" target="_self" href= "#">Delete</a>' +
                                    '</div>';
    }
}

// validation
function validation(object){
    if(!object.name || !object.phone){
        alert('please, fill the form');
        return false;
    }

    // regex for phone number
    var phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    var regEx = new RegExp(phoneRegEx);
    
    // checking
    if(!object.phone.match(regEx)){
        alert('phone is not valid');
        return false;
    }
    return true;
}
