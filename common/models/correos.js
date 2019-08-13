'use strict';

module.exports = function (Correos) {
    Correos.sendEmail = (message, subject, emailAddresses, cb) => {
        Correos.app.models.Email.send({
            to: emailAddresses,
            from: "Página de revista",
            subject: subject,
            text: message,
            html: message
        }, function (err, mail) {
            console.log("email sended!!!");
            if (err) return err;
        });
        cb(null, 'message sent: ' + message);
    }


    Correos.remoteMethod('sendEmail',
        {
            http: {
                path: '/sendEmail', verb: 'post'
            },
            description: [
                "Api to send email messages."
            ],
            accepts: [
                {
                    arg: 'message',
                    type: 'string',
                    required: true
                },
                {
                    arg: 'subject',
                    type: 'string',
                    required: true
                },
                {
                    arg: 'emailAddresses',
                    type: 'string',
                    required: true
                }
            ],
            returns: { arg: 'reponse', type: 'string' }
        });
};
