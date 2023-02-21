const db = new require('../config/db').pool;

//getAllID
const getAllSize = (request, response) => {
  db.query('SELECT * FROM size ORDER BY sid ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


//getById/id
const getSizeById = (request, response) => {
    const inputSid = (request.params.sid)
    db.query('SELECT * FROM style WHERE sid = $1',[inputSid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getAllSize,
    getSizeById

  }