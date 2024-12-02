import { getConnection } from "../database/connection.js";
import sql from "mssql";
import { handleSqlError } from "../utils/sqlErrorHandler.js";

export const getSedes = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM SEDES");
  res.json(result.recordset);
};

export const getSede = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM SEDES WHERE id_sede = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Sede no encontrada" });
  }
  return res.json(result.recordset[0]);
};

export const createSede = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.VarChar, req.body.nombre)
      .input("direccion", sql.VarChar, req.body.direccion)
      .query(
        "INSERT INTO SEDES (nombre_sede, direccion_sede) VALUES (@nombre, @direccion)"
      );

    res.json({
      id: req.body.id,
      nombre: req.body.nombre,
      direccion: req.body.direccion,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const updateSede = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("nombre", sql.VarChar, req.body.nombre)
      .input("direccion", sql.VarChar, req.body.direccion)
      .query(
        "UPDATE SEDES SET nombre_sede = @nombre, direccion_sede = @direccion WHERE id_sede = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Sede no encontrada" });
    }
    res.json({
      id: req.body.id,
      nombre: req.body.nombre,
      direccion: req.body.direccion,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const deleteSede = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM SEDES WHERE id_sede = @id");
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Sede no encontrada" });
    }

    return res.json({ message: "Sede eliminada" });
  } catch (error) {
    handleSqlError(error, res);
  }
};
