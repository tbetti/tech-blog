const registerHandler = async (event) =>{
    event.preventDefault();

    // Connect variable names to HTML elements
    const email = document.querySelector('#email').value.trim();
    const username = document.querySelector('#create-username').value.trim();
    const password = document.querySelector('#create-password').value.trim();

    // Fetch api to create new user
    if (email && username && password){
        const response = await fetch('/api/user/register', {
            method: 'POST',
            body: JSON.stringify({email, username, password}),
            headers: ({'Content-Type': 'application/json'})
        });

        if(response.ok){
            // If login information is correct, take user to the dashboard
            document.location.replace('/dashboard');
        }else{
            // fill in something here
            // ie username or email already exists
        }
    }
}

document.querySelector('#create-profile-form').addEventListener('submit', registerHandler);