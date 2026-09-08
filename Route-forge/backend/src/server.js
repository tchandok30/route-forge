require("dotenv").config();

const express=require("express");
const errorHandler = require("./middleware/errorMiddleware");
const orderRoutes = require("./routes/orderRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const driverRoutes = require("./routes/driverRoutes");
const locationRoutes = require("./routes/locationRoutes");
const optimizationRoutes = require("./routes/optimizationRoutes");
const app=express();
const PORT = process.env.PORT || 5000;
app.use(express.json());   
app.get("/", (req, res) => {
    res.json({
    message: "RouteForge Backend"
});
});
app.use("/api/orders", orderRoutes);
app.use(errorHandler);
//                         REQUEST
//                            ↓
//                        Express
//                            ↓
//                          Route
//                            ↓
//                       Controller
//                            ↓
//                        Validation
//                            ↓
//                         Service
//                            ↓
//                        Response
//                            ↓
//                          Client

//                  Errors ─────────→ Error Middleware
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/optimization", optimizationRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
app.use(errorHandler);
