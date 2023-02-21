const express = require("express"); 
const app = express();  

const port = 3100;     
          
const dbProdcut = require('./apidb/controllers/product');
const dbUser = require('./apidb/controllers/userall');
const dbStyle = require('./apidb/controllers/style');
const dbSize = require('./apidb/controllers/size');
const dbIorder = require('./apidb/controllers/iorder');

const bodyParser = require('body-parser');
app.use(bodyParser.json())

//CRUD_Product
// app.get('/getProSizeStyle/:inputBandname',dbProdcut.getProSizeStyle);
app.get('/getAllProduct',dbProdcut.getAllProduct);
app.get('/getAllProductButLimit',dbProdcut.getAllProductButLimit);
app.get('/getAllProductByPage',dbProdcut.getAllProductByPage);
app.get('/getProdcutByBandCar/:bandname',dbProdcut.getProdcutByBandCar);
app.get('/getProdcutByStyle/:type',dbProdcut.getProdcutByStyle);
app.get('/getProdcutBySize/:name',dbProdcut.getProdcutBySize);
app.get('/getProductById/:pid',dbProdcut.getProdcutById);
app.post('/createProduct', dbProdcut.createProduct);
app.put('/updateProduct/:pid', dbProdcut.updateProduct);
app.delete('/deleteProduct/:pid', dbProdcut.deleteProduct);
app.get('/getSearchCarStyleSize', dbProdcut.getSearchCarStyleSize);


//CRUD_User
app.get('/getAllUser', dbUser.getAllUser);
app.get('/getAllBySearch', dbUser.getAllBySearch);
app.get('/getUsersById/:uid', dbUser.getUserById);
app.post('/createUser', dbUser.createUser);
app.put('/updateUser/:uid', dbUser.updateUser);
app.delete('/deleteUser/:uid', dbUser.deleteUser);

//CRUD_Style
app.get('/getAllStyle', dbStyle.getAllStyle);
app.get('/getStyleById/:sid', dbStyle.getStyleById);

//CRUD_Size
app.get('/getAllSize', dbSize.getAllSize);
app.get('/getSizeById/:sid', dbSize.getSizeById);

//CRUD_Iorder 
app.get('/getAllIorder', dbIorder.getAllIorder);
app.get('/getAllIorderButLimit', dbIorder.getAllIorderButLimit);
app.get('/getAllIorderByPage', dbIorder.getAllIorderByPage);
app.get('/getIorderByDate/:date', dbIorder.getIorderByDate);
app.get('/getIorderByStatus/:status', dbIorder.getIorderByStatus);
app.get('/getIorderById/:oid', dbIorder.getIorderById);
app.post('/createIorder', dbIorder.createIorder);
app.get('/getAllIorderUser', dbIorder.getAllIorderUser);



app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});


