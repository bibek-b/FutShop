const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;

    if(!token) return res.status(401).json({error: "No token!"});
    try {
        const decoded =  jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.userId;

        next();
    } catch (error) {
        return res.status(403).json({error: "Invalid or expired token!"});
    }
}

export default authMiddleware;