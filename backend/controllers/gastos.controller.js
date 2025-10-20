// controllers/gastos.controller.js
const db = require('../db-connection');

// CREAR UN NUEVO GASTO
exports.crearGasto = async (req, res) => {
  const { titulo, monto, descripcion, categoria, estado } = req.body;
  const idUsuario = req.user.id; // Obtenemos el ID del usuario desde el token

  try {
    const query = `
      INSERT INTO gastos (id_usuario, titulo, monto, descripcion, categoria, estado)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [idUsuario, titulo, monto, descripcion, categoria, estado ? estado : 'registrado'];
    const { rows } = await db.query(query, values);
    res.status(201).json({ message: 'Gasto creado exitosamente', gasto: rows[0] });
  } catch (error) {
    console.error('Error creando gasto:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// OBTENER TODOS LOS GASTOS DEL USUARIO LOGUEADO
exports.getGastos = async (req, res) => {
  const idUsuario = req.user.id;
  try {
    const query = 'SELECT * FROM gastos WHERE id_usuario = $1 ORDER BY fecha_creacion DESC';
    const { rows } = await db.query(query, [idUsuario]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error obteniendo gastos:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// ACTUALIZAR UN GASTO ESPECÍFICO
exports.updateGasto = async (req, res) => {
  const { id } = req.params; // ID del gasto a actualizar
  const idUsuario = req.user.id;
  const { titulo, monto, descripcion, categoria, estado } = req.body;

  try {
    const query = `
      UPDATE gastos
      SET titulo = $1, monto = $2, descripcion = $3, categoria = $4, estado = $5, fecha_modificacion = NOW()
      WHERE id_gasto = $6 AND id_usuario = $7
      RETURNING *;
    `;
    const values = [titulo, monto, descripcion, categoria, estado, id, idUsuario];
    const { rows } = await db.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Gasto no encontrado o no pertenece al usuario.' });
    }

    res.status(200).json({ message: 'Gasto actualizado exitosamente', gasto: rows[0] });
  } catch (error) {
    console.error('Error actualizando gasto:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// ELIMINAR UN GASTO ESPECÍFICO (Borrado Físico)
exports.deleteGasto = async (req, res) => {
  const { id } = req.params; // ID del gasto a eliminar
  const idUsuario = req.user.id;

  try {
    const query = 'DELETE FROM gastos WHERE id_gasto = $1 AND id_usuario = $2 RETURNING id_gasto;';
    const { rows } = await db.query(query, [id, idUsuario]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Gasto no encontrado o no pertenece al usuario.' });
    }

    res.status(200).json({ message: 'Gasto eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando gasto:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};