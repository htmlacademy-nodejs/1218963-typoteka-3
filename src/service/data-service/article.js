// 'use strict';

// const {
//   MAX_ID_LENGTH
// } = require(`../constants`);

// const {nanoid} = require(`nanoid`);


// // eslint-disable-next-line no-unused-vars
// class OfferService {
//   constructor(offers) {
//     this._offers = offers;
//   }

//   create(offer) {
//     const newOffer = Object
//       .assign({
//         id: nanoid(MAX_ID_LENGTH),
//         comments: []
//       }, offer);

//     this._offers.push(newOffer);
//     return newOffer;
//   }

//   drop(id) {
//     const offer = this._offers.find((item) => item.id === id);

//     if (!offer) {
//       return null;
//     }

//     this._offers = this._offers.filter((item) => item.id !== id);
//     return offer;
//   }

//   findAll() {
//     return this._offers;
//   }

//   findOne(id) {
//     return this._offers.find((item) => item.id === id);
//   }

//   update(id, offer) {
//     const oldOffer = this._offers
//       .find((item) => item.id === id);

//     return Object.assign(oldOffer, offer);
//   }

// }
