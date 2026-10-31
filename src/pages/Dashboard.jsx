import { Link, Navigate, useNavigate } from "react-router-dom";
import "../Component/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Invalid user data in localStorage");
  }

  // Not logged in -> go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const stats = [
    { icon: "📄", label: "Applications", value: 12 },
    { icon: "⭐", label: "Saved Jobs", value: 8 },
    { icon: "📅", label: "Interviews", value: 3 },
  ];

  const jobs = [
    {
      logo: "G",
      title: "Java Backend Developer",
      meta: "Hyderabad · Full-time",
    },
    {
      logo: "A",
      title: "React Frontend Engineer",
      meta: "Remote · Full-time",
    },
    {
      logo: "C",
      title: "Cloud Associate (GCP)",
      meta: "Bengaluru · Fresher",
    },
  ];

  return (
    <div className="dash">

      {/* Navbar */}
      <header className="dash-nav">

        <Link to="/" className="dash-brand">
          Job<span>Connect</span>
        </Link>

        <div className="dash-user">

          <span className="dash-email">
            Welcome, {user.name}
          </span>

          <button
            className="dash-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </header>

      {/* Main Content */}
      <main className="dash-main">

        {/* Welcome Banner */}
        <section className="dash-welcome">
          <h1>
            Welcome to Job Portal 👋
          </h1>

          <p>
            Find jobs, track applications and grow your career.
          </p>
        </section>

        {/* Stats */}
        <section className="dash-stats">

          {stats.map((s) => (
            <div
              className="dash-stat"
              key={s.label}
            >

              <div className="dash-stat-icon">
                {s.icon}
              </div>

              <div>
                <strong>
                  {s.value}
                </strong>

                <span>
                  {s.label}
                </span>
              </div>

            </div>
          ))}

        </section>

        {/* Recommended Jobs */}
        <section className="dash-jobs">

          <h2>
            Recommended for you
          </h2>

          <div className="dash-job-list">

            {jobs.map((j) => (
              <div
                className="dash-job"
                key={j.title}
              >

                <div className="dash-job-logo">
                  {j.logo}
                </div>

                <div className="dash-job-info">

                  <h4>
                    {j.title}
                  </h4>

                  <p>
                    {j.meta}
                  </p>

                </div>

                <button className="dash-apply">
                  Apply
                </button>

              </div>
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;