const prisma=require("../config/db");
const getallorders=async()=>{
    return await prisma.order.findMany()({
        include:{
            pickupLocation: true,
            deliveryLocation: true
        }
    })
}
const getorderbyid=async(id)=>{
    return await prisma.order.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            pickupLocation: true,
            deliveryLocation: true
        }
    })}

const createorder = async (data) => {
    return await prisma.order.create({
        data: {
            customerName: data.customerName,
            weight: data.weight,
            priority: data.priority,
            deadline: new Date(data.deadline),
            status: data.status || "PENDING",
            deliveryCost: data.deliveryCost || 0,
            pickupLocationId: data.pickupLocationId,
            deliveryLocationId: data.deliveryLocationId
        },
        include: {
            pickupLocation: true,
            deliveryLocation: true
        }
    });
};
const updateorder = async (id, data) => {
    return await prisma.order.update({
        where: {
            id: Number(id)
        },
        data
    });
};

const deleteorder = async (id) => {
    return await prisma.order.delete({
        where: {
            id: Number(id)
        }
    });
};

module.exports = {
    getallorders,
    getorderbyid,
    createorder,
    updateorder,
    deleteorder
};