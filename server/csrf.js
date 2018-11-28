const csrf = require('csrf');

var Token = new csrf();
var token, secret;

var getToken = (req, res, next) => {

    Token.secret((err, sec) => {
        if (err) {
            console.log(err)            
        }
        secret = sec
        token = Token.create(secret);
        res.locals.token = token
        next()
    });
}

var validateToken = (req, res, next) => {
    let csrfToken = req.body.csrf || req.query.csrf
    if (Token.verify(secret, csrfToken)) {
        next()
    } else {
        res.status(403).json({
            'Error': "Invalid Token",
            "Message": "This Page has CSRF protection. Please refresh this page to retreive a new token."
        })
    }
}

module.exports = {
    getToken,
    validateToken
}