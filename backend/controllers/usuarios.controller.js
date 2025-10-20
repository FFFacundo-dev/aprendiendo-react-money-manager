// controllers/usuarios.controller.js
const db = require('../db-connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.registrarUsuario = async (req, res) => {
  // 1. Extraemos los datos del cuerpo de la petición
  const { nombre, email, password, role } = req.body;

  try {
    // 2. Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    // 3. Creamos la consulta SQL para insertar el nuevo usuario
    const query = `
      INSERT INTO usuarios (nombre, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id_usuario, email, role, fecha_creacion;
    `;
    const values = [nombre, email, passwordEncriptado, role || 'user'];

    // 4. Ejecutamos la consulta
    const { rows } = await db.query(query, values);

    // 5. Enviamos una respuesta exitosa
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: rows[0],
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el servidor al registrar el usuario.' });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar al usuario por email en la BD
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const { rows } = await db.query(query, [email]);

    // Si no se encuentra ningún usuario, enviar error
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const usuario = rows[0];

    // 2. Comparar la contraseña enviada con la guardada (hasheada)
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrecta) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 3. Si todo es correcto, crear el JWT
    const payload = {
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      role: usuario.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // El token expira en 1 hora
    });

    // 4. Enviar el token al cliente
    res.status(200).json({
      message: 'Login exitoso',
      token: token,
    });

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// OBTENER PERFIL DEL USUARIO AUTENTICADO
exports.getPerfil = async (req, res) => {
  try {
    // El ID del usuario lo obtenemos del token, no de la URL
    const userId = req.user.id; 

    const query = 'SELECT id_usuario, nombre, email, role, fecha_creacion FROM usuarios WHERE id_usuario = $1';
    const { rows } = await db.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// ACTUALIZAR PERFIL DEL USUARIO
exports.updatePerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nombre, email } = req.body; // Solo permitimos actualizar estos campos por ahora

    const query = `
      UPDATE usuarios 
      SET nombre = $1, email = $2, fecha_modificacion = NOW()
      WHERE id_usuario = $3
      RETURNING id_usuario, nombre, email, role;
    `;
    const { rows } = await db.query(query, [nombre, email, userId]);

    res.status(200).json({
      message: 'Perfil actualizado correctamente',
      usuario: rows[0],
    });
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// BORRADO LÓGICO DEL PERFIL
exports.deleteLogicoPerfil = async (req, res) => {
  try {
    const userId = req.user.id;

    // En lugar de DELETE, hacemos un UPDATE
    const query = 'UPDATE usuarios SET is_active = false WHERE id_usuario = $1';
    await db.query(query, [userId]);

    res.status(200).json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    console.error('Error desactivando perfil:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};