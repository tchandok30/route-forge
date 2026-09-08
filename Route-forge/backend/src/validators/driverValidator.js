const { z } = require("zod");

const driverSchema = z.object({
    name: z.string().min(2),
    phone: z.string().regex(/^[0-9]{10}$/),
    licenseNumber: z.string().min(5),
    status: z.enum(["AVAILABLE", "BUSY", "OFFLINE"]).optional()
});

module.exports = { driverSchema };