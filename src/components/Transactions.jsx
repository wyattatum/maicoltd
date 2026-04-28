import { useState, useEffect } from "react";
import "./Dashboard.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ user_id: "", product_id: "", status: "IN", quantity: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/api/products") 
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
  function fetchTransactions() {
    fetch("http://localhost:3000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch(() => setMessage("Failed to load transactions"));
  }

 
  function handleSubmit(e) {
  e.preventDefault();
  const token = localStorage.getItem("token"); // <-- define it here

  fetch("http://localhost:3000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // now valid
    },
    body: JSON.stringify(form),
  })
    .then((res) => res.text())
    .then((msg) => {
      setMessage(msg);
      setShowForm(false);
      setForm({ product_id: "", status: "IN", quantity: "" });
      fetchTransactions();
    })
    .catch(() => setMessage("Error creating transaction"));
}


  function formatDate(dateStr) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  return (
    
    <div>
      {message && <div className="alert">{message} <button onClick={() => setMessage("")}>×</button></div>}

      <div className="toolbar">
        <h2 className="section-title ">Transactions</h2>
        <button className="btn btn-primary"  style={{ marginBottom:-30,fontSize:14,marginRight:50}}onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New transaction"}
        </button>
      </div>
      
      {showForm && (
        <div className="form-card">
          <h3 className="form-title">New transaction</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Product</label>
              <select
                value={form.product_id}
                onChange={(e) => setForm({ ...form, product_id: e.target.value })}
                required
              >
                <option value="">Select a product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="IN">Stock IN</option>
                <option value="OUT">Stock OUT</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
            </div>
            <div className="form-group form-actions">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)" }}>No transactions found</td></tr>
            ) : transactions.map((t, i) => (
              <tr key={t.id}>
                <td>{i + 1}</td>
                <td>{t.product_name}</td>
                <td>
                  <span className={`badge ${t.status === "IN" ? "badge-success" : "badge-danger"}`}>
                    Stock {t.status}
                  </span>
                </td>
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

export default Transactions;

