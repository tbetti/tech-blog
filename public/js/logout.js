const logoutHandler = async () => {
    // Create POST request that will destroy session
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);
  
    if (response.ok) {
      // If successfully logged out, redirect to the login page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  const logoutBtn = document.querySelector('#log-out-btn');
  if(logoutBtn){
    logoutBtn.addEventListener('click', logoutHandler)  
  }