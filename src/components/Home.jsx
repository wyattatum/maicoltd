import { useState, useEffect } from "react";
import "./Dashboard.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((r) => r.json()).then(setProducts).catch(() => {});
    fetch("http://localhost:3000/api/transactions")
      .then((r) => r.json()).then(setTransactions).catch(() => {});

          // 👇 Add this — show banner then hide after 3 seconds
    setTimeout(() => setShowBanner(true), 300);
    setTimeout(() => setShowBanner(false), 3500);
  }, []);

  const lowStock = products.filter((p) => p.quantity < 20).length;
  const outOfStock = products.filter((p) => p.quantity === 0).length;
  const stockIn = transactions.filter((t) => t.status === "IN").length;
  const stockOut = transactions.filter((t) => t.status === "OUT").length;
  const recent = transactions.slice(0, 5);

  function formatDate(dateStr) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div>
              {/* 👇 Add this banner */}
              <div className={`welcome-banner ${showBanner ? "show" : "hide"}`}>
        Welcome to <span>MAICO LTD</span> 👋
      </div>  

      <h2 className="section-title">Dashboard</h2>

      <div className="metrics">
        <div className="metric-card">
          <div className="metric-label">Total products</div>
          <div className="metric-value">{products.length}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Low stock</div>
          <div className="metric-value" style={{ color: "var(--color-text-warning)" }}>{lowStock}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Out of stock</div>
          <div className="metric-value" style={{ color: "var(--color-text-danger)" }}>{outOfStock}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total transactions</div>
          <div className="metric-value">{transactions.length}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Stock IN</div>
          <div className="metric-value" style={{ color: "var(--color-text-success)" }}>{stockIn}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Stock OUT</div>
          <div className="metric-value" style={{ color: "var(--color-text-danger)" }}>{stockOut}</div>
        </div>
      </div>

      <div className="table-card">
        <h3 className="form-title" style={{ marginBottom: "1rem" }}>Recent transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)" }}>No transactions yet</td></tr>
            ) : recent.map((t) => (
              <tr key={t.id}>
                <td>{t.product_name}</td>
                <td><span className={`badge ${t.status === "IN" ? "badge-success" : "badge-danger"}`}>Stock {t.status}</span></td>
                <td>{t.quantity}</td>
                <td>{t.user_name}</td>
                <td>{formatDate(t.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
