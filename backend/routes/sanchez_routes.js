import express from 'express';
import { getNombre } from '../controllers/sanchez_controller.js';

const router = express.Router();
router.get('/sanchez', getNombre);

export default router;
