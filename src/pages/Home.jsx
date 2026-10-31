import { Link } from "react-router-dom";
import "../Component/Home.css";

function Home() {
  const features = [
    { icon: "🔍", title: "Smart Search", text: "Filter by role, skills, location and experience in seconds." },
    { icon: "🏢", title: "Top Companies", text: "Connect directly with companies that are actively hiring." },
    { icon: "⚡", title: "Quick Apply", text: "Apply in a couple of clicks and track every application." },
  ];

  return (
    <div className="home">
      {/* Navbar */}
      <header className="home-nav">
        <div className="home-brand">
          Job<span>Connect</span>
        </div>
        <nav className="home-links">
          <Link to="/" className="home-link">Home</Link>
          <Link to="/login" className="home-link">Login</Link>
          <Link to="/signup" className="home-cta">Sign Up</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-text">
          <span className="home-badge">YOUR CAREER STARTS HERE</span>
          <h1 className="home-title">
            Find Your <span className="home-title-accent">Dream Job</span> today
          </h1>
          <p className="home-desc">
            Discover exciting opportunities, connect with companies, and take
            the next step in your career.
          </p>
          <div className="home-actions">
            <Link to="/login" className="home-btn home-btn-primary">Login</Link>
            <Link to="/signup" className="home-btn home-btn-ghost">Create Account</Link>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="home-job-card card-1">
            <div className="home-job-logo">G</div>
            <div>
              <h4>Java Backend Developer</h4>
              <p>Hyderabad · Full-time</p>
            </div>
          </div>
          <div className="home-job-card card-2">
            <div className="home-job-logo alt">A</div>
            <div>
              <h4>React Frontend Engineer</h4>
              <p>Remote · Full-time</p>
            </div>
          </div>
          <div className="home-job-card card-3">
            <div className="home-job-logo alt2">C</div>
            <div>
              <h4>Cloud Associate (GCP)</h4>
              <p>Bengaluru · Fresher</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats">
        <div><strong>10K+</strong><span>Open Jobs</span></div>
        <div><strong>2K+</strong><span>Companies</span></div>
        <div><strong>50K+</strong><span>Job Seekers</span></div>
      </section>

      {/* Features */}
      <section className="home-features">
        <h2 className="home-section-title">Why JobConnect?</h2>
        <div className="home-feature-grid">
          {features.map((f) => (
            <div className="home-feature" key={f.title}>
              <div className="home-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        © 2026 JobConnect. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;