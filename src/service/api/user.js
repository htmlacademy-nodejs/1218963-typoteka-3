'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../constants`);

const userValidator = require(`../middlewares/user-validator`);

const passwordUtils = require(`../lib/password`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/user`, route);

  route.get(`/`, async (req, res) => {
    const users = await service.findAll();
    res.status(HttpCode.OK)
      .json(users);
  });

  route.post(`/`, userValidator(service), async (req, res) => {
    const data = req.body;

    data.passwordHash = await passwordUtils.hash(data.password_hash);

    const result = await service.create(data);

    delete result.passwordHash;

    res.status(HttpCode.CREATED)
      .json(result);
  });
};
