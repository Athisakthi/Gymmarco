import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff } from "lucide-react";
import "./Login.css";
import loginImg from "../Images/gym11.jpg";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus({ type: "loading", message: "Logging in..." });

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Login successful! Redirecting..." });

        // In a real app, this should be a JWT token from the server
        localStorage.setItem("authToken", "mock_gymmarco_token_" + Date.now());
        localStorage.setItem("userRole", data.user.role);
        window.dispatchEvent(new Event("authChange"));

        setTimeout(() => {
          if (data.user.role === "Trainer") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        setError(data.message || "Invalid email or password");
        setStatus({ type: "", message: "" });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
      setStatus({ type: "", message: "" });
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="auth-bg-wrapper">
        <img src={loginImg} alt="background" className="auth-bg-image" />
        <div className="auth-bg-overlay"></div>
      </div>
      <div className="overlay-content">
        <h2 className="overlay-title">Welcome <span className="gradient-text">Back</span></h2>
        <p className="overlay-text">Your fitness journey continues here. Log in to access your dashboard and track your progress.</p>
      </div>

      <div className="auth-container">
        <div className="auth-glow-1"></div>
        <div className="auth-glow-2"></div>

        <motion.div
          className="glass-card auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auth-header">
            <h1 className="auth-title">
              Login <span className="gradient-text">Now</span>
            </h1>
            <p className="auth-subtitle">Log in to continue your fitness journey</p>
          </div>

          {error && <div className="auth-error" style={{ color: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.1)", padding: "10px", borderRadius: "8px", textAlign: "center", fontSize: "0.9rem" }}>{error}</div>}

          {status.message && (
            <div className={`auth-status-msg ${status.type}`} style={{ padding: "10px", borderRadius: "8px", textAlign: "center", fontSize: "0.9rem", marginBottom: "1rem", backgroundColor: status.type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(59, 130, 246, 0.1)", color: status.type === "success" ? "#22c55e" : "#3b82f6" }}>
              {status.message}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Email or Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                placeholder="Enter your email"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary auth-submit-btn">
              <LogIn size={20} />
              Login
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?
            <Link to="/signup" className="auth-link">Sign Up</Link>
          </div>
        </motion.div>
      </div>
    </div>

  );
}


export default Login;
