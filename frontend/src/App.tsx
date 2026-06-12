import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./assets/Components/Header";
import Home from "./assets/Components/Home";
import Footer from "./assets/Components/Footer";
import Package from "./assets/Components/Pakage";
import Men from "./assets/Components/Men";
import Women from "./assets/Components/Women";
import Contact from "./assets/Components/Contact";
import Login from "./assets/Components/Login";
import Signup from "./assets/Components/Signup";
import AdminDashboard from "./assets/Components/AdminDashboard";
import Messages from "./assets/Components/Messages";

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const isAuthenticated = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole || "")) {
    if (userRole === "Trainer") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for changes in localStorage to update auth state across components
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("authToken"));
      setUserRole(localStorage.getItem("userRole"));
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event for same-window updates
    window.addEventListener("authChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <Router>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={
          !isAuthenticated ? (
            <Navigate to="/signup" replace />
          ) : userRole === "Trainer" ? (
            <Navigate to="/admin" replace />
          ) : (
            <Home />
          )
        } />
        
        <Route path="/packages" element={<ProtectedRoute allowedRoles={["Member"]}><Package /></ProtectedRoute>} />
        <Route path="/mens" element={<ProtectedRoute allowedRoles={["Member"]}><Men /></ProtectedRoute>} />
        <Route path="/womens" element={<ProtectedRoute allowedRoles={["Member"]}><Women /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute allowedRoles={["Member"]}><Contact /></ProtectedRoute>} />
        
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
        
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["Trainer"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute allowedRoles={["Trainer"]}><Messages /></ProtectedRoute>} />
      </Routes>
      {isAuthenticated && <Footer theme={theme} />}
    </Router>
  )
}

export default App;