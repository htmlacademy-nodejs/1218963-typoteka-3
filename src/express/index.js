'use strict';

const express = require(`express`);
const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;

const app = express();
const path = require(`path`);
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;

app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);


app.listen(DEFAULT_PORT);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(__dirname, `templates`));

app.use(function (req, res) {
  res.status(400);
  res.render(`errors/404`);
});

app.use(function (req, res) {
  res.status(500);
  res.render(`errors/500`);
});
