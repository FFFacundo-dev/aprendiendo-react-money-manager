// routes/gastos.routes.js
const { Router } = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {
  crearGasto,
  getGastos,
  updateGasto,
  deleteGasto
} = require('../controllers/gastos.controller');

const router = Router();

// Aplicamos el middleware de autenticación a TODAS las rutas de este archivo.
// Cualquier petición a /gastos/... requerirá un token válido.
router.use(authMiddleware);

// Definimos las rutas del CRUD
router.post('/', crearGasto);       // Crear un nuevo gasto
router.get('/', getGastos);        // Obtener todos los gastos del usuario
router.put('/:id', updateGasto);     // Actualizar un gasto por su ID
router.delete('/:id', deleteGasto);  // Eliminar un gasto por su ID

module.exports = router;