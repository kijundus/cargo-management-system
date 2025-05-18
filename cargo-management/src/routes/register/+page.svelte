<!-- In your register.svelte -->
<script>
  // ... existing code ...

  async function handleRegister() {
    // ... existing validation ...

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Automatically log in after registration
        const loginResponse = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          // Store token and redirect to dashboard
          localStorage.setItem('authToken', loginData.token);
          goto('/dashboard');
        } else {
          // Registration succeeded but login failed
          goto('/login');
        }
      } else {
        error = data.message || 'Registration failed. Please try again.';
      }
    } catch (err) {
      error = 'Network error. Please try again later.';
    } finally {
      isLoading = false;
    }
  }
</script>