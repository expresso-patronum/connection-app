const express = require('express');
const app  = express();

const session = require('express-session');
app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false, // NAO SOBRESCREVER CASO NAO HAJA MODIFICAÇÕES,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// PARSER DOS FORMULÁRIOS
app.use(express.urlencoded({
    extended: true,
}));

app.get("/", (req, res) => {
    return res.render('usuario/cadastro', { usuario: req.session.usuario })
  });
  

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('public'));

const usuarioRoutes = require('./routes/usuario-routes');
app.use('/usuarios', usuarioRoutes);

const timesRoutes = require('./routes/times-routes');
app.use('/times', timesRoutes);

const empresasRoutes = require('./routes/empresas-routes');
app.use('/empresas', empresasRoutes);

const dbcon = require('./config/db-connection');

app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>Este endereço não existe.</h1>
        <a href="/">Voltar</a>
    `);
})
app.listen(3000, () => {
    console.log('Listening at 3000');
})
Footer
