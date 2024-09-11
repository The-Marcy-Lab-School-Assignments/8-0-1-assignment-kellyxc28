/** FEEDBACK: Great job! Love your creativity! */

// found my own dog json file to use 
// credit: https://gist.github.com/kastriotadili/acc722c9858189440d964db976303078 
const dogBreedsData = require('./dog-breeds-data.json');
// console.log(dogBreedsData);

// express and path are imported 
const express = require('express');
const path = require('path');

// using an absolute path in .join() 
const pathToDistFolder = path.join(__dirname, '../vite-project/dist');
// console.log(pathToDistFolder);

const app = express();


// CONTROLLERS
// logRoutes middleware
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  // since this is an Obj, diff properties can be accessed 
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  // afterwards, move onto the next controller 
  next(); // passes the request to the next middleware/controller
};

// serveStaticAssets middleware
const serveStaticAssets = express.static(pathToDistFolder);

// "Response" controllers send data to the client
const serveData = (req, res, next) => res.send(dogBreedsData);


// ROUTES 
// using middlewares 
app.use(logRoutes);
// if this was put underneath the .get()s, then the .get()s will get ignored (?) 
app.use(serveStaticAssets);

app.get('/api/data', serveData);


const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});