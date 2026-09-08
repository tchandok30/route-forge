const prisma = require("../config/db");

const getallassignments = async () => {
    return await prisma.assignment.findMany({
        include: {
            order: true,
            vehicle: true,
            driver: true
        }
    });
};

const getassignmentbyid = async (id) => {
    return await prisma.assignment.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            order: true,
            vehicle: true,
            driver: true
        }
    });
};

const createassignment = async (data) => {
    return await prisma.assignment.create({
        data: {
            orderId: data.orderId,
            vehicleId: data.vehicleId,
            driverId: data.driverId
        },
        include: {
            order: true,
            vehicle: true,
            driver: true
        }
    });
};

const updateassignment = async (id, data) => {
    return await prisma.assignment.update({
        where: {
            id: Number(id)
        },
        data
    });
};

const deleteassignment = async (id) => {
    return await prisma.assignment.delete({
        where: {
            id: Number(id)
        }
    });
};

module.exports = {
    getallassignments,
    getassignmentbyid,
    createassignment,
    updateassignment,
    deleteassignment
};