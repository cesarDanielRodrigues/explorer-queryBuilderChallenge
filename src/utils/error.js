const AppError = require("../utils/appError")
const erro = (error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        status: "error",
        message: "erro de servidor interno"
    })
}

module.exports = erro