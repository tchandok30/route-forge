const driverservice = require("../services/driverService");
const getalldrivers = async (req, res, next) => {
    try {
        const drivers = await driverservice.getalldrivers();
        res.status(200).json({ message: "All drivers retrieved successfully", data: drivers });
    }catch(err){
        next(err);
    }}
const getdriver=async(req,res,next)=>{
    try{
        const driver=await driverservice.getvehiclebyid(req.params.id);
        if(!driver){
            return res.status(404).json({ message: "Driver not found" });
        }return res.status(200).json(driver);
    }catch(err){
        next(err);
    }
}

const createdriver=async(req,res,next)=>{
    try{
        const driverData=req.body;
        const newDriver=await driverservice.createdriver(driverData);
        res.status(201).json({ message: "Driver created successfully", data: newDriver });
    }catch(err){
        next(err);
    }
}
const updatedriver=async(req,res,next)=>{
    try{
        const driver=await driverservice.updatedriver(req.params.id,req.body);
        res.status(200).json({ message: "Driver updated successfully", data: driver });
    }catch(err){
        next(err);
    }}

    const deleteDriver = async (req, res, next) => {
    try {
        await driverservice.deleteDriver(req.params.id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    deleteDriver,
    getalldrivers,
    getdriver,
    createdriver,
    updatedriver
};