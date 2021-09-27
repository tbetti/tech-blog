const commentHandler = async (event) =>{
    event.preventDefault();

    const newComment = document.querySelector('#new-comment').value.trim();
    const dataId = document.querySelector('.card').dataset.id;

    if(newComment){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({newComment, dataId}),
            headers: ({'Content-Type': 'application/json'})
        });

        if(response.ok){
            // If login information is correct, take user to the dashboard
            document.location.reload();
        }else{
            // Don't know what to put here
        }
    }
};

document.querySelector('#new-comment-form').addEventListener('submit', commentHandler);