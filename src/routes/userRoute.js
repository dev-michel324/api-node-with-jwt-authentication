const { Router } = require("express");

const UserController = require("../App/Controllers/UserController");
const LoginController = require("./../App/Controllers/LoginController");
const AuthMidleware = require("./../App/Middlewares/AuthMidleware");

const routes = new Router();

routes.get('/user', AuthMidleware, UserController.show);
routes.post('/user', UserController.store);

routes.post('/login', LoginController.index);

module.exports = routes;