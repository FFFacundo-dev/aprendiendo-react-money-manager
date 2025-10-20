// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 1. Buscamos el token en los encabezados (headers)
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Acceso denegado. No se proveyó un token.' });
  }

  // El formato del header es "Bearer TOKEN_LARGO"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Formato de token inválido.' });
  }

  // 2. Verificamos la validez del token
  try {
    const payloadVerificado = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Si es válido, guardamos el payload en el objeto 'req'
    // para que las siguientes funciones (controladores) lo puedan usar.
    req.user = payloadVerificado;

    next(); // ¡Le damos paso! El usuario puede continuar.
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

module.exports = authMiddleware;