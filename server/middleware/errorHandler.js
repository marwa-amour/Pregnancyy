const errorHandler = (error, req,res,next) => {
    console.log(error)
    return res.status(error.statusCode || 500).json({error: error.message || 'Internal server error'});
};

module.exports = { errorHandler };