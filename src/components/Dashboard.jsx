import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import Transactions from "./Transactions";
import "./Dashboard.css";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/login");
  }

  function renderPage() {
    if (activePage === "dashboard") return <Home />;
    if (activePage === "products") return <Products />;
    if (activePage === "transactions") return <Transactions />;
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/>
        <rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/>
      </svg>
    )},
    { id: "products", label: "Products", icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z"/>
      </svg>
    )},
    { id: "transactions", label: "Transactions", icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 5h12M2 8h8M2 11h5"/><path d="M11 9l3 3-3 3"/>
      </svg>
    )},
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">Maico<span>Ltd</span></div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2H2v12h4M10 11l4-4-4-4M14 8H6"/>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <span className="topbar-title">
            {navItems.find((n) => n.id === activePage)?.label}
          </span>
          <div className="topbar-right">
            <div className="avatar">AD</div>
          </div>
        </header>
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
