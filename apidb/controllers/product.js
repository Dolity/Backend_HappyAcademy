const db = new require('../config/db').pool;
const express = require("express"); 
const app = express();   


// const getProSizeStyle = (req, res) => {
//   const { bandname, type, name } = req.query;
//   const filters = [];
//   const values = [];

//   // Add brand filter to query
//   if (bandname) {
//     filters.push('bandname ILIKE $1');
//     values.push(`%${bandname}%`);
//   }

//   // Add style filter to query
//   if (type) {
//     filters.push('type ILIKE $2');
//     values.push(`%${type}%`);
//   }

//   // Add size filter to query
//   if (name) {
//     filters.push('name ILIKE $3');
//     values.push(`%${name}%`);
//   }

//   // Build the query string with filters
//   const query = `
//     SELECT *
//     FROM product FULL OUTER JOIN size ON product.pid = size.sid FULL OUTER JOIN style ON product.PID = style.sid
//     WHERE filters LIKE %${values}% ''}
//   `;

//   // Execute the query with filter values
//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error querying database');
//     } else {
//       res.json(result.rows);
//     }
//   });
// };
// console.log(db);

// let keepCost = 'SELECT * FROM  product FULL OUTER JOIN size ON product.pid = size.sid FULL OUTER JOIN style ON product.PID = style.sid WHERE cost > $1 ORDER BY pid ASC ';
// const Allcost = [cost];
// console.log(Allcost);
//getAllProduct
const getAllProduct = (request, response) => {
  db.query('SELECT product.*, size.*, style.*, (product.cost + size.cost + style.cost) AS total_cost FROM product FULL OUTER JOIN size ON product.pid = size.sid FULL OUTER JOIN style ON product.PID = style.sid ORDER BY pid ASC ',(error, results) => {

      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //getAllProductButLimit?limit=10   ?limit=(value)
const getAllProductButLimit = (request, response) => {
  const limit = parseInt(request.query.limit) || 10 // Default limit is 10
  db.query('SELECT product.*, size.*, style.*, (product.cost + size.cost + style.cost) AS total_cost FROM product FULL OUTER JOIN size ON product.pid = size.sid FULL OUTER JOIN style ON product.PID = style.sid ORDER BY pid ASC LIMIT $1', [limit], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //getAllProductByPage?page=1    ?page=(value)
  const getAllProductByPage = (request, response) => {
    const page = parseInt(request.query.page) || 1 // Default page is 1
    const limit = 10 // Number of products per page
    const offset = (page - 1) * limit // Calculate offset based on page number
    db.query('SELECT product.*, size.*, style.*, (product.cost + size.cost + style.cost) AS total_cost FROM product FULL OUTER JOIN size ON product.pid = size.sid FULL OUTER JOIN style ON product.PID = style.sid ORDER BY pid ASC LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

    //getBandCar?bandname=ISU&type=1&name=Small
    const getSearchCarStyleSize = (request, response) => {
      const { bandname, type, name } = request.query;
      let query = 'SELECT product.*, size.*, style.*, (product.cost + size.cost + style.cost) AS total_cost FROM product FULL OUTER JOIN size ON product.pid = size.sid FULL OUTER JOIN style ON product.PID = style.sid WHERE 1 = 1 ';
      const values = [];
    
      if (bandname) {
        query += 'AND bandname = $1 ';
        values.push(bandname);
      }
    
      if (type) {
        query += 'AND type = $2 ';
        values.push(type);
      }
    
      if (name) {
        query += 'AND name = $3 ';
        values.push(name);
      }
    
      query += 'ORDER BY pid ASC';
    
      db.query(query, values, (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
    };
  

  //getProdcutByBandCar/bandname    ISU, SCA
const getProdcutByBandCar = (request, response) => {
  const inputBC = (request.params.bandname)
  db.query('SELECT * FROM product FULL OUTER JOIN size ON product.pid = size.sid FULL OUTER JOIN style ON product.PID = style.sid WHERE bandname = $1 ORDER BY pid ASC ',[inputBC], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

  //getProdcutByStyle/type    1=Color, 2=Pai
  const getProdcutByStyle = (request, response) => {
    const inputType = (request.params.type)
    db.query('SELECT * FROM product FULL OUTER JOIN size ON product.pid = size.sid FULL OUTER JOIN style ON product.PID = style.sid WHERE type = $1 ORDER BY pid ASC ',[inputType], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

    //getProdcutBySize/size   Small, Medium, Large
    const getProdcutBySize = (request, response) => {
      const inputSize = (request.params.name)
      db.query('SELECT * FROM product FULL OUTER JOIN size ON product.pid = size.sid FULL OUTER JOIN style ON product.PID = style.sid WHERE name = $1 ORDER BY pid ASC ',[inputSize], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
    }


//getById/id
const getProdcutById = (request, response) => {
    const inputId = parseInt(request.params.pid)
    db.query('SELECT * FROM product WHERE pid = $1',[inputId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //POST_CreatProduct
  const createProduct = (request, response) => {
    const { bandname, cost } = request.body
    db.query('INSERT INTO product (bandname, cost) VALUES ($1, $2) RETURNING *',[bandname, cost], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].pid}`)
    })
  }

  //PUT_UpdateProduct/id
  const updateProduct = (request, response) => {
    const productID = parseInt(request.params.pid)
    const { bandname, cost } = request.body
  
    db.query(
      'UPDATE product SET bandname = $1, cost = $2 WHERE pid = $3',
      [bandname, cost, productID],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${productID}`)
      }
    )
  }

//DELETE_deleteProduct/id  
  const deleteProduct = (request, response) => {
    const productID = parseInt(request.params.pid)

    db.query('DELETE FROM product WHERE pid = $1', [productID], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${productID}`)
    })
  }




  module.exports = {
    // getProSizeStyle,
    getAllProduct,
    getAllProductButLimit,
    getAllProductByPage,
    getProdcutByBandCar,
    getProdcutByStyle,
    getProdcutBySize,
    getProdcutById,
    createProduct,
    updateProduct,
    deleteProduct,
    getSearchCarStyleSize
  }