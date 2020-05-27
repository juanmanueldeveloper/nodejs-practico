const statusMessage = {
    '200': 'Done',
    '201': 'Created',
    '204' : 'No Content',
    '400': 'Invalid Format',
    '500': 'Internal Error'
}

exports.success = (req, res, message, code) => {
    let statusCode = code || 200;
    let statusMessage = message;

    if(!message && message !== null){
        console.log(message)
        
        statusMessage = statusMessage[statusCode]
        console.log(statusMessage)
    }

    res.status(statusCode).send({
        'Result' : statusMessage || [],
        'Error': '',
        'SuccessfulOperation': true
    })
}

exports.error = (req, res, message, code, details) => {
    let statusCode = code || 500;
    let statusMessage = message;

    if(!message && message !== null){
        statusMessage = statusMessage[statusCode];
    }

    console.error(`[Response error]: ${details}`)
    res.status(statusCode).send({
        'Result' : [],
        'Error': statusMessage,
        'SuccessfulOperation': false
    })
}