// Import the necessary dependencies
const http = require('http');
const PORT = 3000; // Set the port at which the server will run

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  // Set the response headers
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/products') {
    // Get all products
    const products = productsService.getProducts();
    res.statusCode = 200;
    res.end(JSON.stringify(products));
  } else if (req.method === 'GET' && req.url.startsWith('/product/')) {
    // Get a product with specified id
    const productId = parseInt(req.url.split('/').pop());
    const product = await productsService.getProductsById(productId);
    if (product) {
      res.statusCode = 200;
      res.end(JSON.stringify(product));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Product not found' }));
    }
  } else if (req.method === 'POST' && req.url === '/products') {
    // Create a new product
    try {
      const newProduct = await getRequestData(req);
      const updatedProducts = await productsService.saveProduct(newProduct);
      res.statusCode = 201;
      res.end(JSON.stringify(updatedProducts));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    }
  } else if (req.method === 'PUT' && req.url.startsWith('/product/')) {
    // Update a specific product
    const productId = parseInt(req.url.split('/').pop());
    try {
      const updateData = await getRequestData(req);
      const updatedProducts = await productsService.updateProduct(productId, updateData);
      res.statusCode = 200;
      res.end(JSON.stringify(updatedProducts));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    }
  } else if (req.method === 'DELETE' && req.url.startsWith('/product/')) {
    // Delete a specific Product
    const productId = parseInt(req.url.split('/').pop());
    const deletedProduct = await productsService.deleteProduct(productId);
    if (deletedProduct) {
      res.statusCode = 200;
      res.end(JSON.stringify(deletedProduct));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Product not found' }));
    }
  } else {
    // If the requested route is not found
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
