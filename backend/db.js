import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER,        
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME     
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err);
  } else {
    console.log('✅ Conectado a MySQL correctamente');
  }
});

export default connection;
