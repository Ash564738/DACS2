const jwt = require('jsonwebtoken');
const User = require('../Modals/user');
const auth = async (req, res, next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log("Token from cookies:", token);
    if(!token){
        return res.status(401).json({ error: 'No token, authorization denied' });
    }else{
        try{
            const decode = jwt.verify(token, "Its_My_Secret_Key");
            req.user = { userId: decode.userId };
            // console.log("Authenticated user ID:", req.user.userId);
            next();
        }catch(err){
            res.status(401).json({ error: 'Token is not valid' });
        }
    }
}
module.exports = auth;