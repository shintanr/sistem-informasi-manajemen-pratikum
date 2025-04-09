// controllers/penilaianController.mjs
import pool from '../config/database.js';

// Create Penilaian
export const createPenilaian = async (req, res) => {
    const { id_user, id_kelompok, id_modul, id_shift } = req.body; // Hanya menyimpan informasi dasar
    try {
        const [result] = await pool.query(
            'INSERT INTO Penilaian (id_user, id_kelompok, id_modul, id_shift) VALUES (?, ?, ?, ?)',
            [id_user, id_kelompok, id_modul, id_shift]
        );
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Nilai TP
export const updateNilaiTP = async (req, res) => {
    const { id } = req.params;
    const { nilai_tp } = req.body;

    // Validasi
    if (nilai_tp === undefined) {
        return res.status(400).json({ message: 'Nilai TP is required' });
    }

    console.log('Updating Penilaian with ID:', id);
    console.log('New Nilai TP:', nilai_tp);

    try {
        const [result] = await pool.query(
            'UPDATE Penilaian SET nilai_tp = ? WHERE id = ?',
            [nilai_tp, id]
        );
        console.log('Affected Rows:', result.affectedRows);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Penilaian not found' });
        }

        res.status(200).json({ message: 'Nilai TP updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Nilai Laporan
export const updateNilaiLaporan = async (req, res) => {
    const { id } = req.params;
    const { nilai_laporan_tugas } = req.body;

    // Validasi
    if (nilai_laporan_tugas === undefined) {
        return res.status(400).json({ message: 'Nilai Laporan Tugas is required' });
    }

    console.log('Updating Penilaian Laporan with ID:', id);
    console.log('New Nilai Laporan Tugas:', nilai_laporan_tugas);

    try {
        const [result] = await pool.query(
            'UPDATE Penilaian SET nilai_laporan_tugas = ? WHERE id = ?',
            [nilai_laporan_tugas, id]
        );
        console.log('Affected Rows:', result.affectedRows);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Penilaian not found' });
        }

        res.status(200).json({ message: 'Nilai Laporan updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Nilai Praktikum
export const updateNilaiPraktikum = async (req, res) => {
    const { id } = req.params;
    const { nilai_praktikum } = req.body;

    // Validasi
    if (nilai_praktikum === undefined) {
        return res.status(400).json({ message: 'Nilai Praktikum is required' });
    }

    console.log('Updating Penilaian Praktikum with ID:', id);
    console.log('New Nilai Praktikum:', nilai_praktikum);

    try {
        const [result] = await pool.query(
            'UPDATE Penilaian SET nilai_praktikum = ? WHERE id = ?',
            [nilai_praktikum, id]
        );
        console.log('Affected Rows:', result.affectedRows);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Penilaian not found' });
        }

        res.status(200).json({ message: 'Nilai Praktikum updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Nilai FD
export const updateNilaiFD = async (req, res) => {
    const { id } = req.params;
    const { nilai_fd } = req.body;

    // Validasi
    if (nilai_fd === undefined) {
        return res.status(400).json({ message: 'Nilai FD is required' });
    }

    console.log('Updating Penilaian FD with ID:', id);
    console.log('New Nilai FD:', nilai_fd);

    try {
        const [result] = await pool.query(
            'UPDATE Penilaian SET nilai_fd = ? WHERE id = ?',
            [nilai_fd, id]
        );
        console.log('Affected Rows:', result.affectedRows);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Penilaian not found' });
        }

        res.status(200).json({ message: 'Nilai FD updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Nilai Responsi
export const updateNilaiResponsi = async (req, res) => {
    const { id } = req.params;
    const { nilai_responsi } = req.body;

    // Validasi
    if (nilai_responsi === undefined) {
        return res.status(400).json({ message: 'Nilai Responsi is required' });
    }

    console.log('Updating Penilaian Responsi with ID:', id);
    console.log('New Nilai Responsi:', nilai_responsi);

    try {
        const [result] = await pool.query(
            'UPDATE Penilaian SET nilai_responsi = ? WHERE id = ?',
            [nilai_responsi, id]
        );
        console.log('Affected Rows:', result.affectedRows);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Penilaian not found' });
        }

        res.status(200).json({ message: 'Nilai Responsi updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Read Penilaian
export const getPenilaian = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Penilaian');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete Penilaian
export const deletePenilaian = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Penilaian WHERE id = ?', [id]);
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
