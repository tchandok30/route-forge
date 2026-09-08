const prisma = require("../config/db");

const getalldrivers=async()=>{
    return await prisma.driver.findMany();
}
const getvehiclebyid=async(id)=>
{
    return await prisma.driver.findMany({
        where:{
            vehicleId:Number(id)
        }
    })};
const createdriver = async(data) => {
    return await prisma.driver.create({
        data: {
            name: data.name,
            phone: data.phone,
            licenseNumber: data.licenseNumber,
            status: data.status || "AVAILABLE"
        }
    });
};
const updatedriver=async(id,data)=>{
    return await prisma.driver.update({
        where:{ 
            id:Number(id)
        },
        data:data
    })
}
const deleteDriver = async (id) => {
    return await prisma.driver.delete({
        where: {
            id: Number(id)
        }
    });
};

module.exports={
    getalldrivers,
    getvehiclebyid,
    createdriver,
    updatedriver,
    deleteDriver
}