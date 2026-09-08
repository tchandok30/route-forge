const errorHandler = (err, req, res, next) => {

    console.error(err);
    

    if (err.code === "P2002") {
        return res.status(409).json({
            message: "Duplicate value already exists"
        });
    }

    if (err.code === "P2025") {
    return res.status(404).json({
        message: "Record not found"
    });
}

    res.status(500).json({
        message: "Internal server error"
    });
};

module.exports = errorHandler;