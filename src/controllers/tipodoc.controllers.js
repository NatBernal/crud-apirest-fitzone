import { getConnection } from "../database/connection.js";
import sql from "mssql";
import { handleSqlError } from "../utils/sqlErrorHandler.js";

export const getTiposDoc = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM TIPOS_DOCUMENTO");
  res.json(result.recordset);
};

export const getTipoDoc = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM TIPOS_DOCUMENTO WHERE id_tipodoc = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Tipo de documento no encontrado" });
  }
  return res.json(result.recordset[0]);
};

export const createTipoDoc = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.VarChar, req.body.nombre)
      .query("INSERT INTO TIPOS_DOCUMENTO (nomb_tipodoc) VALUES (@nombre)");

    res.status(201).json({
      message: "Tipo de documento creado exitosamente.",
      data: {
        id: req.body.id,
        nombre: req.body.nombre,
      },
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const updateTipoDoc = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("nombre", sql.VarChar, req.body.nombre)
      .query(
        "UPDATE TIPOS_DOCUMENTO SET nomb_tipodoc = @nombre WHERE id_tipodoc = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "Tipo de documento no encontrado" });
    }
    res.json({
      id: req.body.id,
      nombre: req.body.nombre,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const deleteTipoDoc = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM TIPOS_DOCUMENTO WHERE id_tipodoc = @id");
    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "Tipo de documento no encontrado" });
    }

    return res.json({ message: "Tipo de documento eliminado" });
  } catch (error) {
    handleSqlError(error, res);
  }
};
