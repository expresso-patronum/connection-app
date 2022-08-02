const { Empresa } = require('../models/Empresa');
const { Usuario } = require('../models/Usuario');

class EmpresaController {
    async empresas(req, res){
      res.render('empresas')
    }

    async empresasPorUsuario(req, res){
   
    }
    async cadastrar(req, res) {
        const empresa = await Empresa.create({
            nome: req.body.nome
        });

        res.redirect('/empresas');
    }

  /*  async listar(req, res) {    
        const times = await Time.findAll();
        return res.render('times/listagem', { times });
    }*/

    async mostraCadastro(req, res) {
        const usuarios = (await Usuario.findAll()).filter(function (usuario) {
            return usuario.id !== req.session.usuario.id;
        });
        return res.render('empresas/cadastro', { usuarios });
    }
}

module.exports = EmpresaController;