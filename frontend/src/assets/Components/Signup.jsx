import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import "./Signup.css";
import "./Login.css"; // Reuse shared auth styles
import gym10 from "../Images/gym11.jpg";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
    phone: "",
    role: "",
    package: "",
    email: "",
    password: "",
  });
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
    setStatus({ type: "loading", message: "Creating account..." });

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Account created successfully! Redirecting..." });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorMsg = data.error ? `${data.message} (${data.error})` : data.message;
        setStatus({ type: "error", message: errorMsg || "Failed to create account." });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setStatus({ type: "error", message: "Server error. Is the backend running?" });
    }
  };

  return (
    <div className="signup-page-wrapper">
      <div className="auth-bg-wrapper">
        <img src={gym10} alt="background" className="auth-bg-image" />
        <div className="auth-bg-overlay"></div>
      </div>
      <div className="overlay-content">
        <h2 className="overlay-title">Push Your <span className="gradient-text">Limits</span></h2>
        <p className="overlay-text">Join the community of fitness enthusiasts and transform your body with Gymmarco.</p>
      </div>

      <div className="signup-container">
        <div className="signup-glow-1"></div>
        <div className="signup-glow-2"></div>

        <motion.div
          className="glass-card signup-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="auth-header">
            <h1 className="auth-title">
              Create <span className="gradient-text">Account</span>
            </h1>
            <p className="auth-subtitle">Join Gymmarco and start transforming your life</p>
          </div>

          {status.message && (
            <p className={`auth-status-msg ${status.type}`}>
              {status.message}
            </p>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="signup-form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="form-input"
                  placeholder="Enter your age"
                  min="14"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-input"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="Member">Member</option>
                  <option value="Trainer">Trainer</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
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
            </div>

            <button type="submit" className="btn-primary auth-submit-btn">
              <UserPlus size={20} />
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?
            <Link to="/login" className="auth-link">Login</Link>
          </div>
        </motion.div>
      </div>
    </div>


  );
}

export default Signup;
