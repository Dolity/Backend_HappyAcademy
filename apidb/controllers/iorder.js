const db = new require('../config/db').pool;

//getiorderAllID
const getAllIorder = (request, response) => {
    db.query('SELECT * FROM iorder ORDER BY oid ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

    //getAllIorderButLimit?limit=10   ?limit=(value)
const getAllIorderButLimit = (request, response) => {
  const limit = parseInt(request.query.limit) || 10 // Default limit is 10
  db.query('SELECT * FROM iorder ORDER BY pid ASC LIMIT $1', [limit], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //getAllIorderByPage?page=1    ?page=(value)
  const getAllIorderByPage = (request, response) => {
    const page = parseInt(request.query.page) || 1 // Default page is 1
    const limit = 10 // Number of products per page
    const offset = (page - 1) * limit // Calculate offset based on page number
    db.query('SELECT * FROM iorder ORDER BY pid ASC LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //getiorderByDate/2022-01-01 
  const getIorderByDate = (request, response) => {
    const date = request.params.date;
    console.log('Date:', date);
    db.query('SELECT * FROM iorder WHERE date = $1', [date], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  //getIorderByStatus/id    1=Order, 2=Already Paid, 3=Delivering, 4=Successfully Delivered
const getIorderByStatus = (request, response) => {
  const InputStatus = parseInt(request.params.status)
  db.query('SELECT * FROM iorder WHERE status = $1',[InputStatus], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  
  
//getiorderById/id
const getIorderById = (request, response) => {
    const Inputoid = parseInt(request.params.oid)
    db.query('SELECT * FROM iorder WHERE oid = $1',[Inputoid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //POST_Creatiorder
  const createIorder = (request, response) => {
    const { pid, styleid, sizeid, date, status, totalprice, uid} = request.body
    db.query('INSERT INTO iorder (pid, styleid, sizeid, date, status, totalprice, uid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',[pid, styleid, sizeid, date, status, totalprice, uid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].oid}`)
    })
  }

  //getAllIorderUser
  const getAllIorderUser = (request, response) => {
    db.query('SELECT iorder.*, userall.address FROM iorder JOIN userall ON iorder.uid = userall.uid ORDER BY iorder.oid ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  module.exports = {
    getAllIorder,
    getAllIorderButLimit,
    getAllIorderByPage,
    getIorderByDate,
    getIorderByStatus,
    getIorderById,
    createIorder,
    getAllIorderUser
  }