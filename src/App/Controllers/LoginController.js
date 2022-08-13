const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const formValidator = require("../../validators/validator");

const jwtConfig = require("../../config/auth");

class LoginController{
    async index(req, res){

        console.log(req.body);

        if(! await formValidator.validateUsernameAndPassword(req.body)){
            return res.status(400).json({
                error: true,
                message: "Existem dados vazios"
            });
        }

        const { username, password } = req.body;

        const userExist = await User.findOne({where: {username: username}});

        if (userExist === null){
            return res.status(400).json({
                error: true,
                message: "Usuário não existe ou senha inválida"
            });
        }

        if(!(await bcrypt.compare(password, userExist.password))){
            res.status(400).json({
                error: true,
                message: 'Usuário não existe ou senha inválida'
            });
        }

        return res.status(200).json({
            user: {
                username: userExist.username,
                firstname: userExist.firstname
            },
            token: jwt.sign(
                {id: userExist.id},
                jwtConfig.secret,
                {expiresIn: jwtConfig.expireIn}
            )
        });
    }
}

module.exports = new LoginController();