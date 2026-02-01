var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET register page. */
router.get('/registro', function(req, res, next) {
  res.render('registro');
});

/*GET perfil page */
router.get('/perfil', function(req, res, next) {
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
