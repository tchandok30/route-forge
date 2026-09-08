const express = require("express");

const {
    getallassignments,
    getassignmentbyid,
    createassignment,
    updateassignment,
    deleteassignment
} = require("../controllers/assignmentController");

const validate = require("../middleware/validate");
const assignmentSchema = require("../validators/assignmentValidator");

const router = express.Router();

router.get("/", getallassignments);
router.get("/:id", getassignmentbyid);
router.post("/", validate(assignmentSchema), createassignment);
router.patch("/:id", updateassignment);
router.delete("/:id", deleteassignment);

module.exports = router;