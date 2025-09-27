const express = require("express");
const { connectDB } = require("./db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint de prueba
app.get("/clientes", async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM ClientesC3067");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
  console.log("Swagger disponible en http://localhost:3000/api-docs");
});
