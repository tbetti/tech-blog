const loginHandler = async (event) =>{
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if(username && password){
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: ({'Content-Type': 'application/json'})
        });

        if(response.ok){
            // If login information is correct, take user to the dashboard
            document.location.replace('/dashboard')
        }else{
            // Don't know what to put here
            // I want the page to display "invalid username or password"
            // Needs to redirect back to login if invalid
        }
    }
};

document.querySelector('#log-in-form').addEventListener('submit', loginHandler);