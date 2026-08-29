require("dotenv").config();

const express=require("express");
const errorHandler = require("./middleware/errorMiddleware");
const orderRoutes = require("./routes/orderRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const driverRoutes = require("./routes/driverRoutes");
const app=express();
const PORT = process.env.PORT || 5000;
app.use(express.json());   
app.get("/", (req, res) => {
    res.json({
    message: "RouteForge Backend"
});
});
app.use("/api/orders", orderRoutes);
// app.use(errorHandler);
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

app.use("/api/drivers", driverRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
