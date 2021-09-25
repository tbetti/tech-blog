// Define buttons
const dashBtn = document.querySelector('#dashboard-btn');
const postBtn = document.querySelector('#post-btn');
const postCard = document.querySelectorAll('.card');

// Handlers to go to different pages when elements are selected
// Return to dashboard
const dashHandler = (event) =>{
    event.preventDefault();

    document.location.replace('/dashboard');
}
// Go to new page to create a post
const newPostHandler = (event) =>{
    event.preventDefault();

    document.location.replace('/create-post');
}
// Go to new page to view post and leave comment
const postCardHandler = (event) =>{
    event.preventDefault();
    console.log(event.path[1].id);

    const cardId = event.path[1].id;
    if(cardId !== ''){
        document.location.replace(`/post/${cardId}`);
    }
}

// Assign elements to handlers
dashBtn.addEventListener('click', dashHandler);
postBtn.addEventListener('click', newPostHandler);
postCard.forEach(element =>{
    element.addEventListener('click', postCardHandler);
});