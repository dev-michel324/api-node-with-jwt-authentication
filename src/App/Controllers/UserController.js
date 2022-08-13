const { json } = require("express");
const Users = require("./../models/Users");

const validators = require("./../../validators/validator");

const bcrypt = require("bcryptjs");
const { validateDataToUpdateUser } = require("./../../validators/validator");

class UserController{

    async store(req, res){
        if(! await validators.validateUserData(req.body)){
            return res.status(400).json({
                error: true,
                message: "Dados invalidos"
            })
        }

        const userExist = await Users.findOne({where: {username: req.body.username}});
        if(!(userExist === null)){
            res.status(400).json({
                error: true,
                message: "Usuario ja existe"
            })
        };

        const { username, firstname, lastname, password } = req.body;

        const data = { username, firstname, lastname, password };

        data.password = await bcrypt.hash(data.password, 8);

        Users.create({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            password: data.password
        }).then(() => {
            return res.status(200).json({
                error: false,
                message: "Usuario cadastrado com sucesso"
            })
        }).catch(err => {
            return res.status(400).json({
                error: true,
                message: "Erro ao inserir usuario no banco de dados"
            })
        })
    }

    async show(req, res){
        const id = parseInt(req.user_id);

        const user = await Users.findOne({where: {id}, attributes: {exclude: ['password', 'createdAt', 'updatedAt']}});

        if(!(user === null)){
            res.status(200).json({
                error: false,
                user: user.dataValues
            })
        }else{
            res.status(400).json({
                error: true,
                message: "Usuário não existe"
            })
        }
    }
}

module.exports = new UserController();