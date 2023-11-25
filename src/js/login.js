const loginForm = document.getElementById('loginForm');

const loginUser = async (voter_id, password) => {
  const token = voter_id;
  const headers = {
    'method': 'GET',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await fetch(`http://127.0.0.1:8000/login?voter_id=${voter_id}&password=${password}`, { headers });

    if (response.ok) {
      const data = await response.json();

      if (data.role === 'admin') {
        localStorage.setItem('jwtTokenAdmin', data.token);
        window.location.replace(`http://127.0.0.1:8080/admin.html?Authorization=Bearer ${localStorage.getItem('jwtTokenAdmin')}`);
      } else if (data.role === 'user') {
        localStorage.setItem('jwtTokenVoter', data.token);
        window.location.replace(`http://127.0.0.1:8080/index.html?Authorization=Bearer ${localStorage.getItem('jwtTokenVoter')}`);
      }
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const voter_id = document.getElementById('voter-id').value;
  const password = document.getElementById('password').value;

  await loginUser(voter_id, password);
});
