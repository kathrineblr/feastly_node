const jwt = require('jsonwebtoken'); 
const shaToken = require('../middleware/token.json');

 const verifyToken = async (req, res, next) => {
    try {
                const token = req.headers.authorization.split(" ")[1];
	if (token == null){ 
	return res.status(401).send({
            msg: 'No token provided to access data from server.. please Login Again'
        });  

	}
    
        const decoded = jwt.verify(token,shaToken.token);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(403).send({
            msg: 'Authentication failed!! Login Again'
        });
    }
};


module.exports = verifyToken