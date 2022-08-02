const { sequelizeCon } = require("../config/db-connection");

/*
Post.belongsTo(User);
User.hasMany(Post);*/

const { Usuario } = require("./Usuario");
const { Empresa } = require("./Empresa");
const { Convite } = require("./Convite");
const { Evento } = require("./Evento");
const { Time } = require("./Time");
const { UsuarioTime } = require("./UsuarioTime");

Usuario.hasMany(Time);
Usuario.hasMany(Convite);
Usuario.hasMany(Evento);
Usuario.hasMany(UsuarioTime);

Time.belongsTo(Usuario);
Time.belongsTo(Empresa);
Time.hasMany(Convite);
Time.hasMany(Evento);
Time.hasMany(UsuarioTime);

Empresa.hasMany(Time);

Convite.belongsTo(Time);
Convite.belongsTo(Usuario);

Evento.belongsTo(Usuario);
Evento.belongsTo(Time);

UsuarioTime.belongsTo(Usuario);
UsuarioTime.belongsTo(Time);

sequelizeCon.sync();