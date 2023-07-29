// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;

const getProducts = () => {
  // get all products
  return productsList;
}

const getProductsById = (productId, done) => {
  let product = productsList.find((p) => p.id === productId);

  if (product) {
    return done(null, JSON.stringify(product));
  } else {
    return done("Product not found", null);
  }
}

const saveProduct = (newProduct, done) => {
  // save a product
  newProduct.id = Date.now(); // Assign a unique ID to the new product
  productsList.push(newProduct);
  return done(null, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
  let productIndex = productsList.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    productsList[productIndex] = { ...productsList[productIndex], ...updateData };
    return done(null, JSON.stringify(productsList));
  } else {
    return done("Product not found", null);
  }
}

const deleteProduct = (productId, done) => {
  let productIndex = productsList.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    const deletedProduct = productsList.splice(productIndex, 1);
    return done(null, JSON.stringify(deletedProduct));
  } else {
    return done("Product not found", null);
  }
}

module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}
