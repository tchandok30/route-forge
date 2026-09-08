const { z } = require("zod");

const orderSchema = z.object({
    customerName: z.string().min(2),
    weight: z.number().positive(),
    priority: z.string().min(1),
    deadline: z.string().datetime(),
    status: z.string().optional(),
    deliveryCost: z.number().nonnegative().optional(),
    pickupLocationId: z.number().int().positive(),
    deliveryLocationId: z.number().int().positive()
});

module.exports = orderSchema;