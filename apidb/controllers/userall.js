const db = new require('../config/db').pool;

//getAllID
const getAllUser = (request, response) => {
  db.query('SELECT * FROM userall ORDER BY username ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //getAllBySearch
const getAllBySearch = (request, response) => {
  db.query('SELECT * FROM userall WHERE email LIKE '%$,{searchTerm}%' OR name LIKE '%$,{searchTerm}%' OR address LIKE '%$,{searchTerm}%' OR phone LIKE '%$,{searchTerm}%' OR role LIKE '%$,{searchTerm}%'', 
   connection.query(sqlQuery, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  )}


//getById/Username
const getUserByUsername = (request, response) => {
    const inputUsername = (request.params.username)
    db.query('SELECT * FROM userall WHERE username = $1',[inputUsername], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//getById/Username
const getUserById = (request, response) => {
  const inputUsername = parseInt(request.params.uid)
  db.query('SELECT * FROM userall WHERE uid = $1',[inputUsername], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


  //POST_CreatUser
  const createUser = (request, response) => {
    const { username, password, name, email, address, phone, role } = request.body
    db.query('INSERT INTO userall (username, password, name, email, address, phone, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',[username, password, name, email, address, phone, role], (error, results) => {
      if (error) {
        throw error
      }
      
      if (results && results.rows && results.rows[0]) {
        response.status(201).send(`User added with ID: ${results.rows[0].uid}`);
      } else {
        response.status(500).send("User creation failed");
      }
    })
  }

  //PUT_UpdateUser/username
  const updateUser = (request, response) => {
    const Inputusername = (request.params.username)
    const { password, name, email, address, phone } = request.body
    db.query(
      'UPDATE userall SET password = $1, name = $2, email = $3, address = $4, phone = $5 WHERE username = $6',
      [password, name, email, address, phone, Inputusername],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${Inputusername}`)
      }
    )
  }

    //PUT_UpdateUser/username
    const updateUserId = (request, response) => {
      const Inputusername = (request.params.oid)
      const { password, name, email, address, phone } = request.body
      db.query(
        'UPDATE userall SET password = $1, name = $2, email = $3, address = $4, phone = $5 WHERE username = $6',
        [password, name, email, address, phone, Inputusername],
        (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).send(`User modified with ID: ${Inputusername}`)
        }
      )
    }

//DELETE_deleteCurrencies
  const deleteUser = (request, response) => {
    const Inputusername = (request.params.username)
    db.query('DELETE FROM userall WHERE username = $1', [Inputusername], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${Inputusername}`)
    })
  }

  module.exports = {
    getAllUser,
    getAllBySearch,
    getUserByUsername,
    getUserById,
    createUser,
    updateUser,
    updateUserId,
    deleteUser
  }