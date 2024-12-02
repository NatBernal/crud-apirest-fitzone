import { getConnection } from "../database/connection.js";
import sql from "mssql";
import { handleSqlError } from "../utils/sqlErrorHandler.js";

export const getClientes = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM CLIENTES");
  res.json(result.recordset);
};

export const getCliente = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM CLIENTES WHERE id_cliente = @id");

  if (result.rowsAffected[0] === 0) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  return res.json(result.recordset[0]);
};

export const createCliente = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_tipodoc", sql.Int, req.body.id_tipodoc)
      .input("nombre_cliente", sql.VarChar, req.body.nombre_cliente)
      .input("no_doc_cliente", sql.Int, req.body.no_doc_cliente)
      .input(
        "fecha_nacimiento_cliente",
        sql.Date,
        req.body.fecha_nacimiento_cliente
      )
      .input("rh_cliente", sql.VarChar, req.body.rh_cliente)
      .input("telefono_cliente", sql.VarChar, req.body.telefono_cliente)
      .input("correo_cliente", sql.VarChar, req.body.correo_cliente)
      .input("huella_cliente", sql.VarChar, req.body.huella_cliente)
      .input(
        "fecha_registro_cliente",
        sql.Date,
        req.body.fecha_registro_cliente
      )
      .query(
        "INSERT INTO CLIENTES (id_tipodoc, nombre_cliente, no_doc_cliente, fecha_nacimiento_cliente, rh_cliente, telefono_cliente, correo_cliente, huella_cliente, fecha_registro_cliente) VALUES (@id_tipodoc, @nombre_cliente, @no_doc_cliente, @fecha_nacimiento_cliente, @rh_cliente, @telefono_cliente, @correo_cliente, @huella_cliente, @fecha_registro_cliente)"
      );

    res.json({
      id: req.body.id,
      id_tipodoc: req.body.id_tipodoc,
      nombre_cliente: req.body.nombre_cliente,
      no_doc_cliente: req.body.no_doc_cliente,
      fecha_nacimiento_cliente: req.body.fecha_nacimiento_cliente,
      rh_cliente: req.body.rh_cliente,
      telefono_cliente: req.body.telefono_cliente,
      correo_cliente: req.body.correo_cliente,
      huella_cliente: req.body.huella_cliente,
      fecha_registro_cliente: req.body.fecha_registro_cliente,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const updateCliente = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("id_tipodoc", sql.Int, req.body.id_tipodoc)
      .input("nombre_cliente", sql.VarChar, req.body.nombre_cliente)
      .input("no_doc_cliente", sql.Int, req.body.no_doc_cliente)
      .input(
        "fecha_nacimiento_cliente",
        sql.Date,
        req.body.fecha_nacimiento_cliente
      )
      .input("rh_cliente", sql.VarChar, req.body.rh_cliente)
      .input("telefono_cliente", sql.VarChar, req.body.telefono_cliente)
      .input("correo_cliente", sql.VarChar, req.body.correo_cliente)
      .input("huella_cliente", sql.VarChar, req.body.huella_cliente)
      .input(
        "fecha_registro_cliente",
        sql.Date,
        req.body.fecha_registro_cliente
      )
      .query(
        "UPDATE CLIENTES SET id_tipodoc = @id_tipodoc, nombre_cliente = @nombre_cliente, no_doc_cliente = @no_doc_cliente, fecha_nacimiento_cliente = @fecha_nacimiento_cliente, rh_cliente = @rh_cliente, telefono_cliente = @telefono_cliente, correo_cliente = @correo_cliente, huella_cliente = @huella_cliente, fecha_registro_cliente = @fecha_registro_cliente WHERE id_cliente = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({
      id: req.params.id,
      id_tipodoc: req.body.id_tipodoc,
      nombre_cliente: req.body.nombre_cliente,
      no_doc_cliente: req.body.no_doc_cliente,
      fecha_nacimiento_cliente: req.body.fecha_nacimiento_cliente,
      rh_cliente: req.body.rh_cliente,
      telefono_cliente: req.body.telefono_cliente,
      correo_cliente: req.body.correo_cliente,
      huella_cliente: req.body.huella_cliente,
      fecha_registro_cliente: req.body.fecha_registro_cliente,
    });
  } catch (error) {
    handleSqlError(error, res);
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM CLIENTES WHERE id_cliente = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    return res.json({ message: "Cliente eliminado" });
  } catch (error) {
    handleSqlError(error, res);
  }
};
