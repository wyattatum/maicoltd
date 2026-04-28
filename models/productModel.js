const db = require("../config/db");

// CREATE
exports.createProduct = (name, price, quantity, user_id, callback) => {
  const sql = "INSERT INTO mproduct (name, price, quantity, user_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, price, quantity, user_id], callback);
};

// READ ALL
exports.getAllProducts = (callback) => {
  //const sql = "SELECT * FROM mproduct";
  const sql = "SELECT  p.id, p.name, p.price,p.quantity, u.name AS STOCKER FROM mproduct p JOIN users u ON p.user_id = u.id";
  db.query(sql, callback);
};

// READ ONE
exports.getProductById = (id, callback) => {
  const sql = "SELECT * FROM mproduct WHERE id = ?";
  db.query(sql, [id], callback);
};

// UPDATE
exports.updateProduct = (id, name, price, quantity, callback) => {
  const sql = "UPDATE mproduct SET name=?, price=?, quantity=? WHERE id=?";
  db.query(sql, [name, price, quantity, id], callback);
};

// DELETE
exports.deleteProduct = (id, callback) => {
  const sql = "DELETE FROM mproduct WHERE id = ?";
  db.query(sql, [id], callback);
};
