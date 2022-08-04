const { compareSync } = require('bcrypt');
const { Usuario, UsuarioDAO } = require('../models/Usuario');

class UsuariosController {

    async cadastrar(req, res) {
        const { nome, email, senha } = req.body;
        let imagem = req.file.filename;
 
        const usuarioEncontrado = await UsuarioDAO.buscaPeloEmail(email);

        if (usuarioEncontrado) {
            return res.render('erro', { erro: 'E-mail em uso' });
        } else {

        const usuario = new Usuario(null, nome, email, senha, imagem);
        await UsuarioDAO.cadastrar(usuario);

        req.session.usuario = usuario;
        return res.redirect('/empresas/opcoes');
        }
    }


    async login(req, res) {
        const { email, senha } = req.body;
        try {
            const usuario = await UsuarioDAO.buscaPeloEmail(email);
            if (usuario) {
                const senhaCrypt = usuario.senha;
                const confere = compareSync(senha, senhaCrypt);
                if (confere) {
                    req.session.usuario = usuario;
                    return res.redirect('/empresas/opcoes');
                }
                else return res.render('erro', { erro: 'Senha errada' } );
            }
            else return res.render('erro', { erro: 'Usuário não existe' } );
        } 
        catch (error) {
            return res.render('erro', { erro: 'Algum erro' } );
        } 
    }

    async mostraLogin(req, res) {
        return res.render('usuario/login', { usuario: req.session.usuario });
    }

    async mostraCadastro(req, res) {
        return res.render('usuario/cadastro', { usuario: req.session.usuario });
    }

    async logout(req, res) {
        req.session.destroy();
        return res.redirect('/');
    }

    async notificacoes(req, res) {
     const email =req.session.usuario
     const notificacoes = await UsuarioDAO.buscaNotificacoes(email);
     return res.render('usuario/notificacoes', { usuario: req.session.usuario, notificacoes });
    }

    async aceitarNotificacao(req,res){
        const id = req.body.id;
        const email = req.session.usuario.email;
        const notificacoesParaAceitar = await UsuarioDAO.aceitarNotificacao(id, email);
        const notificacoes = await UsuarioDAO.buscaNotificacoes(email);
     return res.render('usuario/notificacoes', { usuario: req.session.usuario, notificacoes });
    }

    async negarNotificacao(req,res){
        const id = req.body.id;
        const email = req.session.usuario.email;
        const notificacoesParaNegar = await UsuarioDAO.negarNotificacao(id, email);
        const notificacoes = await UsuarioDAO.buscaNotificacoes(email);
        return res.render('usuario/notificacoes', { usuario: req.session.usuario, notificacoes });
    }
}


module.exports = UsuariosController;