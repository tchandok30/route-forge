const express = require("express");

const {
    selectVehicle,
    optimizeVehicleAllocation,
    assignDrivers,
    createAssignments
} = require("../controllers/optimizationController");

const router = express.Router();

router.post("/select-vehicle", selectVehicle);
router.post("/allocate", optimizeVehicleAllocation);
router.post("/assign-drivers", assignDrivers);
router.post("/create-assignments", createAssignments);
module.exports = router;