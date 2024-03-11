const jwt = require('jsonwebtoken');

// this is a middleware function that check if a valid JWT has been provided
// a middleware function has three arguments: req, res, next
function authenticateWithJWT() {
    const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];

            // first argument: the token that I want to verify
            // second argument: the token secret
            // third argument: callback function
            jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
                if (err) {
                    res.status(400);
                    return res.json({
                        "error": err
                    })
                } else {
                    // the JWT is valid, forward request to the route
                    req.payload = payload;
                    // call the next function in /profile
                    next();
                }
            })
        } else {
            res.status(400);
            res.json({
                "error": "login required to access the protected route"
            })
        }
}


module.exports = { authenticateWithJWT }