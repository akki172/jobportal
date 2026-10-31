import { useState } from "react";
import { Link } from "react-router-dom";
import "../Component/Signup.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Frontend validation
  if (!form.name || !form.email || !form.password || !form.confirm) {
    setError("Please fill in all fields.");
    return;
  }

  if (form.password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }

  if (form.password !== form.confirm) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch(
      "https://jobportal-backend-p1cg.onrender.com/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Account created successfully!");
      console.log("Signup successful:", data);
    } else {
      setError(data);
    }
  } catch (error) {
    console.error(error);
    setError("Unable to connect to server.");
  }
};

  return (
    <div className="signup">
      {/* Left form panel */}
      <main className="signup-main">
        <form className="signup-box" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <p className="signup-sub">Join JobConnect and start applying today</p>

          {error && <div className="signup-error">{error}</div>}

          <label className="signup-field">
            <span>Full Name</span>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label className="signup-field">
            <span>Email Address</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <div className="signup-row">
            <label className="signup-field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </label>
            <label className="signup-field">
              <span>Confirm</span>
              <input
                name="confirm"
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="submit" className="signup-submit">Create Account</button>

          <p className="signup-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </main>

      {/* Right brand panel */}
      <aside className="signup-side">
        <Link to="/" className="signup-brand">
          Job<span>Connect</span>
        </Link>
        <div className="signup-side-body">
          <h2>Build your career with confidence.</h2>
          <ul>
            <li>✓ Discover jobs that match your skills</li>
            <li>✓ Apply in just a few clicks</li>
            <li>✓ Track every application in one place</li>
          </ul>
        </div>
        <small>© 2026 JobConnect</small>
      </aside>
    </div>
  );
}

export default Signup;