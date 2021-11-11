/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const DataService = require(`../data-service/article`);

const {
  HttpCode
} = require(`../constants`);

const mockData = [{
  "id": `w8jTa9`,
  "title": `Как достигнуть успеха не вставая с кресла`,
  "createdDate": `1/19/1970`,
  "announce": ` Достичь успеха помогут ежедневные повторения.   Это один из лучших рок-музыкантов.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. `,
  "fullText": ` Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.  Ёлки — это не просто красивое дерево. Это прочная древесина.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. `,
  "category": [
    `Программирование `
  ],
  "comments": [{
    "id": `QABhgp`,
    "text": `Хочу такую же футболку :-), Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`
  },
  {
    "id": `MI4j_W`,
    "text": `Совсем немного...,`
  },
  {
    "id": `BEelLX`,
    "text": `Мне кажется или я уже читал это где-то?, Хочу такую же футболку :-), Планируете записать видосик на эту тему?`
  }
  ]
},
{
  "id": `lI6_Aa`,
  "title": ` Учим HTML и CSS `,
  "createdDate": `1/19/1970`,
  "announce": ` Первая большая ёлка была установлена только в 1938 году.   Простые ежедневные упражнения помогут достичь успеха.   Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.  Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. `,
  "fullText": ` Это один из лучших рок-музыкантов.   Собрать камни бесконечности легко, если вы прирожденный герой.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. `,
  "category": [
    `Музыка `
  ],
  "comments": [{
    "id": `GizqtV`,
    "text": `Это где ж такие красоты?,`
  },
  {
    "id": `hTq8_l`,
    "text": `Согласен с автором!,`
  }
  ]
},
{
  "id": `gGPbNb`,
  "title": ` Борьба с прокрастинацией `,
  "createdDate": `1/19/1970`,
  "announce": ` Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.   Как начать действовать? Для начала просто соберитесь.   Вы можете достичь всего. Стоит только немного постараться и запастись книгами.   Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. `,
  "fullText": ` Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Собрать камни бесконечности легко, если вы прирожденный герой.   Первая большая ёлка была установлена только в 1938 году.  Ёлки — это не просто красивое дерево. Это прочная древесина. `,
  "category": [
    `Музыка `
  ],
  "comments": [{
    "id": `e2netS`,
    "text": `Плюсую, но слишком много буквы!, Совсем немного..., Согласен с автором!,`
  },
  {
    "id": `BZd81r`,
    "text": `Согласен с автором!, Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Совсем немного...,`
  },
  {
    "id": `4Zj0OB`,
    "text": `Совсем немного..., Это где ж такие красоты?, Мне кажется или я уже читал это где-то?,`
  },
  {
    "id": `Jz5vmC`,
    "text": `Плюсую, но слишком много буквы!, Планируете записать видосик на эту тему? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,`
  }
  ]
},
{
  "id": `UU_ZyL`,
  "title": ` Рок — это протест `,
  "createdDate": `1/19/1970`,
  "announce": ` Он написал больше 30 хитов.   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Достичь успеха помогут ежедневные повторения.   Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? `,
  "fullText": ` Достичь успеха помогут ежедневные повторения.   Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.   Золотое сечение — соотношение двух величин, гармоническая пропорция.   Как начать действовать? Для начала просто соберитесь. `,
  "category": [
    `За жизнь `
  ],
  "comments": [{
    "id": `XdEe6x`,
    "text": `Хочу такую же футболку :-), Это где ж такие красоты?,`
  },
  {
    "id": `mlFL9K`,
    "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили., Совсем немного...,`
  },
  {
    "id": `CAUI6e`,
    "text": `Планируете записать видосик на эту тему?`
  },
  {
    "id": `UrB7Kq`,
    "text": `Плюсую, но слишком много буквы!, Совсем немного..., Это где ж такие красоты?,`
  }
  ]
},
{
  "id": `ZQbvno`,
  "title": ` Обзор новейшего смартфона `,
  "createdDate": `1/19/1970`,
  "announce": ` Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?   Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.   Первая большая ёлка была установлена только в 1938 году.   Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. `,
  "fullText": ` Он написал больше 30 хитов.   Из под его пера вышло 8 платиновых альбомов.   Это один из лучших рок-музыкантов.   Простые ежедневные упражнения помогут достичь успеха. `,
  "category": [
    `IT `
  ],
  "comments": [{
    "id": `ouTQMx`,
    "text": `Планируете записать видосик на эту тему?`
  }]
}
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new DataService(cloneData));
  return app;
};

describe(`API returns a list of all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's id equals "w8jTa9"`, () => expect(response.body[0].id).toBe(`w8jTa9`));

});

describe(`API returns an article with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/w8jTa9`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`article's title is "Как достигнуть успеха не вставая с кресла"`, () => expect(response.body.title).toBe(`Как достигнуть успеха не вставая с кресла`));

});

describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    category: `Котики`,
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `cat.jpg`,
    createdDate: `article`,
    comments: `100500`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    category: `Котики`,
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `cat.jpg`,
    createdDate: `article`,
    comments: `100500`
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {
        ...newArticle
      };
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
  test(`When field type is wrong response code is 400`, async () => {
    const badArticles = [{
      ...newArticle,
      sum: true
    },
    {
      ...newArticle,
      picture: 12345
    },
    {
      ...newArticle,
      categories: `Котики`
    }
    ];
    for (const badArticle of badArticles) {
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

  test(`When field value is wrong response code is 400`, async () => {
    const badArticles = [{
      ...newArticle,
      sum: -1
    },
    {
      ...newArticle,
      title: `too short`
    },
    {
      ...newArticle,
      categories: []
    }
    ];
    for (const badArticle of badArticles) {
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    category: `Котики`,
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `cat.jpg`,
    createdDate: `article`,
    comments: `100500`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/w8jTa9`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`article is really changed`, () => request(app)
    .get(`/articles/w8jTa9`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validArticle = {
    category: `Котики`,
    title: `Дам погладить котика`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `cat.jpg`,
    createdDate: `article`,
    comments: `100500`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidArticle = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/w8jTa9`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`w8jTa9`));

  test(`article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(11))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

// COMMENTS

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/GxdTgz/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});
