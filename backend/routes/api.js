const express = require("express");
const router = express.Router();
const { getSampleData } = require("../controllers/sampleController");

router.get("/sample", getSampleData);

module.exports = router;
