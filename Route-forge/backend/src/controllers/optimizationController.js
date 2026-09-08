const optimizationService = require("../services/optimizationService");

const selectVehicle = async (req, res, next) => {
    try {
        const vehicle = await optimizationService.selectVehicle(
            req.body.orderWeight
        );

        if (!vehicle) {
            return res.status(400).json({
                message: "No suitable vehicle available"
            });
        }

        res.status(200).json({
            message: "Vehicle selected successfully",
            data: vehicle
        });

    } catch (err) {
        next(err);
    }
};
const optimizeVehicleAllocation = async (req, res, next) => {
    try {

        const result =
            await optimizationService.optimizeVehicleAllocation(
                req.body.orders
            );

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({
            message: "Vehicle allocation optimized successfully",
            data: result.allocation
        });

    } catch (err) {
        next(err);
    }
};
const assignDrivers = async (req, res, next) => {
    try {

        const result =
            await optimizationService.assignDrivers(
                req.body.allocation
            );

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({
            message: "Drivers assigned successfully",
            data: result.allocation
        });

    } catch (err) {
        next(err);
    }
};
const createAssignments = async (req, res, next) => {

    try {

        const result =
            await optimizationService.createAssignments(
                req.body.allocation
            );

        res.status(201).json({
            message: "Assignments created successfully",
            data: result
        });

    } catch (err) {
        next(err);
    }
};
module.exports = {
    selectVehicle,
    optimizeVehicleAllocation,
    assignDrivers,
    createAssignments
};