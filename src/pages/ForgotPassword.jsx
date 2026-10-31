import { useState } from "react";
import { Link } from "react-router-dom";
import "../Component/ForgotPassword.css";

function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Change password
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const {
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    } = form;

    // Check all fields
    if (
      !email ||
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Password length
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    // New password should be different
    if (newPassword === currentPassword) {
      setError(
        "New password must be different from the current one."
      );
      return;
    }

    // Confirm password
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword,
          }),
        }
      );

      // Backend returns plain text
      const data = await response.text();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data);
      }
    } catch (error) {
      console.error(error);
      setError("Unable to connect to server.");
    }
  };

  return (
    <div className="forgot">

      {/* Logo */}
      <Link to="/" className="forgot-brand">
        Job<span>Connect</span>
      </Link>

      <div className="forgot-card">

        {!success ? (
          <form onSubmit={handleSubmit}>

            <div className="forgot-icon">
              🔑
            </div>

            <h1>
              Change Password
            </h1>

            <p className="forgot-sub">
              Enter your email and current password to set a new one.
            </p>

            {/* Error */}
            {error && (
              <div className="forgot-error">
                {error}
              </div>
            )}

            {/* Email */}
            <label className="forgot-field">

              <span>
                Email Address
              </span>

              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />

            </label>

            {/* Current Password */}
            <label className="forgot-field">

              <span>
                Current Password
              </span>

              <input
                name="currentPassword"
                type={show ? "text" : "password"}
                placeholder="••••••••"
                value={form.currentPassword}
                onChange={handleChange}
              />

            </label>

            {/* New Password */}
            <label className="forgot-field">

              <span>
                New Password
              </span>

              <input
                name="newPassword"
                type={show ? "text" : "password"}
                placeholder="At least 6 characters"
                value={form.newPassword}
                onChange={handleChange}
              />

            </label>

            {/* Confirm Password */}
            <label className="forgot-field">

              <span>
                Confirm New Password
              </span>

              <input
                name="confirmPassword"
                type={show ? "text" : "password"}
                placeholder="Re-enter new password"
                value={form.confirmPassword}
                onChange={handleChange}
              />

            </label>

            {/* Show Password */}
            <label className="forgot-check">

              <input
                type="checkbox"
                checked={show}
                onChange={() => setShow(!show)}
              />

              Show passwords

            </label>

            {/* Submit */}
            <button
              type="submit"
              className="forgot-submit"
            >
              Update Password
            </button>

            {/* Back */}
            <Link
              to="/login"
              className="forgot-back"
            >
              ← Back to Login
            </Link>

          </form>

        ) : (

          /* Success */
          <div className="forgot-success">

            <div className="forgot-icon success">
              ✅
            </div>

            <h1>
              Password Updated
            </h1>

            <p className="forgot-sub">
              Your password has been changed successfully.
              You can now log in with your new password.
            </p>

            <Link
              to="/login"
              className="forgot-submit forgot-link-btn"
            >
              Go to Login
            </Link>

          </div>
        )}

      </div>

      <small className="forgot-footer">
        © 2026 JobConnect
      </small>

    </div>
  );
}

export default ForgotPassword;