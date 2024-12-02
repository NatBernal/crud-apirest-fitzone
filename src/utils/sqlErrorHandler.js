export const handleSqlError = (error, res) => {
  if (error.number === 2627) {
    res.status(400).json({
      error: "Ya existe un registro con el ID proporcionado.",
    });
  } else if (error.number === 547) {
    res.status(400).json({
      error: "Violación de restricción de llave foránea.",
    });
  } else {
    res.status(500).json({
      error: "Error inesperado en la base de datos.",
      details: error.message,
    });
  }
};
