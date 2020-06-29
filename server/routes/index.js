import express from "express";

import { getRows, saveCell } from '../controllers'
import { validateRequest } from '../middlewares'
import { saveCellSchema } from './schema'

const router = express.Router();

router.get("/", getRows);

router.post("/", validateRequest(saveCellSchema), saveCell);

export default router;
