import { getConnection } from "../database/connection.js";
import sql from "mssql";
import { handleSqlError } from "../utils/sqlErrorHandler.js";

export const getMembresias = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM MEMBRESIAS");
  res.json(result.recordset);
};

export const getMembresia = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM MEMBRESIAS WHERE id_membresia = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Membresia no encontrada" });
  }
  return res.json(result.recordset[0]);
};

export const createMembresia = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_sede", sql.Int, req.body.id_sede)
      .input("id_cliente", sql.Int, req.body.id_cliente)
      .input("tipo_membresia", sql.VarChar, req.body.tipo_membresia)
      .input(
        "fecha_inicio_membresia",
        sql.Date,
        req.body.fecha_inicio_membresia
      )
      .input("fecha_fin_membresia", sql.Date, req.body.fecha_fin_membresia)
      .input("precio_membresia", sql.Float, req.body.precio_membresia)
      .input("fecha_pago_membresia", sql.Date, req.body.fecha_pago_membresia)
      .query(
        "INSERT INTO MEMBRESIAS (id_sede, id_cliente, tipo_membresia, fecha_inicio_membresia, fecha_fin_membresia, precio_membresia, fecha_pago_membresia) VALUES (@id_sede, @id_cliente, @tipo_membresia, @fecha_inicio_membresia, @fecha_fin_membresia, @precio_membresia, @fecha_pago_membresia)"
      );

    res.json({
      id: req.body.id,
      id_sede: req.body.id_sede,
      id_cliente: req.body.id_cliente,
      tipo_membresia: req.body.tipo_membresia,
      fecha_inicio_membresia: req.body.fecha_inicio_membresia,
      fecha_fin_membresia: req.body.fecha_fin_membresia,
      precio_membresia: req.body.precio_membresia,
      fecha_pago_membresia: req.body.fecha_pago_membresia,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const updateMembresia = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("id_sede", sql.Int, req.body.id_sede)
      .input("id_cliente", sql.Int, req.body.id_cliente)
      .input("tipo_membresia", sql.VarChar, req.body.tipo_membresia)
      .input(
        "fecha_inicio_membresia",
        sql.Date,
        req.body.fecha_inicio_membresia
      )
      .input("fecha_fin_membresia", sql.Date, req.body.fecha_fin_membresia)
      .input("precio_membresia", sql.Float, req.body.precio_membresia)
      .input("fecha_pago_membresia", sql.Date, req.body.fecha_pago_membresia)
      .query(
        "UPDATE MEMBRESIAS SET id_sede = @id_sede, id_cliente = @id_cliente,  tipo_membresia = @tipo_membresia, fecha_inicio_membresia = @fecha_inicio_membresia, fecha_fin_membresia = @fecha_fin_membresia, precio_membresia = @precio_membresia, fecha_pago_membresia = @fecha_pago_membresia WHERE id_membresia = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Membresia no encontrada" });
    }

    res.json({
      id: req.body.id,
      id_sede: req.body.id_sede,
      id_cliente: req.body.id_cliente,
      tipo_membresia: req.body.tipo_membresia,
      fecha_inicio_membresia: req.body.fecha_inicio_membresia,
      fecha_fin_membresia: req.body.fecha_fin_membresia,
      precio_membresia: req.body.precio_membresia,
      fecha_pago_membresia: req.body.fecha_pago_membresia,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const deleteMembresia = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM MEMBRESIAS WHERE id_membresia = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Membresia no encontrada" });
    }

    return res.json({ message: "Membresia eliminada" });
  } catch (error) {
    handleSqlError(error, res);
  }
};
