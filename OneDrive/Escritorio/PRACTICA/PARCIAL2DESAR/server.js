// server.js
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// 📌 Datos de prueba en memoria
let clientes = [
  { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
  { id: 2, nombre: "Ana Gómez", email: "ana@example.com" }
];

let pedidos = [
  { id: 1, clienteId: 1, producto: "Laptop", cantidad: 2 },
  { id: 2, clienteId: 2, producto: "Mouse", cantidad: 5 }
];

// 📌 Swagger configuración
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Clientes y Pedidos",
      version: "1.0.0",
      description: "CRUD de ClientesC3067 y Pedidos3067 (en memoria)"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// =====================
// 📌 CRUD Clientes
// =====================

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener todos los clientes
 */
app.get("/clientes", (req, res) => {
  res.json(clientes);
});

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtener cliente por ID
 */
app.get("/clientes/:id", (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  cliente ? res.json(cliente) : res.status(404).json({ msg: "Cliente no encontrado" });
});

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 */
app.post("/clientes", (req, res) => {
  const nuevo = { id: clientes.length + 1, ...req.body };
  clientes.push(nuevo);
  res.status(201).json(nuevo);
});

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 */
app.put("/clientes/:id", (req, res) => {
  const idx = clientes.findIndex(c => c.id === parseInt(req.params.id));
  if (idx !== -1) {
    clientes[idx] = { id: parseInt(req.params.id), ...req.body };
    res.json(clientes[idx]);
  } else {
    res.status(404).json({ msg: "Cliente no encontrado" });
  }
});

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 */
app.delete("/clientes/:id", (req, res) => {
  const idx = clientes.findIndex(c => c.id === parseInt(req.params.id));
  if (idx !== -1) {
    const eliminado = clientes.splice(idx, 1);
    res.json(eliminado[0]);
  } else {
    res.status(404).json({ msg: "Cliente no encontrado" });
  }
});

// =====================
// 📌 CRUD Pedidos
// =====================

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 */
app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obtener pedido por ID
 */
app.get("/pedidos/:id", (req, res) => {
  const pedido = pedidos.find(p => p.id === parseInt(req.params.id));
  pedido ? res.json(pedido) : res.status(404).json({ msg: "Pedido no encontrado" });
});

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 */
app.post("/pedidos", (req, res) => {
  const nuevo = { id: pedidos.length + 1, ...req.body };
  pedidos.push(nuevo);
  res.status(201).json(nuevo);
});

/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Actualizar un pedido
 */
app.put("/pedidos/:id", (req, res) => {
  const idx = pedidos.findIndex(p => p.id === parseInt(req.params.id));
  if (idx !== -1) {
    pedidos[idx] = { id: parseInt(req.params.id), ...req.body };
    res.json(pedidos[idx]);
  } else {
    res.status(404).json({ msg: "Pedido no encontrado" });
  }
});

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 */
app.delete("/pedidos/:id", (req, res) => {
  const idx = pedidos.findIndex(p => p.id === parseInt(req.params.id));
  if (idx !== -1) {
    const eliminado = pedidos.splice(idx, 1);
    res.json(eliminado[0]);
  } else {
    res.status(404).json({ msg: "Pedido no encontrado" });
  }
});

// =====================
// 🚀 Iniciar servidor
// =====================
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📑 Swagger disponible en http://localhost:${port}/api-docs`);
});
