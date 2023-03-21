// Replace with the URL and filepaths of your server
const url = 
{
    base: 'http://165.227.66.2/',

    login: 'login.php',
    signup: 'signup.php',

    load: 'loadContacts.php',
    search: 'searchContacts.php',
    create: 'createcontact.php',
    delete: 'deletecontact.php',
    edit: 'editContact.php',
}

/*
    To use these functions:
        Add "async" before the definition of any function calling the API       async function test() {}
        Add "await" before any API call                                         response = await API_login(username, password)

    By adding those, you are telling javascript to wait for the functions to 
    finish and return the results before moving on to the next line of code.

    These functions will return an object with this format:
    {
        isError: A boolean indicating if there was an error                     if (response.isError) { console.log("There was an error: " + response.result); }
        result: The return value, or an error message if there was one.         else { console.log("The result was " + response.result); }
    }

    The login function will return the userID
    The load and search functions will return an array of objects in this format:
    {
        id:
        firstName:
        lastName:
        email:
        phone:
    }
*/






/** Checks login information. Result will be the user ID if correct. */ 
function API_login(username, password)
{
    return new Promise(function(resolve)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url.base + url.login, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        let data = 
            {
                username: username,
                password: password
            };

        xhr.onreadystatechange = function()
        {
            if (this.readyState != 4) return;
            
            if (this.status == 200)
            {
                let response = JSON.parse( xhr.responseText );
                
                if (response.error) 
                    resolve({isError: true, result: response.error});
                else 
                    resolve({isError: false, result: "New account created"});
            }
            
            else resolve({isError: true, result: "An unknown error occurred"});
        }

        data = JSON.stringify(data);
        xhr.send(data);
    })
}

/** Adds a new user to the database. */ 
function API_signup(username, password)
{
    return new Promise(function(resolve)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url.base + url.signup, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        let data = 
            {
                username: username,
                password: password
            };

        xhr.onreadystatechange = function()
        {
            if (this.readyState != 4) return;

            if (this.status == 200)
            {
                let response = JSON.parse( xhr.responseText );
                if (response.error)           
                    resolve({isError: true, result: response.error});
                else
                    resolve({isError: false, result: response.id});
            }
            
            else resolve({isError: true, result: "An unknown error occurred"});
        }

        data = JSON.stringify(data);
        xhr.send(data); 
    });
}


/** Loads the users contacts. Needs a start and end index. */ 
function API_load(userID, startIndex, endIndex)
{
    return new Promise(function(resolve)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url.base + url.load, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        let data = 
            {
                UserID: userID,
                Start: startIndex,
                End: endIndex
            };

        xhr.onreadystatechange = function()
        {
            if (this.readyState != 4) return;

            if (this.status == 200)
            {
                let response = JSON.parse( xhr.responseText );
                if (response.error)           
                    resolve({isError: true, result: response.error});
                else
                    resolve({isError: false, result: response.results});
            }
            
            else resolve({isError: true, result: "An unknown error occurred"});
        }

        data = JSON.stringify(data);
        xhr.send(data); 
    });
}


/** Searches by first name, last name, email, and phone number of all contacts. */ 
function API_search(userID, searchKeyword, numberOfResults)
{
    if (!numberOfResults)
        numberOfResults = 10;
    
    return new Promise(function(resolve)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url.base + url.search, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        let data = 
            {
                UserID: userID,
                Search: searchKeyword,
                Limit: numberOfResults
            };

        xhr.onreadystatechange = function()
        {
            if (this.readyState != 4) return;

            if (this.status == 200)
            {
                let response = JSON.parse( xhr.responseText );
                if (response.error)           
                    resolve({isError: true, result: response.error});
                else
                    resolve({isError: false, result: response.results});
            }
            
            else resolve({isError: true, result: "An unknown error occurred"});
        }

        data = JSON.stringify(data);
        xhr.send(data); 
    });
}


/** Searches by first name, last name, email, and phone number of all contacts. */ 
function API_edit(userID, contactID, firstName, lastName, email, phone)
{    
    return new Promise(function(resolve)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url.base + url.edit, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        let data = 
            {
                userID: userID,
                contactID: contactID,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            };

        xhr.onreadystatechange = function()
        {
            if (this.readyState != 4) return;

            if (this.status == 200)
            {
                let response = JSON.parse( xhr.responseText );
                if (response.error)           
                    resolve({isError: true, result: response.error});
                else
                    resolve({isError: false, result: "Successfully edited contact"});
            }
            
            else resolve({isError: true, result: "An unknown error occurred"});
        }

        data = JSON.stringify(data);
        xhr.send(data); 
    });
}


/** Creates a new contact */ 
function API_create(userID, firstName, lastName, email, phone)
{    
    return new Promise(function(resolve)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url.base + url.create, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        let data = 
            {
                UserID: userID,
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                PhoneNumber: phone
            };

        xhr.onreadystatechange = function()
        {
            if (this.readyState != 4) return;

            if (this.status == 200)
            {
                let response = JSON.parse( xhr.responseText );
                if (response.error)           
                    resolve({isError: true, result: response.error});
                else
                    resolve({isError: false, result: "Successfully created contact"});
            }
            
            else resolve({isError: true, result: "An unknown error occurred"});
        }

        data = JSON.stringify(data);
        xhr.send(data); 
    });
}


/** Deletes a contact */ 
function API_delete(contactID)
{    
    return new Promise(function(resolve)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url.base + url.delete, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        let data = 
            {
                ContactID: contactID
            };

        xhr.onreadystatechange = function()
        {
            if (this.readyState != 4) return;

            if (this.status == 200)
            {
                let response = JSON.parse( xhr.responseText );
                if (response.error)
                    resolve({isError: true, result: response.error});
                else
                    resolve({isError: false, result: "Successfully deleted contact"});
            }
            
            else resolve({isError: true, result: "An unknown error occurred"});
        }

        data = JSON.stringify(data);
        xhr.send(data); 
    });
}