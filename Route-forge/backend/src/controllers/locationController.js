const locationService = require("../services/locationService");

const getalllocations = async (req, res, next) => {
    try {
        const locations = await locationService.getalllocations();

        res.status(200).json({
            message: "Locations retrieved successfully",
            data: locations
        });
    } catch (err) {
        next(err);
    }
};

const getlocation = async (req, res, next) => {
    try {
        const location = await locationService.getlocationbyid(req.params.id);

        if (!location) {
            return res.status(404).json({
                message: "Location not found"
            });
        }

        res.status(200).json(location);
    } catch (err) {
        next(err);
    }
};

const createlocation = async (req, res, next) => {
    try {
        const location = await locationService.createlocation(req.body);

        res.status(201).json({
            message: "Location created successfully",
            data: location
        });
    } catch (err) {
        next(err);
    }
};

const updatelocation = async (req, res, next) => {
    try {
        const location = await locationService.updatelocation(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Location updated successfully",
            data: location
        });
    } catch (err) {
        next(err);
    }
};

const deletelocation = async (req, res, next) => {
    try {
        await locationService.deletelocation(req.params.id);

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getalllocations,
    getlocation,
    createlocation,
    updatelocation,
    deletelocation
};