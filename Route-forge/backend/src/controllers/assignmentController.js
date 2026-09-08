const assignmentservice = require("../services/assignmentService");

const getallassignments = async (req, res, next) => {
    try {
        const assignments = await assignmentservice.getallassignments();

        res.status(200).json({
            message: "All assignments retrieved successfully",
            data: assignments
        });
    } catch (err) {
        next(err);
    }
};

const getassignmentbyid = async (req, res, next) => {
    try {
        const assignment = await assignmentservice.getassignmentbyid(
            req.params.id
        );

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        res.status(200).json(assignment);
    } catch (err) {
        next(err);
    }
};

const createassignment = async (req, res, next) => {
    try {
        const assignment = await assignmentservice.createassignment(
            req.body
        );

        res.status(201).json({
            message: "Assignment created successfully",
            data: assignment
        });
    } catch (err) {
        next(err);
    }
};

const updateassignment = async (req, res, next) => {
    try {
        const assignment = await assignmentservice.updateassignment(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Assignment updated successfully",
            data: assignment
        });
    } catch (err) {
        next(err);
    }
};

const deleteassignment = async (req, res, next) => {
    try {
        await assignmentservice.deleteassignment(req.params.id);

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getallassignments,
    getassignmentbyid,
    createassignment,
    updateassignment,
    deleteassignment
};