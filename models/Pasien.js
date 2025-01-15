// models/Pasien.js
const db = require("../config/database");

class Pasien {
  static validStatuses = ["positif", "sembuh", "sembuh"]; // ENUM status_pasien

  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM pasien";
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM pasien WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      if (!Pasien.validStatuses.includes(data.status_pasien)) {
        reject(new Error("Status pasien tidak valid"));
      }
      const query = "INSERT INTO pasien SET ?";
      db.query(query, data, (err, result) => {
        if (err) reject(err);
        resolve(result.insertId);
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      if (data.status_pasien && !Pasien.validStatuses.includes(data.status_pasien)) {
        reject(new Error("Status pasien tidak valid"));
      }
      const query = "UPDATE pasien SET ? WHERE id = ?";
      db.query(query, [data, id], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM pasien WHERE id = ?";
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        resolve(result.affectedRows > 0);
      });
    });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM pasien WHERE nama LIKE ?";
      db.query(query, [`%${name}%`], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      if (!Pasien.validStatuses.includes(status)) {
        reject(new Error("Status pasien tidak valid"));
      }
      const query = "SELECT * FROM pasien WHERE status_pasien = ?";
      db.query(query, [status], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = Pasien;
