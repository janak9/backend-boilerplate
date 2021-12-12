
module.exports = async function (req, res, next) {
    if (!req.user || !req.user.isVerified) {
        return res.status(403).json({ success: false, error: true, message: "Forbidden! Please verify OTP first" });
    }
    return next();
}
