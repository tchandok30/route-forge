const express=require("express");

const orderRoutes = require("./routes/orderRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const driverRoutes = require("./routes/driverRoutes");
const app=express();
const PORT = 5000;
app.use(express.json());   
app.get("/", (req, res) => {
    res.json({
    message: "RouteForge Backend"
});
});
app.use("/api/orders", orderRoutes);
// GET /api/orders
//        ↓
// server.js
//        ↓
// orderRoutes.js
//        ↓
// router.get("/")
//        ↓
// response
app.use("/api/vehicles", vehicleRoutes);

app.use("/api/drivers", driverRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
