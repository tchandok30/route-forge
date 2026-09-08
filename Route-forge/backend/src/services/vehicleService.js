const prisma=require("../config/db");
const getallvehicles=async()=>{
    return await prisma.vehicle.findMany();
}
const createvehicle = async (data) => {
    return await prisma.vehicle.create({
        data: {
            vehicleNumber: data.vehicleNumber,
            vehicleType: data.vehicleType,
            capacity: data.capacity,
            operatingCost: data.operatingCost
        }
    });
};

const getvehiclebyid=async(id)=>{
    return await prisma.vehicle.findUnique({
        where: {
            id: Number(id)
        }
    });
}
const updateVehicle = async (id, data) => {
    return await prisma.vehicle.update({
        where: {
            id: Number(id)
        },
        data: data
    });
};
const deletevehicle=async(id)=>{
    return await prisma.vehicle.delete({
        where:{
            id:Number(id)
        }
    })
}
module.exports={
    getallvehicles,
    createvehicle,
    getvehiclebyid,
    updateVehicle,
    deletevehicle
}