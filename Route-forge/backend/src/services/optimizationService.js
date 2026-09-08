const prisma = require("../config/db");

const selectVehicle = async (orderWeight) => {

    const vehicles = await prisma.vehicle.findMany({
        where: {
            status: "AVAILABLE"
        },
        orderBy: {
            capacity: "asc"
        }
    });

    const vehicle = vehicles.find(
        v => Number(v.capacity) >= Number(orderWeight)
    );

    return vehicle || null;
};


const optimizeVehicleAllocation = async (orders) => {

    const vehicles = await prisma.vehicle.findMany({
        where: {
            status: "AVAILABLE"
        },
        orderBy: {
            capacity: "asc"
        }
    });

    orders.sort((a, b) => b.weight - a.weight);

    const allocation = [];

    for (const order of orders) {

        let assigned = false;

        for (const vehicle of allocation) {

            if (
                vehicle.usedCapacity + Number(order.weight)
                <= Number(vehicle.capacity)
            ) {
                vehicle.orders.push(order);
                vehicle.usedCapacity += Number(order.weight);
                assigned = true;
                break;
            }
        }

        if (!assigned) {

            const vehicle = vehicles.find(
                v =>
                    Number(v.capacity) >= Number(order.weight) &&
                    !allocation.some(a => a.id === v.id)
            );

            if (!vehicle) {
                return {
                    success: false,
                    message: `No vehicle available for order ${order.id}`
                };
            }

            allocation.push({
                id: vehicle.id,
                vehicleNumber: vehicle.vehicleNumber,
                capacity: Number(vehicle.capacity),
                usedCapacity: Number(order.weight),
                orders: [order]
            });
        }
    }

    return {
        success: true,
        allocation
    };
};
const assignDrivers = async (allocation) => {

    const drivers = await prisma.driver.findMany({
        where: {
            status: "AVAILABLE"
        }
    });

    if (drivers.length < allocation.length) {
        return {
            success: false,
            message: "Not enough available drivers"
        };
    }

    allocation.forEach((vehicle, index) => {
        vehicle.driver = drivers[index];
    });

    return {
        success: true,
        allocation
    };
};
const createAssignments = async (allocation) => {

    const assignments = [];

    for (const vehicle of allocation) {

        for (const order of vehicle.orders) {

            const assignment = await prisma.assignment.create({
                data: {
                    orderId: order.id,
                    vehicleId: vehicle.id,
                    driverId: vehicle.driver.id
                }
            });

            assignments.push(assignment);
        }
    }

    return assignments;
};
module.exports = {
    selectVehicle,
    optimizeVehicleAllocation,
    assignDrivers,
    createAssignments
};