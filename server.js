const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// ===== BASE DE DATOS SIMULADA =====
let usuarios = [];
let citas = [
  { paciente: "David", hora: "10:00" },
  { paciente: "Ana", hora: "11:00" }
];

// ===== RUTA PRINCIPAL =====
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// ===== OBTENER CITAS =====
app.get('/citas', (req, res) => {
  res.json({ citas });
});

// ===== CREAR CITA =====
app.post('/citas', (req, res) => {
  const { paciente, hora } = req.body;

  if (!paciente || !hora) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  citas.push({ paciente, hora });
  res.json({ mensaje: "Cita creada correctamente" });
});

// ===== REGISTRO DE USUARIO (CON CIFRADO) =====
app.post('/usuarios', async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  const existe = usuarios.find(u => u.usuario === usuario);
  if (existe) {
    return res.status(400).json({ mensaje: "Usuario ya existe" });
  }

  const hash = await bcrypt.hash(password, 10);

  usuarios.push({ usuario, password: hash });

  res.json({ mensaje: "Usuario registrado correctamente" });
});

// ===== LOGIN =====
app.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  const user = usuarios.find(u => u.usuario === usuario);

  if (!user) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  const valido = await bcrypt.compare(password, user.password);

  if (!valido) {
    return res.status(401).json({ mensaje: "Contraseña incorrecta" });
  }

  res.json({ mensaje: "Login exitoso" });
});

// ===== PUERTO =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});