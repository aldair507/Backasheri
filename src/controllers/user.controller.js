import pool from '../database/database.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  try {
    const connection = await pool();
    const results = await connection.query("SELECT * FROM usuarios");
    

    const users = results[0]; // Extraer los resultados de la consulta

    res.json({ users }); // Enviar los resultados como respuesta JSON
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios de la base de datos" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { nombre, email, identificacion, telefono, apellidos, contraseña, id_rol } = req.body;

    if (!nombre || !email || !identificacion || !contraseña) {
      return res.status(400).json({ message: 'Nombre, email, identificación y contraseña son obligatorios' });
    }

    const connection = await pool();

    // Verificar si ya existe un usuario con la misma identificación
    const existingUser = await connection.query("SELECT * FROM usuarios WHERE identificacion = ?", [identificacion]);

    if (existingUser.length > 0) {
      // Ya existe un usuario con esa identificación
      connection.release();
      return res.status(409).json({ message: 'Ya existe un usuario con esa identificación' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Insertar el nuevo usuario
    const result = await connection.query("INSERT INTO usuarios (nombre, email, identificacion, apellidos, telefono, contrasena, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)", [nombre, email, identificacion, apellidos, telefono, hashedPassword, id_rol]);

    connection.release();
    res.json({ message: 'Usuario registrado exitosamente', insertedId: result.insertId });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario en la base de datos" });
  }
};

export { getUsers, registerUser };
