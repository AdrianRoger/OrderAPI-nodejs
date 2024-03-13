const frameGuardMiddleware = (req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    next();
};

module.exports = frameGuardMiddleware;