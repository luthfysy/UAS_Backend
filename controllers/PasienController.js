// controllers/PasienController.js
const Pasien = require("../models/Pasien");

class PasienController {
  async index(req, res) {
    try {
      const pasiens = await Pasien.all();
      res.json({ message: "Menampilkan data pasien", data: pasiens });
    } catch (error) {
      res.status(500).json({ message: "Error mendapatkan data pasien", error: error.message });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const pasien = await Pasien.findById(id);
      if (!pasien) {
        return res.status(404).json({ message: `Pasien dengan ID ${id} tidak ditemukan` });
      }
      res.json({ message: `Menampilkan data pasien dengan ID ${id}`, data: pasien });
    } catch (error) {
      res.status(500).json({ message: "Error mendapatkan data pasien", error: error.message });
    }
  }

  async store(req, res) {
    const { nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar } = req.body;
    try {
      const pasienId = await Pasien.create({ nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar });
      res.status(201).json({ message: "Menambahkan data pasien baru", data: { id: pasienId, nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar } });
    } catch (error) {
      res.status(500).json({ message: "Error menambahkan data pasien", error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar } = req.body;
    try {
      const updated = await Pasien.update(id, { nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar });
      if (!updated) {
        return res.status(404).json({ message: `Pasien dengan ID ${id} tidak ditemukan` });
      }
      res.json({ message: `Memperbarui data pasien dengan ID ${id}`, data: { id, nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar } });
    } catch (error) {
      res.status(500).json({ message: "Error memperbarui data pasien", error: error.message });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Pasien.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: `Pasien dengan ID ${id} tidak ditemukan` });
      }
      res.json({ message: `Menghapus data pasien dengan ID ${id}` });
    } catch (error) {
      res.status(500).json({ message: "Error menghapus data pasien", error: error.message });
    }
  }

  async search(req, res) {
    const { name } = req.params;
    try {
      const results = await Pasien.search(name);
      res.json({ message: `Hasil pencarian pasien dengan nama '${name}'`, data: results });
    } catch (error) {
      res.status(500).json({ message: "Error pencarian data pasien", error: error.message });
    }
  }

  async findByStatus(req, res) {
    const { status } = req.params;
    try {
      const results = await Pasien.findByStatus(status);
      res.json({ message: `Menampilkan pasien dengan status '${status}'`, data: results });
    } catch (error) {
      res.status(500).json({ message: "Error mendapatkan data pasien", error: error.message });
    }
  }
}

module.exports = new PasienController();
