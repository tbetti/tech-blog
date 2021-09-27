// Define buttons
const dashBtn = document.querySelector('#dashboard-btn');
const postBtn = document.querySelector('#post-btn');
const postCard = document.querySelectorAll('.card');
const loginBtn = document.querySelector('#log-in-btn');
const homeBtn = document.querySelector('#home-btn');

// Handlers to go to different pages when elements are selected
// Go to homepage
const homeHandler = (event) =>{
    event.preventDefault();

    document.location.replace('/');
}
// Go to dashboard
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
// Go to login page
const loginBtnHandler = (event) =>{
    event.preventDefault();
    
    document.location.replace('/login');
}

// Assign elements to handlers
homeBtn.addEventListener('click', homeHandler);
dashBtn.addEventListener('click', dashHandler);
if(postBtn){
    postBtn.addEventListener('click', newPostHandler);
}
if(loginBtn){
    loginBtn.addEventListener('click', loginBtnHandler);
}
postCard.forEach(element =>{
    element.addEventListener('click', postCardHandler);
});