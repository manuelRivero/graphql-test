const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    
    const authHeader = req.get('Authorization');
    console.log(authHeader)
    if(!authHeader){
        console.log("err1")
        req.isAuth = false;
        return next();

    }
    const token = authHeader.split(" ")[1];
    console.log(token)
    if(!token || token === " "){
        req.isAuth = false;
        console.log("err2")

        return next();
        console.log("err")

    }
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, "secretkey?");
    } catch (error) {
        console.log("err3")
        req.isAuth = false;
        return next();
    }

    if(!decodeToken){
        console.log("err4")

        req.isAuth = false;
        return next();

    }

    req.isAuth=true;
    req.userId = decodeToken.userId;
    return next()
}