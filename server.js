const express = require('express');
const app = express();

// Middleware para leer JSON
app.use(express.json());

/* =========================
   RUTA PRINCIPAL (PRUEBA)
========================= */
app.get('/', (req, res) => {
  res.send("Servidor funcionando correctamente");
});

/* =========================
   USUARIOS
========================= */

// Registrar usuario
app.post('/usuarios', (req, res) => {
  const usuario = req.body;

  res.json({
    mensaje: "Usuario registrado correctamente",
    usuario: usuario
  });
});

// Login usuario
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  res.json({
    mensaje: "Login exitoso",
    email: email
  });
});

/* =========================
   CITAS
========================= */

// Crear cita
app.post('/citas', (req, res) => {
  const cita = req.body;

  res.json({
    mensaje: "Cita creada correctamente",
    cita: cita
  });
});

// Ver citas
app.get('/citas', (req, res) => {
  res.json({
    citas: [
      { paciente: "David", hora: "10:00" },
      { paciente: "Ana", hora: "11:00" }
    ]
  });
});

/* =========================
   DISPONIBILIDAD
========================= */

app.get('/disponibilidad', (req, res) => {
  res.json({
    horarios: ["8:00", "9:00", "10:00", "11:00"]
  });
});

/* =========================
   SERVIDOR
========================= */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});