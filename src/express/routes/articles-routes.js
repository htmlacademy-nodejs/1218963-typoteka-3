'use strict';

const {Router} = require(`express`);
const upload = require(`../middlewares/upload`);
// const {ensureArray} = require(`../../utils`);

const articlesRoutes = new Router();
const api = require(`../api`).getAPI();

articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));
articlesRoutes.get(`/add`, (req, res) => res.render(`new-post`));

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);
  res.render(`edit-post`, {article});
});

articlesRoutes.get(`/:id`, (req, res) => res.render(`post`));

articlesRoutes.post(`/add`,
    upload.single(`avatar`),
    async (req, res) => {
      const {body, file} = req;
      const articleData = {
        picture: file ? file.filename : ``,
        title: body[`ticket-name`],
        // category: ensureArray(body.category),
      };

      try {
        await api.createArticle(`/articles`, articleData);
        res.redirect(`/my`);
      } catch (error) {
        res.redirect(`back`);
      }
    }
);

module.exports = articlesRoutes;

