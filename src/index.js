const express = require('express');
const app  = express();

const setup = require('./models/orm-setup');

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
    return res.render('usuario/login')
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

app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>Sorry, not found!!!</h1>
        <a href="/">VOLTAR</a>
    `);
})
app.listen(3000, () => {
    console.log('Listening at 3000');
})