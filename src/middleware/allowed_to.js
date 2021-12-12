const allowedTo = (roles) => {
    return async function (req, res, next) {
        if (!roles || !roles.length || !req.user.userType || !roles.includes(req.user.userType)) {
            return res.status(403).json({ success: false, error: true, message: "forbidden" });
        }
        return next();
    }
}
export default allowedTo;
