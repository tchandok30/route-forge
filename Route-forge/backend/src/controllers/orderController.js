const orderservice = require("../services/orderService");

const getallorders = async (req, res, next) => {
    try {
        const orders = await orderservice.getallorders();

        res.status(200).json({
            message: "All orders retrieved successfully",
            data: orders
        });
    } catch (err) {
        next(err);
    }
};

const getorderbyid = async (req, res, next) => {
    try {
        const order = await orderservice.getorderbyid(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

const createorder = async (req, res, next) => {
    try {
        const order = await orderservice.createorder(req.body);

        res.status(201).json({
            message: "Order created successfully",
            data: order
        });
    } catch (err) {
        next(err);
    }
};

const updateorder = async (req, res, next) => {
    try {
        const order = await orderservice.updateorder(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Order updated successfully",
            data: order
        });
    } catch (err) {
        next(err);
    }
};

const deleteorder = async (req, res, next) => {
    try {
        await orderservice.deleteorder(req.params.id);

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getallorders,
    getorderbyid,
    createorder,
    updateorder,
    deleteorder
};