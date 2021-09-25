const postHandler = async (event) =>{
    event.preventDefault();

    const newPost = document.querySelector('#new-post').value.trim();

    if(newPost){
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({newPost}),
            headers: ({'Content-Type': 'application/json'})
        });

        if(response.ok){
            // If login information is correct, take user to the dashboard
            document.location.replace('/dashboard');
        }else{
            // Don't know what to put here
        }
    }
};

document.querySelector('#new-post-form').addEventListener('submit', postHandler);