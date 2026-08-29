const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Drivers API"
    });
});

module.exports = router;