const editHandler = async (event) =>{
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const newPost = document.querySelector('#new-post').value.trim();
    const postId = document.querySelector('#new-post-form').dataset.postid;
    console.log(postId);

    if(newPost){
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({title, newPost}),
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

document.querySelector('#new-post-form').addEventListener('submit', editHandler);