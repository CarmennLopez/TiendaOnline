const sql = require("mssql");       // Librería para SQL Server
require("dotenv").config();         // Para leer las variables del .env

// Configuración de la conexión usando las variables del .env
const dbConfig = {
  user: process.env.DB_USER,            // Usuario de la BD
  password: process.env.DB_PASS,        // Contraseña
  server: process.env.DB_SERVER,        // Dirección del servidor
  database: process.env.DB_NAME,        // Nombre de la base de datos
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Azure requiere conexión segura
    trustServerCertificate: true               // Evita errores de certificado
  }
};

// Función para conectar
async function connectDB() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("✅ Conectado a SQL Server");
    return pool;
  } catch (err) {
    console.error("❌ Error al conectar:", err.message);
  }
}

// Exportamos para usar en server.js
module.exports = { sql, connectDB };
