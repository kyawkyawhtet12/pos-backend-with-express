import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1]

    if(token === null){
        return res.send("PLEASE PROVIDE TOKEN")
    }

    jwt.verify(token, process.env.TOKEN_SECRET || qwerty, (err, data) => {
        if(err){
            return res.send(err)
        }else{
            next()
        }
    })
    
}
export default authenticate