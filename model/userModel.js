const utils = require("../commonFunction/utils")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require('sequelize');
var sequelize = require("../dbConnection/connection");

const UserModel = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    },
    userName: {
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    hooks: {
        beforeCreate: async function (User) {
            const result = await this.findOne({
                where: {
                    email: User.email
                }
            })
            if (result) {
                if (result.email == User.email) {
                    let err = new Error("email Already Exist.")
                    err.status = utils.Error_Code.AlreadyExist
                    throw err;
                }
            }
        }
    }
}, {
    freezeTableName: true,
});
UserModel.sync();

UserModel.Signup = async (body) => {
    try {
        const saltRounds = 10
        let hash = await bcrypt.hash(body.password, saltRounds)
        body.password = hash
        const User = await UserModel.create(body)
        return User;
    }
    catch (error) {
        throw error;
    }
},
    UserModel.LogIn = async (body, res) => {
        try {
            var fetch = await UserModel.findOne({
                where: {
                    email: body.email,
                },
            });
            if (fetch) {
                var plain = await bcrypt.compare(body.password, fetch.password);
                if (plain == true) {
                    var token = jwt.sign(
                        {
                            email: body.email,
                        },
                        "express",
                        {
                            expiresIn: 60 * 60,
                        }
                    );
                    return token;
                } else {
                    return false;
                }
            } else {
                let err = new Error("Email doesnot Exist.")
                err.status = utils.Error_Code.NotFound
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }
module.exports = UserModel;