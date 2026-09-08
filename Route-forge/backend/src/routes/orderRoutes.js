const express = require("express");

const {
    getallorders,
    getorderbyid,
    createorder,
    updateorder,
    deleteorder
} = require("../controllers/orderController");

const validate = require("../middleware/validate");
const orderSchema = require("../validators/orderValidator");

const router = express.Router();

router.get("/", getallorders);
router.get("/:id", getorderbyid);
router.post("/", validate(orderSchema), createorder);
router.patch("/:id", updateorder);
router.delete("/:id", deleteorder);

module.exports = router;