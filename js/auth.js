document.addEventListener('DOMContentLoaded', function() {
  const signinForm = document.getElementById('signinForm');
  
  signinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    // Simple email validation
    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Password length check
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    // Store user session (simplified)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  });
  
  // Check if already logged in
  if (localStorage.getItem('isAuthenticated') === 'true') {
    window.location.href = 'dashboard.html';
  }
});