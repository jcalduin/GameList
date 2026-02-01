var express = require('express');
var router = express.Router();

const Database = require('../database/Database');
const UsuarioDAO = require('../database/usuario-dao');

const db = Database.getInstance();
const usuarioDAO = new UsuarioDAO(db);

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    return res.redirect('/perfil');
  }
  res.render('index', { title: 'Express' });
});

/* GET register page. */
router.get('/registro', function(req, res, next) {
  res.render('registro');
});

/* POST register page */
router.post('/registro', function(req,res,next){

  const { nickname, email, password } = req.body;

  const usuarioExistente = usuarioDAO.buscarUsuarioPorEmail(email);

  if (usuarioExistente) {
    return  res.render('registro', { error: 'El usuario ya existe' });
  }

  usuarioDAO.agregarUsuario(nickname, email, password);

  res.redirect('/');

})

/* POST login page */
router.post('/login', function(req,res,next){

  const { email, password } = req.body;

  const usuario = usuarioDAO.buscarUsuarioPorEmail(email);

  if (!usuario) return res.render('index', { error: 'Usuario no encontrado' });
  
  if (usuario.password === password) {

    req.session.user = usuario;
    res.redirect('/perfil');

  } else res.render('index', { error: 'Contraseña incorrecta' })
  
})

/* GET logout page */
router.get('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/');
});

/*GET perfil page */
router.get('/perfil', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.render('perfil');
});

/*GET nuevo juego page */
router.get('/nuevo-juego', function(req, res, next) {
  res.render('nuevo-juego');
});

/*GET editar juego page */
router.get('/editar', function(req, res, next) {
  res.render('editar');
});

module.exports = router;
