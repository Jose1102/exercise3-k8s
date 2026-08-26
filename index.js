const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Permite recibir JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'Aplicación Node.js funcionando correctamente'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});