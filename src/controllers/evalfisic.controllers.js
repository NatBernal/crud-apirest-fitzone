import { getConnection } from "../database/connection.js";
import sql from "mssql";
import { handleSqlError } from "../utils/sqlErrorHandler.js";

export const getEvalFisicas = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query("SELECT * FROM EVALUACIONES_FISICAS");
  res.json(result.recordset);
};

export const getEvalFisica = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query(
      "SELECT * FROM EVALUACIONES_FISICAS WHERE id_evaluacion_fisica = @id"
    );

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Evaluacion fisica no encontrada" });
  }
  return res.json(result.recordset[0]);
};

export const createEvalFisica = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_membresia", sql.Int, req.body.id_membresia)
      .input("fecha_eval_fisica", sql.Date, req.body.fecha_eval_fisica)
      .input("peso_eval_fisica", sql.Float, req.body.peso_eval_fisica)
      .input("altura_eval_fisica", sql.Float, req.body.altura_eval_fisica)
      .input("pgc_eval_fisica", sql.Float, req.body.pgc_eval_fisica)
      .query(
        "INSERT INTO EVALUACIONES_FISICAS (id_membresia, fecha_eval_fisica, peso_eval_fisica, altura_eval_fisica, pgc_eval_fisica) VALUES (@id_membresia, @fecha_eval_fisica, @peso_eval_fisica, @altura_eval_fisica, @pgc_eval_fisica)"
      );

    res.json({
      id: req.body.id,
      id_membresia: req.body.id_membresia,
      fecha_eval_fisica: req.body.fecha_eval_fisica,
      peso_eval_fisica: req.body.peso_eval_fisica,
      altura_eval_fisica: req.body.altura_eval_fisica,
      pgc_eval_fisica: req.body.pgc_eval_fisica,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const updateEvalFisica = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("id_membresia", sql.Int, req.body.id_membresia)
      .input("fecha_eval_fisica", sql.Date, req.body.fecha_eval_fisica)
      .input("peso_eval_fisica", sql.Float, req.body.peso_eval_fisica)
      .input("altura_eval_fisica", sql.Float, req.body.altura_eval_fisica)
      .input("pgc_eval_fisica", sql.Float, req.body.pgc_eval_fisica)
      .query(
        "UPDATE EVALUACIONES_FISICAS SET id_membresia = @id_membresia, fecha_eval_fisica = @fecha_eval_fisica, peso_eval_fisica = @peso_eval_fisica, altura_eval_fisica = @altura_eval_fisica, pgc_eval_fisica = @pgc_eval_fisica WHERE id_evaluacion_fisica = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "Evaluacion fisica no encontrada" });
    }

    res.json({
      id: req.body.id,
      id_membresia: req.body.id_membresia,
      fecha_eval_fisica: req.body.fecha_eval_fisica,
      peso_eval_fisica: req.body.peso_eval_fisica,
      altura_eval_fisica: req.body.altura_eval_fisica,
      pgc_eval_fisica: req.body.pgc_eval_fisica,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const deleteEvalFisica = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(
        "DELETE FROM EVALUACIONES_FISICAS WHERE id_evaluacion_fisica = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ message: "Evaluacion fisica no encontrada" });
    }

    return res.json({ message: "Evaluacion fisica eliminada" });
  } catch (error) {
    handleSqlError(error, res);
  }
};
