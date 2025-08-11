function loadProfile() {
  const userId = document.getElementById('userId').value;
  fetch(`http://localhost:3000/api/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.user) return alert('User not found');

      document.getElementById('username').textContent = data.user.username;
      document.getElementById('birthDate').textContent = data.user.birth_date;
      document.getElementById('joinDate').textContent = data.user.join_date;
      document.getElementById('email').value = data.user.email;

      document.getElementById('profileSection').style.display = 'block';
    })
    .catch(() => alert('Failed to load profile'));
}

function updateProfile() {
  const userId = document.getElementById('userId').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch(`http://localhost:3000/api/users/update`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, email, password })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Update complete');
    })
    .catch(() => alert('Update failed'));
}
