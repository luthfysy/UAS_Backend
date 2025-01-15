// routes/api.js
const PasienController = require("../controllers/PasienController");
const express = require("express");
const router = express.Router();

// Pasien routes
router.get("/patients", PasienController.index);
router.get("/patients/:id", PasienController.show);
router.post("/patients", PasienController.store);
router.put("/patients/:id", PasienController.update);
router.delete("/patients/:id", PasienController.destroy);
router.get("/patients/search/:name", PasienController.search);
router.get("/patients/status/:status", PasienController.findByStatus);

module.exports = router;
