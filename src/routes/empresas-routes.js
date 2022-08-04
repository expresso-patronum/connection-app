const { Router } = require('express');
const EmpresaController = require('../controllers/empresas-controller');
const { isAuth } = require('../middlewares/is-auth');
const { upload } = require('../config/multer-config');

const routes = Router();

const empresaController = new EmpresaController();

routes.get('/opcoes',  isAuth, empresaController.mostraOpcoesParaEmpresas);

routes.get('/cadastro',  isAuth, empresaController.mostraCadastro);

routes.get('/usuario',  isAuth, empresaController.mostraEmpresas);

routes.get('/:id/empresaTime', isAuth, empresaController.empresaTime);

routes.post('/cadastrar', isAuth, empresaController.cadastrar);

module.exports = routes;