// routes/penilaianRoutes.mjs
import express from 'express';
import {
    createPenilaian,
    updateNilaiTP,
    updateNilaiLaporan,
    updateNilaiPraktikum,
    updateNilaiFD,
    updateNilaiResponsi,
    getPenilaian,
    deletePenilaian
} from '../controllers/penilaianController.js';

const router = express.Router();

// Routes
router.post('/', createPenilaian);
router.put('/:id/tp', updateNilaiTP);
router.put('/:id/laporan', updateNilaiLaporan);
router.put('/:id/praktikum', updateNilaiPraktikum);
router.put('/:id/fd', updateNilaiFD);
router.put('/:id/responsi', updateNilaiResponsi);
router.get('/', getPenilaian);
router.delete('/:id', deletePenilaian);

export default router;
