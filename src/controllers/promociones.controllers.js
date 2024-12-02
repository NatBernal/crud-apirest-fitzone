import { getConnection } from "../database/connection.js";
import sql from "mssql";
import { handleSqlError } from "../utils/sqlErrorHandler.js";

export const getPromociones = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM PROMOCIONES");
  res.json(result.recordset);
};

export const getPromocion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM PROMOCIONES WHERE id_promocion = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Promocion no encontrada" });
  }
  return res.json(result.recordset[0]);
};

export const createPromocion = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("descripcion", sql.VarChar, req.body.descripcion)
      .input("descuento", sql.Float, req.body.descuento)
      .input("fecha_inicio", sql.Date, req.body.fecha_inicio)
      .input("fecha_fin", sql.Date, req.body.fecha_fin)
      .query(
        "INSERT INTO PROMOCIONES (descr_promocion, descuento_promocion, fecha_inicio_promocion, fecha_fin_promocion) VALUES (@descripcion, @descuento, @fecha_inicio, @fecha_fin)"
      );

    res.json({
      id: req.body.id,
      descripcion: req.body.descripcion,
      descuento: req.body.descuento,
      fecha_inicio: req.body.fecha_inicio,
      fecha_fin: req.body.fecha_fin,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const updatePromocion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("descripcion", sql.VarChar, req.body.descripcion)
      .input("descuento", sql.Float, req.body.descuento)
      .input("fecha_inicio", sql.Date, req.body.fecha_inicio)
      .input("fecha_fin", sql.Date, req.body.fecha_fin)
      .query(
        "UPDATE PROMOCIONES SET descr_promocion = @descripcion, descuento_promocion = @descuento, fecha_inicio_promocion = @fecha_inicio, fecha_fin_promocion = @fecha_fin WHERE id_promocion = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Promocion no encontrada" });
    }
    res.json({
      id: req.body.id,
      descripcion: req.body.descripcion,
      descuento: req.body.descuento,
      fecha_inicio: req.body.fecha_inicio,
      fecha_fin: req.body.fecha_fin,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const deletePromocion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM PROMOCIONES WHERE id_promocion = @id");
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Promocion no encontrada" });
    }

    return res.json({ message: "Promocion eliminada" });
  } catch (error) {
    handleSqlError(error, res);
  }
};
