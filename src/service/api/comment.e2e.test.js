/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

// const express = require(`express`);
// const request = require(`supertest`);

const comment = require(`./comment`);
const DataService = require(`../data-service/comment`);

const {HttpCode} = require(`../constants`);

const mockData = [{
  "id": `w8jTa9`,
  "title": ` Как достигнуть успеха не вставая с кресла `,
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

// const app = express();
// app.use(express.json());
comment(app, new DataService(mockData));

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  comment(app, new DataService(cloneData), new DataService());
  return app;
};

describe(`API returns a list of comments to given offer`, () => {

  let response;

  beforeAll(async () => {
    const app = await createAPI();
    response = await request(app)
        .get(`/articles/2/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 comments`, () => expect(response.body.length).toBe(3));

  test(`First comment's text is "Почему в таком ужасном состоянии?"`,
      () => expect(response.body[0].text).toBe(`Почему в таком ужасном состоянии?`));

});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этих полей`,
    userId: 1
  };

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
        .post(`/articles/3/comments`)
        .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Comments count is changed`, () => request(app)
      .get(`/articles/3/comments`)
      .expect((res) => expect(res.body.length).toBe(5))
  );

});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {

  const app = await createAPI();

  return request(app)
      .post(`/articles/20/comments`)
      .send({
        text: `Неважно`
      })
      .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, async () => {

  const invalidComment = {
    text: `Не указан userId`
  };

  const app = await createAPI();

  return request(app)
      .post(`/articles/2/comments`)
      .send(invalidComment)
      .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  let app; let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app)
        .delete(`/articles/1/comments/1`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Comments count is 3 now`, () => request(app)
      .get(`/articles/1/comments`)
      .expect((res) => expect(res.body.length).toBe(3))
  );

});

test(`API refuses to delete non-existent comment`, async () => {

  const app = await createAPI();

  return request(app)
      .delete(`/articles/4/comments/100`)
      .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent offer`, async () => {

  const app = await createAPI();

  return request(app)
      .delete(`/articles/20/comments/1`)
      .expect(HttpCode.NOT_FOUND);

});
