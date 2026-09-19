// store.js
// Our "database" - an array of product objects kept in memory.
// Each product tracks:
//   ratingCount -> how many ratings it has received
//   ratingTotal -> sum of all ratings received (used to recompute the average)
//   average     -> ratingTotal / ratingCount, kept up to date after every rating

const products = [
  { id: 1, name: "Wireless Mouse", ratingCount: 0, ratingTotal: 0, average: 0 },
  { id: 2, name: "Mechanical Keyboard", ratingCount: 0, ratingTotal: 0, average: 0 },
  { id: 3, name: "USB-C Hub", ratingCount: 0, ratingTotal: 0, average: 0 }
];

module.exports = { products };
