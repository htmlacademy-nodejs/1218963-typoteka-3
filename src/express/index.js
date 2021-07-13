'use strict';

const express = require(`express`);
const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;

const app = express();
const path = require(`path`);
const PUBLIC_DIR = `public`;

app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(__dirname, `templates`));
