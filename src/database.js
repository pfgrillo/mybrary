// Es la conexión a la base de datos
const mysql = require('mysql');
const { promisify } = require('util');  //para convertir callbacks en promesas ???
const { database } = require('./keys');  //quiero la propiedad database(db_links) del objeto database(database.json) !!!

const pool = mysql.createPool(database);   //esto sólo crea la conexión pero no la inicia

pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has to many connections');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused');
      }
    }

    if (connection) connection.release();    //empieza la conexión con la base de datos 'database' del objeto database.json
    console.log('DB is Connected');
  
    return;
  });

const query = promisify(pool.query);     //solo le pongo promesas para los métodos de query ????

  module.exports = pool;   //solo export pool y ya puedo empezar a hacer consultas