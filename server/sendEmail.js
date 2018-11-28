var sendGrid = require('@sendgrid/mail')

sendGrid.setApiKey(`${process.env.SENDGRID_TOKEN}`)

module.exports = (req, res, next) => {
    var message = {
        to: req.body.toEmail,
        from: req.body.emailFrom,
        cc: req.body.ccEmail,
        text: req.body.message,
        subject: 'Test'
    }
    sendGrid.send(message, (err, response) => {
        if (err) {
            res.status(400).json(err)
        } else {
            next()
        }
    })
}