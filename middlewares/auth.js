/**
 * Middleware para gestionar la autenticación de usuarios.
 * Verifica si el usuario está autenticado y establece variables locales
 * para las vistas en función del estado de autenticación.
 * @module middlewares/auth
*/

const auth = (req,res,next) => {

    if (req.session.user) {

        res.locals.isLoggedIn = true;
        res.locals.user = req.session.user;

    } else {

        res.locals.isLoggedIn = false;
        res.locals.user = null;

    }

    next();
}

module.exports = auth;