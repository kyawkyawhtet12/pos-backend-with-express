import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    const auth = authHeader.replace('Bearer ', '');
    const token = auth.toString();

    jwt.verify(token, process.env.TOKEN_SECRET || "qwerty", (err, data) => {
        if (err) {
            return res.status(401).send({ error: 'Invalid token' });
        } else {
            next();
        }
    });
}

export default authenticate;
