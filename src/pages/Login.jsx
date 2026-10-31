import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "../Component/Login.css";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8080/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Login successful!");

      console.log("Login successful:", data);

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(data));

      // Go to Home
      navigate("/dashboard");
    } else {
      setError(data);
    }
  } catch (error) {
    console.error(error);
    setError("Unable to connect to server.");
  }
};

  return (
    <div className="login">
      {/* Left brand panel */}
      <aside className="login-side">
        <Link to="/" className="login-brand">
          Job<span>Connect</span>
        </Link>
        <div className="login-side-body">
          <h2>Your next opportunity is one login away.</h2>
          <p>Track applications, discover new roles and get hired faster.</p>
        </div>
        <small>© 2026 JobConnect</small>
      </aside>

      {/* Right form panel */}
      <main className="login-main">
        <form className="login-box" onSubmit={handleSubmit}>
          <h1>Welcome Back</h1>
          <p className="login-sub">Login to continue your job search</p>

          {error && <div className="login-error">{error}</div>}

          <label className="login-field">
            <span>Email Address</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <Link to="/forgot-password" className="login-forgot">
            Forgot password?
          </Link>

          <button type="submit" className="login-submit">Login</button>

          <p className="login-switch">
            Don't have an account? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;