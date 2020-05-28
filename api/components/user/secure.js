const jwt = require('../../../jwt')

module.exports = function checkAuth(action){
    const middleware = (req, res, next)=> {
        switch (action) {
            case 'update':
                jwt.check.own(req, req.body.id)
                next()
                break;
            
            case 'follow':
                jwt.check.logged(req)
                next()
                break;

            default:
                next();
        }
    }

    return middleware
}