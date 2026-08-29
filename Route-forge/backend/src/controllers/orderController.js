const orderService = require("../services/orderService");
const { orderSchema } = require("../validators/orderValidator");
const getOrders = (req, res) => {

    const orders = orderService.getOrders();

    res.status(200).json(orders);

};

const createOrder = (req, res) => {
   
    const result = orderSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid order data",
            errors: result.error.issues
        });
    }
    const order = orderService.createOrder(result.data);

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