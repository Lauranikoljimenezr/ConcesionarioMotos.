import mysql from 'mysql2';
import dotenv from "dotenv";

dotenv.config();


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port:3306
  });
 

  db.getConnection((conn) => {

  });

  
  
export default db.promise()
