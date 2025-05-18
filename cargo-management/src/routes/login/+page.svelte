<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;
  let rememberMe = false;

  // Check if user is already logged in
  onMount(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      goto('/dashboard');
    }
  });

  async function handleLogin() {
    if (!email || !password) {
      error = 'Please enter both email and password';
      return;
    }

    isLoading = true;
    error = '';

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem('authToken', data.token);
        } else {
          sessionStorage.setItem('authToken', data.token);
        }
        goto('/dashboard');
      } else {
        error = data.message || 'Login failed. Please try again.';
      }
    } catch (err) {
      error = 'Network error. Please try again later.';
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Cargo Management System - Login</title>
</svelte:head>

<div class="login-container">
  <div class="header">
    <h1 class="title">
      Cargo Management System
    </h1>
    <h2 class="subtitle">
      Sign in to your account
    </h2>
  </div>

  <div class="form-container">
    <div class="form-box">
      {#if error}
        <div class="error-message">
          <div class="flex">
            <div class="error-icon">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="error-text">
              <p>{error}</p>
            </div>
          </div>
        </div>
      {/if}

      <form class="form" on:submit|preventDefault={handleLogin}>
        <div class="form-group">
          <label for="email">Email address</label>
          <div class="input-container">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              bind:value={email}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-container">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              bind:value={password}
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div class="options">
          <div class="remember-me">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              bind:checked={rememberMe}
            />
            <label for="remember-me">Remember me</label>
          </div>

          <div class="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </div>
        </div>

        <div class="submit-button">
          <button type="submit" disabled={isLoading}>
            {#if isLoading}
              <svg class="spinner" viewBox="0 0 24 24">
                <circle class="spinner-circle" cx="12" cy="12" r="10"></circle>
                <path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            {:else}
              Sign in
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="signup-link">
    <p>
      Don't have an account?{' '}
      <a href="/register">Sign up</a>
    </p>
  </div>
</div>

<style>
  .login-container {
    min-height: 100vh;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 1rem;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .title {
    font-size: 1.875rem;
    font-weight: 800;
    color: #1a202c;
    margin: 0;
  }

  .subtitle {
    font-size: 1.5rem;
    font-weight: 600;
    color: #4a5568;
    margin-top: 1.5rem;
    margin-bottom: 0;
  }

  .form-container {
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
  }

  .form-box {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .error-message {
    background-color: #fef2f2;
    border-left: 4px solid #ef4444;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .error-icon {
    color: #ef4444;
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.75rem;
  }

  .error-text {
    color: #b91c1c;
    font-size: 0.875rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  .input-container input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    font-size: 0.875rem;
  }

  .input-container input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }

  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .remember-me {
    display: flex;
    align-items: center;
  }

  .remember-me input {
    width: 1rem;
    height: 1rem;
    color: #6366f1;
    border-color: #e2e8f0;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
  }

  .remember-me label {
    font-size: 0.875rem;
    color: #4a5568;
  }

  .forgot-password a {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6366f1;
    text-decoration: none;
  }

  .forgot-password a:hover {
    color: #4f46e5;
    text-decoration: underline;
  }

  .submit-button button {
    width: 100%;
    padding: 0.5rem;
    background-color: #6366f1;
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
  }

  .submit-button button:hover {
    background-color: #4f46e5;
  }

  .submit-button button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .spinner {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.75rem;
    animation: spin 1s linear infinite;
  }

  .spinner-circle {
    opacity: 0.25;
    stroke: currentColor;
    stroke-width: 4;
  }

  .spinner-path {
    opacity: 0.75;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .signup-link {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.875rem;
    color: #718096;
  }

  .signup-link a {
    font-weight: 500;
    color: #6366f1;
    text-decoration: none;
  }

  .signup-link a:hover {
    color: #4f46e5;
    text-decoration: underline;
  }

  @media (min-width: 640px) {
    .login-container {
      padding: 3rem 1.5rem;
    }
  }
</style>
