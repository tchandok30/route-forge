const express = require("express");

const router = express.Router();

const getalldrivers = require("../controllers/driverController").getalldrivers;
const getdriver = require("../controllers/driverController").getdriver;
const createdriver = require("../controllers/driverController").createdriver;
const updatedriver = require("../controllers/driverController").updatedriver;
const deleteDriver = require("../controllers/driverController").deleteDriver;

const { driverSchema } = require("../validators/driverValidator");

const validate = require("../middleware/validate");

router.get("/", getalldrivers);

router.get("/:id", getdriver);

router.post("/", validate(driverSchema), createdriver);

router.patch("/:id", updatedriver);

router.delete("/:id", deleteDriver);

module.exports = router;