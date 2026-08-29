const orderService = require("../services/orderService");

const getOrders = (req, res) => {

    const orders = orderService.getOrders();

    res.status(200).json(orders);

};

const createOrder = (req, res) => {
    const { id, weight, priority } = req.body;
    if (!id || !weight || !priority) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }
    if (weight <= 0) {
        return res.status(400).json({
            message: "Weight must be greater than 0"
        });
    }
    const order = orderService.createOrder({
        id,
        weight,
        priority
    });

    res.status(201).json(order);
};

module.exports = {
    getOrders,
    createOrder
};
// Controller deals with HTTP.Service deals with application logic.
        //      POST /api/orders
        //             ↓
        //      orderRoutes.js
        //             ↓
        //      createOrder()
        //             ↓
        //   orderController.js
        //             ↓
        //       response
        //             ↓
        //          Postman