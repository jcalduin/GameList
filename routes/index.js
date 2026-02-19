/**
 * Enrutador principal de la aplicación.
 * Maneja las rutas para el registro, inicio de sesión,
 * perfil de usuario, y gestión de juegos.
*/ 

// Importar módulos necesarios
var express = require('express');
var router = express.Router();

// Importar DAOs y base de datos
const Database = require('../database/database');
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
    return res.status(400).json({ mensaje: 'El usuario ya existe con ese correo electrónico.' });
  }

  usuarioDAO.agregarUsuario(nickname, email, password);

  res.status(200).json({ mensaje: 'Cuenta creada con éxito. ¡Bienvenido!' });;

})

/* POST para controlar login, este se controla a traves del modal*/
router.post('/login', function(req,res,next){

  const { email, password } = req.body;

  const usuario = usuarioDAO.buscarUsuarioPorEmail(email);

  if (!usuario) return res.status(400).json({ mensaje: 'No existe una cuenta con ese correo electrónico.' });
  
  if (usuario.password === password) {

    req.session.user = usuario;
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso.' });

  } else res.status(400).json({ mensaje: 'Contraseña incorrecta' })
  
})

/* GET página de cierre de sesión */
router.get('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/');
});

// ------------ PÁGINAS PRIVADAS, requieren autenticación ------------ //

/* GET página de perfil */
router.get('/perfil', function(req, res) { // ahora solo entregamo la estructura html, los juegos se cargan con JS para mantener filtros aplicados
  if (!req.session.user) {
    return res.redirect('/');
  }

  res.render('perfil', { user: req.session.user });
});

/* API GET para obtener los juegos del usuario */
router.get('/api/juegos', function(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ mensaje : 'No autorizado' });
  }

  try {

    const filtros = req.query; // obtener filtros de la consulta
    const juegos = juegosDAO.filtrarJuegos(req.session.user.id, filtros); // obtener juegos filtrados del usuario
    res.json(juegos);

  } catch (error) {

    console.error('Error al obtener juegos:', error);
    res.status(500).json({ mensaje : 'Error al obtener los datos de la colección' });

  }

})

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
    return res.status(401).json({
      mensaje: 'Sesión expirada. Por favor, inicia sesión de nuevo.'
    });
  }

  try {

    const { titulo, plataforma, genero, estado, imagen } = req.body; // obtener datos del formulario

    juegosDAO.agregarJuego(titulo, plataforma, genero, estado, imagen, req.session.user.id);

    res.json({
      mensaje: 'Juego añadido correctamente'
    });

  } catch (error) {
    console.error('Error al añadir juego:', error);
    res.status(500).json({
      mensaje: 'Error al añadir el juego'
    });
  }

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
    return res.status(401).json({
      mensaje : 'No autorizado'
    })
  }

  try {

    const juegoId = req.params.id; //parametro pasado en la URL
    juegosDAO.eliminarJuegoPorId(juegoId);

    res.json({
      mensaje : 'Juego eliminado correctamente'
    });

  } catch (error) {

    console.error('Error al eliminar juego:', error);
    res.status(500).json({
      mensaje : 'Error al eliminar el juego'
    });

  }

});

/* POST editar juego */
router.post('/editar/:id', function(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({
      mensaje : 'No autorizado'
    })
  }

  try {

    const juegoId = req.params.id;

    const { titulo, plataforma, genero, estado, imagen } = req.body; // obtener datos del formulario
    juegosDAO.editarJuego(juegoId, titulo, plataforma, genero, estado, imagen);

    res.json({
      mensaje : 'Juego actualizado correctamente'
    });

  } catch (error) {

    console.error('Error al actualizar juego:', error);
    res.status(500).json({
      mensaje : 'Error al actualizar el juego'
    });
  }
  
});


module.exports = router;