
const serverError = (res, status=500) => {
    return res.status(status).json({message: {msgBody: "Something wrong with the server", msgError: true}})
}

module.exports = {serverError}