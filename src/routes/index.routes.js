import { Router } from "express";

import {
  getSedes,
  getSede,
  createSede,
  updateSede,
  deleteSede,
} from "../controllers/sedes.controllers.js";

import {
  getTiposDoc,
  getTipoDoc,
  createTipoDoc,
  updateTipoDoc,
  deleteTipoDoc,
} from "../controllers/tipodoc.controllers.js";

import {
  getPromociones,
  getPromocion,
  createPromocion,
  updatePromocion,
  deletePromocion,
} from "../controllers/promociones.controllers.js";

import {
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/clientes.controllers.js";

import {
  getAsistencias,
  getAsistencia,
  createAsistencia,
  updateAsistencia,
  deleteAsistencia,
} from "../controllers/asistencias.controllers.js";

import {
  getMembresias,
  getMembresia,
  createMembresia,
  updateMembresia,
  deleteMembresia,
} from "../controllers/membresias.controllers.js";

import {
  getEvalFisicas,
  getEvalFisica,
  createEvalFisica,
  updateEvalFisica,
  deleteEvalFisica,
} from "../controllers/evalfisic.controllers.js";

import {
  getMembresiasPromocion,
  getMembresiaPromocion,
  createMembresiaPromocion,
  deleteMembresiaPromocion,
} from "../controllers/memb_promo.controllers.js";

const router = Router();

router.get("/sedes", getSedes);
router.get("/sedes/:id", getSede);
router.post("/sedes", createSede);
router.put("/sedes/:id", updateSede);
router.delete("/sedes/:id", deleteSede);

router.get("/tipodoc", getTiposDoc);
router.get("/tipodoc/:id", getTipoDoc);
router.post("/tipodoc", createTipoDoc);
router.put("/tipodoc/:id", updateTipoDoc);
router.delete("/tipodoc/:id", deleteTipoDoc);

router.get("/promociones", getPromociones);
router.get("/promociones/:id", getPromocion);
router.post("/promociones", createPromocion);
router.put("/promociones/:id", updatePromocion);
router.delete("/promociones/:id", deletePromocion);

router.get("/clientes", getClientes);
router.get("/clientes/:id", getCliente);
router.post("/clientes", createCliente);
router.put("/clientes/:id", updateCliente);
router.delete("/clientes/:id", deleteCliente);

router.get("/asistencias", getAsistencias);
router.get("/asistencias/:id", getAsistencia);
router.post("/asistencias", createAsistencia);
router.put("/asistencias/:id", updateAsistencia);
router.delete("/asistencias/:id", deleteAsistencia);

router.get("/membresias", getMembresias);
router.get("/membresias/:id", getMembresia);
router.post("/membresias", createMembresia);
router.put("/membresias/:id", updateMembresia);
router.delete("/membresias/:id", deleteMembresia);

router.get("/evalfisicas", getEvalFisicas);
router.get("/evalfisicas/:id", getEvalFisica);
router.post("/evalfisicas", createEvalFisica);
router.put("/evalfisicas/:id", updateEvalFisica);
router.delete("/evalfisicas/:id", deleteEvalFisica);

router.get("/membresias_promocion", getMembresiasPromocion);
router.get(
  "/membresias_promocion/:id_promocion/:id_membresia",
  getMembresiaPromocion
);
router.post("/membresias_promocion", createMembresiaPromocion);
router.delete(
  "/membresias_promocion/:id_promocion/:id_membresia",
  deleteMembresiaPromocion
);

export default router;
