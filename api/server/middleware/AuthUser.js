const jwt = require('jsonwebtoken');

ROLES = {
    'ADMIN': "admin",
    'PC': "coordinator",
    'STUDENT': "student"
}

PERMISSIONS = {
    'LOW': new Set([ROLES.STUDENT, ROLES.PC, ROLES.ADMIN]),
    'MED': new Set([ROLES.PC, ROLES.ADMIN]),
    'HIGH': new Set([ROLES.ADMIN])
}

function authUser(permission) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(403);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, account) => {
            if (err) return res.sendStatus(403);
            if (!permission.has(account.role)) return res.status(401).send("You do not have permissions");
            next();
        });
    }
}

module.exports = {
    authUser,
    PERMISSIONS,
};