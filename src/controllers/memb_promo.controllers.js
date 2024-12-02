import { getConnection } from "../database/connection.js";
import sql from "mssql";
import { handleSqlError } from "../utils/sqlErrorHandler.js";

export const getMembresiasPromocion = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query("SELECT * FROM MEMEBRESIAS_PROMOCION");
  res.json(result.recordset);
};

export const getMembresiaPromocion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_promocion", sql.Int, req.params.id_promocion)
      .input("id_membresia", sql.Int, req.params.id_membresia)
      .query(
        "SELECT * FROM MEMEBRESIAS_PROMOCION WHERE id_promocion = @id_promocion AND id_membresia = @id_membresia"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Relación entre promoción y membresía no encontrada.",
      });
    }
    return res.json(result.recordset[0]);
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const createMembresiaPromocion = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_promocion", sql.Int, req.body.id_promocion)
      .input("id_membresia", sql.Int, req.body.id_membresia)
      .query(
        "INSERT INTO MEMEBRESIAS_PROMOCION (id_promocion, id_membresia) VALUES (@id_promocion, @id_membresia)"
      );

    res.status(201).json({
      message: "Relación creada exitosamente.",
      data: {
        id_promocion: req.body.id_promocion,
        id_membresia: req.body.id_membresia,
      },
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const deleteMembresiaPromocion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_promocion", sql.Int, req.params.id_promocion)
      .input("id_membresia", sql.Int, req.params.id_membresia)
      .query(
        "DELETE FROM MEMEBRESIAS_PROMOCION WHERE id_promocion = @id_promocion AND id_membresia = @id_membresia"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Relación entre promoción y membresía no encontrada.",
      });
    }
    res.json({ message: "Relación eliminada correctamente." });
  } catch (error) {
    handleSqlError(error, res);
  }
};
