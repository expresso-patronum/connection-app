const { Time } = require('../models/Time');
const { Usuario } = require('../models/Usuario');

class TimeController {
    
    async cadastrar(req, res) {
        const time = await Time.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            id_adm: req.session.usuario.id,
            id_empresa: req.body.empresa
        });

        res.redirect('/times');
    }

  /*  async listar(req, res) {    
        const times = await Time.findAll();
        return res.render('times/listagem', { times });
    }*/

    async mostraCadastro(req, res) {
        const usuarios = (await Usuario.findAll()).filter(function (usuario) {
            return usuario.id !== req.session.usuario.id;
        });
        return res.render('times/cadastro', { usuarios });
    }
}

module.exports = TimeController;