// variables to animate GUI
const login =   document.querySelector(".loginOpt");
const signup =  document.querySelector(".signupOpt");
const form =    document.querySelector("#form");
const toggle =  document.querySelectorAll(".toggleBar");

// URL of the group's website
const urlBase = 'http://165.227.66.2/';

// File paths for the APIs
const urlAPI = {
    login: "/login.php",
    signup: "/signup.php"
}

let swap = 1;

/** Animating GUI functions */
function signupToggle ()
{
    form.style.marginLeft = "-100%";
    login.style.background = "none";
    signup.style.color = "rgba(23, 23, 23, 1)";
    login.style.color = "rgba(23, 23, 23, 1)";
    toggle[swap - 1].classList.add("active");
}

/** Animating GUI functions */
function loginToggle ()
{
    form.style.marginLeft = "0";
    signup.style.background = "none";
    login.style.color = "rgba(23, 23, 23, 1)";
    signup.style.color = "rgba(23, 23, 23, 1)";
    toggle[swap - 1].classList.remove("active");
}

/** login function */
function doLogin() 
{
    let username = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;
    let result = document.getElementById("loginResult");
    result.innerHTML = "";

    // Store the username and password in an object
    let tmp = {username:username,password:password};

    // Converts the object to a string so that the API can read it
    let jsonPayload = JSON.stringify(tmp);

    // Gets the URL of the php file handling login
    let url = urlBase + urlAPI.login;

    // Prepare a new HTTP request
    let xhr = new XMLHttpRequest();

    // Set the URL of the request to the php file
    // and the type of request to POST (its sending data).
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try
	{
        // Defines a function that is called when the state of the HTTP request changes
		xhr.onreadystatechange = function() 
		{

            // If readyState = 4 (the request is complete)
            // and status = 200 (there were no errors)
			if (this.readyState == 4 && this.status == 200) 
			{

                // Convert the API's response to a javascript object
				let response = JSON.parse( xhr.responseText );
                console.log(response)

                if (response.error)
                {

                    result.innerHTML = response.error;
                    return;
                }

                // Gets the ID of the username, or 0 if it was not found.
				let userId = response.id;
				if( userId < 1 )
				{		
					result.innerHTML = "User/Password combination incorrect";
					return;
				}
                else
                {
                    console.log("Username and password matches!");

                    // Move to the contacts page
                    saveCookie(userId);
                    window.location.href = "contactList.html";
                }
				
			}
		};

        // Send the username and password to the API (causing the function above to run)
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}


/** Sign up function */ 
function doSignup() 
{
    let username = document.getElementById("signupName").value;
	let initPass = document.getElementById("signupPassword").value;
    let confirmPass = document.getElementById("signupConfirm").value;

    let result = document.getElementById("signupResult");
    result.innerHTML = "";

    // username must contain at least a lowercase and must be 6+ characters
    var validateUsername = new RegExp("^(?=.*[a-z])(?=.{6,})");

    // password must contain at least a lowercase, uppercase, number, and must be 6+ characters
    var validatePassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");

    // validation if-elses
    if(!validateUsername.test(username))
    {
        result.innerHTML = "Username must be 6+ characters and contain a lowercase!";
    }
    else if(!validatePassword.test(initPass)) 
    {
        result.innerHTML = "Password must be 6+ characters, contain a lowercase, uppercase, and number!";
    } 
    else if(initPass !== confirmPass)
    {
        result.innerHTML = "Passwords do not match!";
    }
    else
    {
        // Store the username and password in an object
        let tmp = {username:username,password:confirmPass};

        // Converts the object to a string so that the API can read it
        let jsonPayload = JSON.stringify(tmp);

        // Set the URL of the request to the php file
        let url = urlBase + urlAPI.signup;
	
        // Creates new HTTP request
        let xhr = new XMLHttpRequest();

        // Set the URL of the request to the php file
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

        try
        {
            xhr.onreadystatechange = function() 
            {
                // If the request is complete and there were no errors
                if (this.readyState != 4) return;
                
                if (this.status == 200)
                {
                    // Convert the API's response to a javascript object
				    let response = JSON.parse( xhr.responseText );

                    if (response.error)
                    {
                        result.style.color = "#cf2929";

                        if (response.error == "Already Exists")
                            result.innerHTML = "Account already exists";
                        else
                            result.innerHTML = "An error occurred: " + response.error;
                    }
                    else
                    {
                        result.style.color = "#00121b";
                        result.innerHTML = "Account successfully created!";
                    }
                }
                else
                {
                    result.style.color = "#cf2929";
                    result.innerHTML = "An unknown error occurred";
                }
            };

            // Send the username and password to the API
            xhr.send(jsonPayload);
        }
        catch(err)
        {
            document.getElementById("loginResult").innerHTML = err.message;
        }
    }

}

function saveCookie(userID)
{
	document.cookie = "userID=" + userID + ";";
}