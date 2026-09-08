const prisma = require("../config/db");

const getalllocations = async () => {
    return await prisma.location.findMany();
};

const getlocationbyid = async (id) => {
    return await prisma.location.findUnique({
        where: {
            id: Number(id)
        }
    });
};

const createlocation = async (data) => {
    return await prisma.location.create({
        data: {
            name: data.name,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude
        }
    });
};

const updatelocation = async (id, data) => {
    return await prisma.location.update({
        where: {
            id: Number(id)
        },
        data
    });
};

const deletelocation = async (id) => {
    return await prisma.location.delete({
        where: {
            id: Number(id)
        }
    });
};

module.exports = {
    getalllocations,
    getlocationbyid,
    createlocation,
    updatelocation,
    deletelocation
};