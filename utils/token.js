const jwt = require("jsonwebtoken");

const createNewToken = (payload) => {
    // process.env instead of process.getuid
    return jwt.sign({ userId: payload }, process.env.SECRET_KEY, { expiresIn: '10d' });
}
//added export
module.exports = { createNewToken };

