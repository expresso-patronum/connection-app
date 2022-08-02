const bcrypt = require('bcrypt');
const { Usuario } = require('../models/Usuario');

class UsuarioController {
    async detalhar(req, res) {
        const usuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        })

       return res.render('usuario/perfil', { usuario })
    }

    async mostraCadastro(req, res) {
        return res.render('usuario/cadastro');
    }

    async mostraLogin(req, res) {
        return res.render('usuario/login');
    }

    async cadastrar(req, res) {

        const email = req.body.email;
        const usuarioEncontrado = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!usuarioEncontrado) {
        const userBody = req.body;
        const senha = bcrypt.hashSync(userBody.senha, 10);
        
        const usuario = {
            nome: userBody.nome,
            email: userBody.email,
            imagem: req.file.filename,
            senha      
        }

        await Usuario.create(usuario);
        req.session.usuario = usuario;
        res.redirect('/listagem');

    } else {
        res.send('E-mail já cadastrado!');
    }
}

    async login(req, res) {
        console.log('UsersController/login', req.body);
        const { email, senha } = req.body;
        const usuarioEncontrado = await Usuario.findOne({
            where: {
                email
            }
        });

        if (!usuarioEncontrado) return res.send('Usuário não encontrado!');

        const confere = bcrypt.compareSync(senha, usuarioEncontrado.senha);
        
        if (confere) {
            req.session.usuario = usuarioEncontrado;
            return res.redirect('/times/cadastro');
        } else {
            return res.send('Senha não confere...');
        }
        
    }
}

module.exports = UsuarioController;