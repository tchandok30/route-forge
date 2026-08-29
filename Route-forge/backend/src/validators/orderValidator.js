const { z } = require("zod");

const orderSchema = z.object({
    id: z.string().min(1),
    weight: z.number().positive(),
    priority: z.enum(["LOW", "NORMAL", "HIGH", "CRITICAL"])
});

module.exports = {
    orderSchema
};