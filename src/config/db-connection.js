const { Sequelize } = require('sequelize');

const sequelizeCon = new Sequelize('postgres://tzmdkmahvyvejp:ad2eaa82fffe4be14a12c30ed4341877cd000fbc7b7abf94810b326e76d8b62f@ec2-34-203-182-65.compute-1.amazonaws.com:5432/deucim9r33dr5q', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

module.exports = { sequelizeCon };