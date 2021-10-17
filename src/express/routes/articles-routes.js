'use strict';

const {Router} = require(`express`);
const upload = require(`../middlewares/upload`);

const articlesRoutes = new Router();
const api = require(`../api`).getAPI();
const {ensureArray} = require(`../../utils`);

articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));

articlesRoutes.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`new-post`, {categories});
});

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);
  res.render(`edit-post`, {article});
});

articlesRoutes.get(`/:id`, (req, res) => res.render(`post`));

articlesRoutes.post(`/add`,
    upload.single(`upload`),
    async (req, res) => {
      const {body, file} = req;
      const articleData = {
        picture: file ? file.filename : ``,
        createdDate: body.date,
        title: body.title,
        announce: body.announcement,
        fullText: body[`full-text`],
        category: ensureArray(body.category),
        comments: []
      };

      try {
        await api.createArticle(articleData);
        res.redirect(`/my`);
      } catch (error) {
        res.redirect(`back`);
      }
    }
);

module.exports = articlesRoutes;

