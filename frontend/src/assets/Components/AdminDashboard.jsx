import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, UserPlus, Activity, LogOut, Ban, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Check if the user is actually a trainer
    const role = localStorage.getItem("userRole");
    if (role !== "Trainer") {
      navigate("/");
      return;
    }

    fetchMembers();
  }, [navigate]);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/users');
      const data = await response.json();
      if (data.success) {
        // Filter by Member role
        const membersList = data.users.filter(u => u.role === "Member");
        setMembers(membersList);
      }
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  const handleBlockToggle = async (id, currentStatus) => {
    const action = currentStatus === 'blocked' ? 'unblock' : 'block';
    if (!window.confirm(`Are you sure you want to ${action} this member?`)) return;
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${id}/block`, {
        method: 'PUT'
      });
      const data = await response.json();
      if (data.success) {
        setMembers(members.map(m => m._id === id ? { ...m, status: data.status } : m));
      }
    } catch (err) {
      console.error(`Error ${action}ing member:`, err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <div className="admin-glow-1"></div>
      <div className="admin-glow-2"></div>

      <div className="container">
        <header className="admin-header">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="admin-title">Trainer <span className="gradient-text">Dashboard</span></h1>
            <p className="admin-subtitle">Manage your gym members and track their progress</p>
          </motion.div>

          <motion.button
            className="btn-outline logout-btn"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </header>

        <div className="admin-stats-grid">
          <motion.div
            className="glass-card stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stat-icon"><Users size={24} color="#7c3aed" /></div>
            <div className="stat-info">
              <h3>Total Members</h3>
              <p className="stat-value">{members.length}</p>
            </div>
          </motion.div>
          <motion.div
            className="glass-card stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-icon"><UserPlus size={24} color="#db2777" /></div>
            <div className="stat-info">
              <h3>New This Week</h3>
              <p className="stat-value">{members.length}</p>
            </div>
          </motion.div>
          <motion.div
            className="glass-card stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-icon"><Activity size={24} color="#ea580c" /></div>
            <div className="stat-info">
              <h3>Active Sessions</h3>
              <p className="stat-value">4</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="glass-card table-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="table-header">
            <h2>Member Directory</h2>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>City</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {members.length > 0 ? (
                  members.map((member, index) => (
                    <tr key={index}>
                      <td className="member-name">{member.name}</td>
                      <td>{member.age}</td>
                      <td>{member.gender}</td>
                      <td>{member.city}</td>
                      <td>{member.phone || "N/A"}</td>
                      <td className="member-email">{member.email}</td>
                      <td><span className={`status-badge ${member.status === 'blocked' ? 'blocked' : 'active'}`} style={{ backgroundColor: member.status === 'blocked' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)', color: member.status === 'blocked' ? '#ef4444' : '#22c55e' }}>{member.status === 'blocked' ? 'Blocked' : 'Active'}</span></td>
                      <td>
                        <button className="remove-btn" onClick={() => handleBlockToggle(member._id, member.status)} title={member.status === 'blocked' ? "Unblock Member" : "Block Member"} style={{ color: member.status === 'blocked' ? '#22c55e' : '#ef4444', borderColor: member.status === 'blocked' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)' }}>
                          {member.status === 'blocked' ? <CheckCircle size={16} /> : <Ban size={16} />}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">No members found. Add members through the signup page.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;
