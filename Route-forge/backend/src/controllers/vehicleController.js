const vehicleService=require("../services/vehicleService");
const getallvehicles=async(req,res,next)=>{
    try{
        const vehicles = await vehicleService.getallvehicles();
        res.status(200).json({ message: "All vehicles retrieved successfully", data: vehicles });
    }catch(err){
        next(err);
    }
}
const createvehicle=async(req,res,next)=>{
    try{
        const vehicleData=req.body;
        const newVehicle = await vehicleService.createvehicle(vehicleData);
        res.status(201).json({ message: "Vehicle created successfully", data: newVehicle });
    }catch(err){
        next(err);
    }
}
const getvehiclebyid=async(req,res,next)=>{
try{
const vehicle=await vehicleService.getvehiclebyid(req.params.id);
if(!vehicle){
    return res.status(404).json({ message: "Vehicle not found" });
}res.status(200).json(vehicle);
}catch(err){
    next(err);
}
}
const updateVehicle = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.updateVehicle(
            req.params.id,
            req.body
        );

        res.status(200).json(vehicle);
    } catch (error) {
        next(error);
    }
};

const deletevehicle=async(req,res,next)=>{
    try{
        const vehicle=await vehicleService.deletevehicle(req.params.id);
        if(!vehicle){
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.status(200).json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports={
    getallvehicles,
    createvehicle,
    getvehiclebyid,
    updateVehicle,
    deletevehicle
};