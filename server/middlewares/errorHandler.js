module.exports = (error, req, res, next) => {
    let status = error.status || 500
    let message = error.message || 'Internal server error'
    switch (error.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            status = 400
            message = error.errors[0].message
            break;
        case'Bad Request':
            status = 400
            break;
        case 'Unauthorized':
            status = 401
            break;
        case 'Not Found':
            status = 404
            break;
    }
    res.status(status).json({ message: message })
}