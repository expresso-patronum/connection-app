const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-connection');

class Evento extends Model { }

Evento.init({
    datahora: DataTypes.DATE,
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'evento',
    createdAt: false,
    timestamps: true
}, true);

module.exports = { Evento };