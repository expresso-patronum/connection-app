const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-connection');

class Convite extends Model { }


Convite.init({
}, {
    sequelize: sequelizeCon,
    schema: 'public',
    modelName: 'convite',
    createdAt: 'created_at',
    updatedAt: false,
    timestamps: true
}, true);

module.exports = { Convite };