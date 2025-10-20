// routes/usuarios.routes.js
const { Router } = require('express');
const { 
  registrarUsuario, 
  loginUsuario,
  getPerfil,         // <-- 2. IMPORTAR LAS NUEVAS FUNCIONES
  updatePerfil,
  deleteLogicoPerfil
} = require('../controllers/usuarios.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

// POST /api/usuarios/registro
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

router.get('/perfil', authMiddleware, getPerfil);
router.put('/perfil', authMiddleware, updatePerfil);
router.delete('/perfil', authMiddleware, deleteLogicoPerfil);

module.exports = router;