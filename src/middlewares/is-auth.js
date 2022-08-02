const isAuth = (req, res, next) => {
    if (req.session.usuario) return next();
    return res.status(403).send('Você não está logado!');
}

module.exports = { isAuth };