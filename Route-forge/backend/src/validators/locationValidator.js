const { z } = require("zod");

const locationSchema = z.object({
    name: z.string().min(2),
    address: z.string().optional(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
});

module.exports = { locationSchema };