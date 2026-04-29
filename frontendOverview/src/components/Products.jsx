import { useState, useEffect } from "react";
import "./Dashboard.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", quantity: "", user_id: 1 });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setMessage("Failed to load products"));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = editProduct
      ? `http://localhost:3000/api/products/${editProduct.id}`
      : "http://localhost:3000/api/products";
    const method = editProduct ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.text())
      .then((msg) => {
        setMessage(msg);
        setShowForm(false);
        setEditProduct(null);
        setForm({ name: "", price: "", quantity: "", user_id: 1 });
        fetchProducts();
      })
      .catch(() => setMessage("Error saving product"));
  }

  function handleEdit(product) {
    setEditProduct(product);
    setForm({ name: product.name || "", price: product.price, quantity: product.quantity, user_id: 1 });
    setShowForm(true);
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    fetch(`http://localhost:3000/api/products/${id}`, { method: "DELETE" })
      .then((res) => res.text())
      .then((msg) => { setMessage(msg); fetchProducts(); })
      .catch(() => setMessage("Error deleting product"));
  }

  function getStockBadge(qty) {
    if (qty === 0) return <span className="badge badge-danger">Out of stock</span>;
    if (qty < 20) return <span className="badge badge-warning">Low stock</span>;
    return <span className="badge badge-success">In stock</span>;
  }

  return (
    <div>
      {message && <div className="alert">{message} <button onClick={() => setMessage("")}>×</button></div>}

      <div className="toolbar">
        <h2 className="section-title">Products</h2>
        <button className="btn btn-primary"  style={{ marginBottom:-30,fontSize:14,marginRight:50}} onClick={() => { setShowForm(!showForm); setEditProduct(null); setForm({ name: "", price: "", quantity: "", user_id: 1 }); }}>
          {showForm ? "Cancel" : "+ Add product"}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3 className="form-title">{editProduct ? "Edit product" : "New product"}</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
            </div>
            <div className="form-group form-actions">
              <button type="submit" className="btn btn-primary">{editProduct ? "Update" : "Create"}</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Stocker</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary)" }}>No products found</td></tr>
            ) : products.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.STOCKER}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td>{getStockBadge(p.quantity)}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;

