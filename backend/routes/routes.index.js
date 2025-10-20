// routes/index.js
const { Router } = require('express');
const router = Router();

// Importamos las rutas específicas
const userRoutes = require('./usuarios.routes');
const gastosRoutes = require('./gastos.routes');
// const gastoRoutes = require('./gastos.routes'); // <-- Lo agregaremos aquí en el futuro

// Usamos las rutas
router.use('/usuarios', userRoutes);
router.use('/gastos', gastosRoutes);

module.exports = router;