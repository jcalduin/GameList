/**
 * Enrutador principal de la aplicación.
 * Maneja las rutas para el registro, inicio de sesión,
 * perfil de usuario, y gestión de juegos.
*/ 

// Importar módulos necesarios
var express = require('express');
var router = express.Router();

// Importar DAOs y base de datos
const Database = require('../database/Database');
const UsuarioDAO = require('../database/usuario-dao');
const JuegosDAO = require('../database/juegos-dao');

// Crear instancias de DAOs, que usarán la misma instancia de la base de datos
const db = Database.getInstance();
const usuarioDAO = new UsuarioDAO(db);
const juegosDAO = new JuegosDAO(db);

// ------------ PÁGINAS PUBLICAS, accesibles sin autenticación ------------ //

/* GET página principal */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    return res.redirect('/perfil');
  }
  res.render('index', { title: 'Express' });
});

/* GET página de registro */
router.get('/registro', function(req, res, next) {
  res.render('registro');
});

/* POST para controlar registro */
router.post('/registro', function(req,res,next){

  const { nickname, email, password } = req.body;

  const usuarioExistente = usuarioDAO.buscarUsuarioPorEmail(email);

  if (usuarioExistente) {
    return  res.render('registro', { error: 'El usuario ya existe' ,});
  }

  usuarioDAO.agregarUsuario(nickname, email, password);

  res.redirect('/');

})

/* POST para controlar login, este se controla a traves del modal*/
router.post('/login', function(req,res,next){

  const { email, password } = req.body;

  const usuario = usuarioDAO.buscarUsuarioPorEmail(email);

  if (!usuario) return res.render('index', { error: 'Usuario no encontrado' });
  
  if (usuario.password === password) {

    req.session.user = usuario;
    res.redirect('/perfil');

  } else res.render('index', { error: 'Contraseña incorrecta' })
  
})

/* GET página de cierre de sesión */
router.get('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/');
});

// ------------ PÁGINAS PRIVADAS, requieren autenticación ------------ //

/* GET página de perfil */
router.get('/perfil', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }

  // Obtener filtros de la consulta, si existen
  const filtros = req.query
  const juegos = juegosDAO.filtrarJuegos(req.session.user.id, filtros);

  res.render('perfil', { juegos, user: req.session.user, filtros });
});

/* GET página de nuevo juego */
router.get('/nuevo-juego', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.render('nuevo-juego');
});

/* POST página de nuevo juego */
router.post('/nuevo-juego', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }

  const { titulo, plataforma, genero, estado, imagen } = req.body;// obtener datos del formulario
  juegosDAO.agregarJuego(titulo, plataforma, genero, estado, imagen, req.session.user.id);
  res.redirect('/perfil');
});

/* GET página de editar juego */
router.get('/editar', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }
  const juegoId = req.query.id; //parametro pasado en la URL
  const juego = juegosDAO.buscarJuegoPorId(juegoId);
  const urlOrigen = req.headers.referer || '/perfil'; // obtner url anterior para mantener filtros aplicados

  res.render('editar', { juego, urlOrigen });
});

/* POST para eliminar juego */
router.post('/eliminar/:id', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }

  const juegoId = req.params.id;
  juegosDAO.eliminarJuegoPorId(juegoId);

  res.redirect('back'); // Redirige a la página anterior asi conservo los filtros aplicados
});

/* POST editar juego */
router.post('/editar/:id', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/');
  }
  const juegoId = req.params.id; //parametro pasado en la URL
  const { titulo, plataforma, genero, estado, imagen, urlOrigen } = req.body;
  juegosDAO.editarJuego(juegoId, titulo, plataforma, genero, estado, imagen);

  res.redirect(urlOrigen || '/perfil'); // si no hay url de origen, redirijo a perfil
});


module.exports = router;