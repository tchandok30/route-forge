const{z}=require("zod");

const assignmentSchema = z.object({
    orderId: z.number().int().positive(),
    vehicleId: z.number().int().positive(),
    driverId: z.number().int().positive(),
    
});
module.exports = assignmentSchema;