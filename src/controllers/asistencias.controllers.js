import { getConnection } from "../database/connection.js";
import sql from "mssql";
import { handleSqlError } from "../utils/sqlErrorHandler.js";

export const getAsistencias = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM ASISTENCIAS");
  res.json(result.recordset);
};

export const getAsistencia = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM ASISTENCIAS WHERE id_asistencia = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Asistencia no encontrada" });
  }
  return res.json(result.recordset[0]);
};

export const createAsistencia = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_cliente", sql.Int, req.body.id_cliente)
      .input("fecha_entrada", sql.DateTime, req.body.fecha_entrada)
      .input("fecha_salida", sql.DateTime, req.body.fecha_salida)
      .input(
        "descripcion_asistencia",
        sql.VarChar,
        req.body.descripcion_asistencia
      )
      .query(
        "INSERT INTO ASISTENCIAS (id_cliente, fecha_entrada, fecha_salida, descripcion_asistencia) VALUES (@id_cliente, @fecha_entrada, @fecha_salida, @descripcion_asistencia)"
      );

    res.json({
      id: req.body.id,
      id_cliente: req.body.id_cliente,
      fecha_entrada: req.body.fecha_entrada,
      fecha_salida: req.body.fecha_salida,
      descripcion_asistencia: req.body.descripcion_asistencia,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const updateAsistencia = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("id_cliente", sql.Int, req.body.id_cliente)
      .input("fecha_entrada", sql.DateTime, req.body.fecha_entrada)
      .input("fecha_salida", sql.DateTime, req.body.fecha_salida)
      .input(
        "descripcion_asistencia",
        sql.VarChar,
        req.body.descripcion_asistencia
      )
      .query(
        "UPDATE ASISTENCIAS SET id_cliente = @id_cliente, fecha_entrada = @fecha_entrada, fecha_salida = @fecha_salida, descripcion_asistencia = @descripcion_asistencia WHERE id_asistencia = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Asistencia no encontrada" });
    }

    res.json({
      id: req.body.id,
      id_cliente: req.body.id_cliente,
      fecha_entrada: req.body.fecha_entrada,
      fecha_salida: req.body.fecha_salida,
      descripcion_asistencia: req.body.descripcion_asistencia,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const deleteAsistencia = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM ASISTENCIAS WHERE id_asistencia = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Asistencia no encontrada" });
    }

    return res.json({ message: "Asistencia eliminada" });
  } catch (error) {
    handleSqlError(error, res);
  }
};
