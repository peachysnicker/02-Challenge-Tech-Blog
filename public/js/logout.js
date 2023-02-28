const logout = async () => {
  const response = await fetch('/api/users/logout', { //route
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login'); //if everything goes ok then redirect to the log in page
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);

//code that happens when you click the logout button