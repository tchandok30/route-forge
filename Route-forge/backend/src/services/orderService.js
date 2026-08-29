const orders = [];
const getOrders = () => {
    return orders;
};
const createOrder = (data) => {

    const order = {
        id: data.id,
        weight: data.weight,
        priority: data.priority
    };
    orders.push(order);
    return order;
};

module.exports = {
    getOrders,
    createOrder
};