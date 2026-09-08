const {z}=require("zod");
const vehicleSchema=z.object({
    vehicleNumber: z.string().min(1),
    vehicleType: z.string().min(1),
    capacity: z.number().positive(),
    operatingCost: z.number().nonnegative()
})
module.exports={vehicleSchema};