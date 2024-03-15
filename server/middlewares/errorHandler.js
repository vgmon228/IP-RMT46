module.exports = (error, req, res, next) => {
    let status = error.status || 500
    let message = error.message || 'Internal server error'
    switch (error.name) {
        case 'Unauthorized':
            status = 401
            break;
        case 'Not Found':
            status = 404
            break;
    }
    res.status(status).json({ message: message })
}