const {DataTypes} = require('sequelize');

module.exports = (db_config) => {
    const user = db_config.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                default:null,
                // unique: {
                //     args: true,
                //     msg: 'Email address already in use!',
                // },

            },
            mobile: {
                type: DataTypes.BIGINT,
                allowNull: true,
                // unique: {
                //     args: true,
                //     msg: 'Mobile number already in use!',
                // }
            },
            password:{
                type: DataTypes.STRING,
                allowNull:false,
            }
        },
    );
    return user;
}