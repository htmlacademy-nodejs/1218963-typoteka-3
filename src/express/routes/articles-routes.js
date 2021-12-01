'use strict';

const {Router} = require(`express`);
const upload = require(`../middlewares/upload`);

const auth = require(`../middlewares/auth`);

const articlesRoutes = new Router();
const api = require(`../api`).getAPI();
const {ensureArray, prepareErrors} = require(`../../utils`);

const getViewArticleData = ({id}) => {
  return api.getArticle(id);
};

const getEditArticlesData = async (articleId) => {
  const [article, categories] = await Promise.all([
    api.getArticle(articleId),
    api.getCategories()
  ]);
  return [article, categories];
};

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const {user} = req.session;

  const {id} = req.params;
  const [article, categories] = await getEditArticlesData(id);
  res.render(`articles/edit-post`, {id, article, categories, user});
});

articlesRoutes.post(`/edit/:id`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const {id} = req.params;
  const articleData = {
    picture: file ? file.filename : body[`old-image`],
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`post-name`],
    categories: ensureArray(body.category)
  };

  try {
    await api.editArticle(id, articleData);
    res.redirect(`/my`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    const [article, categories] = await getEditArticlesData(id);
    res.render(`articles/edit-post`, {id, article, categories, validationMessages});
  }
});

articlesRoutes.get(`/category/:id`, (req, res) => {
  const {user} = req.session;

  res.render(`articles-by-category`, {user});
});

articlesRoutes.post(`/:id/comments`, async (req, res) => {
  const {id} = req.params;
  const {comment} = req.body;
  try {
    await api.createComment(id, {text: comment});
    res.redirect(`/articles/${id}`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    const offer = await getViewArticleData(id, true);
    res.render(`articles`, {offer, id, validationMessages});
  }
});

articlesRoutes.get(`/add`, auth, async (req, res) => {
  const {user} = req.session;

  const categories = await api.getCategories();
  res.render(`new-post`, {categories, user});
});

articlesRoutes.get(`/edit/:id`, auth, async (req, res) => {
  const {user} = req.session;

  const {id} = req.params;
  const article = await api.getArticle(id);
  res.render(`edit-post`, {article, user});
});

articlesRoutes.get(`/:id`, async (req, res) => {
  const {user} = req.session;

  const {id} = req.params;
  const article = await getViewArticleData(id);
  res.render(`post`, {article, id, user});
});


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
        const validationMessages = prepareErrors(error);
        res.render(`articles/new-post`, {validationMessages, csrfToken: req.csrfToken()});
      }
    }
);

module.exports = articlesRoutes;

