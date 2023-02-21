// const  Pool = require('pg').Pool
// const db = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'abc123',
//   port: 5432,
// })
// module.exports = {
//     pool
// }

const pg = require('pg');
const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'HappyAcadamy1',
  password: 'abc123',
  port: 5432              
};
const pool = new pg.Pool(config);

pool.connect(function(err, client, done){
  console.log("Connect Done!!")
})

module.exports = {
    pool
}

