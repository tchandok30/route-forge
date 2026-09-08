const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { locationSchema } = require("../validators/locationValidator");
const {
    getalllocations,
    getlocation,
    createlocation,
    updatelocation,
    deletelocation
} = require("../controllers/locationController");

router.get("/", getalllocations);
router.get("/:id", getlocation);
router.post("/", validate(locationSchema), createlocation);
router.patch("/:id", validate(locationSchema), updatelocation);
router.delete("/:id", deletelocation);

module.exports = router;