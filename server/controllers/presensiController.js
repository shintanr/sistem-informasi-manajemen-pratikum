import db from "../config/database.js"; // Pastikan path ini sesuai dengan lokasi config database

// ✅ Ambil semua presensi
export const getAllPresensi = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM presensi");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data presensi", error });
    }
};

// ✅ Ambil presensi berdasarkan ID
export const getPresensiById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM presensi WHERE id = ?", [id]);

        if (rows.length === 0) return res.status(404).json({ message: "Presensi tidak ditemukan" });

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil presensi", error });
    }
};

// ambil presensi semua presensi pada shift tertentu
export const getPresensiByModuleId = async (req, res) => {
    try {
        const { id_modul } = req.params; // Ambil id_modul dari parameter URL
        const [rows] = await db.query(`
            SELECT id, id_user, id_praktikum, id_modul, id_shift, status, waktu_presensi
            FROM presensi
            WHERE id_modul = ?
        `, [id_modul]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Tidak ada presensi untuk modul ini" });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data presensi", error });
    }
};



// ✅ Ambil presensi berdasarkan ID Shift
// ✅ Ambil presensi berdasarkan ID Shift tanpa JOIN
export const getPresensiShiftById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(`
            SELECT * FROM presensi WHERE id_shift = ?
        `, [id]);

        if (rows.length === 0) return res.status(404).json({ message: "Tidak ada presensi untuk shift ini" });

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil presensi", error });
    }
};




// ✅ Tambah presensi baru
export const createPresensi = async (req, res) => {
    try {
        const { id_user, id_praktikum, id_modul, id_shift, status } = req.body;

        // Validasi input (Pastikan semua field diisi)
        if (!id_user || !id_praktikum || !id_modul || !id_shift || !status) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        // Validasi ENUM status (Pastikan hanya menerima 'Hadir', 'Izin', 'Sakit', atau 'Alpa')
        const validStatuses = ["Hadir", "Izin", "Sakit", "Alpa"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Status tidak valid" });
        }

        // Masukkan ke database
        const query = `
            INSERT INTO presensi (id_user, id_praktikum, id_modul, id_shift, status) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        await db.execute(query, [id_user, id_praktikum, id_modul, id_shift, status]);

        res.status(201).json({ message: "Presensi berhasil ditambahkan" });
    } catch (error) {
        console.error("Error saat menambahkan presensi:", error);
        res.status(500).json({ message: "Gagal menambahkan presensi", error: error.message });
    }
};


// ✅ Perbarui presensi
export const updatePresensi = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_user, id_praktikum, id_modul, id_shift, status } = req.body;

        // Validasi input tidak boleh kosong atau null
        if (!id_user || !id_praktikum || !id_modul || !id_shift || !status) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        // Periksa apakah presensi dengan ID tersebut ada
        const [existingPresensi] = await db.execute(
            "SELECT * FROM presensi WHERE id = ?", 
            [id]
        );

        if (existingPresensi.length === 0) {
            return res.status(404).json({ message: "Presensi tidak ditemukan" });
        }

        // Cek apakah data yang dikirim sama dengan data yang ada
        const existingData = existingPresensi[0];
        if (
            existingData.id_user === id_user &&
            existingData.id_praktikum === id_praktikum &&
            existingData.id_modul === id_modul &&
            existingData.id_shift === id_shift &&
            existingData.status === status
        ) {
            return res.status(200).json({ message: "Tidak ada perubahan data, presensi sudah terbaru" });
        }

        // Lakukan update jika ada perubahan
        await db.execute(
            "UPDATE presensi SET id_user = ?, id_praktikum = ?, id_modul = ?, id_shift = ?, status = ? WHERE id = ?", 
            [id_user, id_praktikum, id_modul, id_shift, status, id]
        );

        res.status(200).json({ message: "Presensi berhasil diperbarui" });

    } catch (error) {
        console.error("Gagal memperbarui presensi:", error);
        res.status(500).json({ message: "Gagal memperbarui presensi", error: error.message });
    }
};


// ✅ Hapus presensi
export const deletePresensi = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM presensi WHERE id = ?", [id]);

        res.status(200).json({ message: "Presensi berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus presensi", error });
    }
};



// summary
// ✅ Ambil summary presensi berdasarkan ID Praktikum
export const getPresensiSummaryByPraktikum = async (req, res) => {
    try {
        const { id_praktikum } = req.params;
        console.log("ID Praktikum:", id_praktikum); // Debugging

        if (!id_praktikum) {
            return res.status(400).json({ message: "ID Praktikum tidak ditemukan" });
        }

        // Ambil total jumlah praktikan dalam praktikum tertentu
        const [totalPraktikan] = await db.execute(
            `SELECT COUNT(DISTINCT id_user) AS total 
            FROM users 
            WHERE role = 'praktikan' 
            AND id_user IN (SELECT DISTINCT id_user FROM presensi WHERE id_praktikum = ?)`,
            [id_praktikum]
        );

        // Ambil jumlah tiap status presensi dalam praktikum tertentu
        const [presensiData] = await db.execute(
            `SELECT 
                SUM(CASE WHEN status = 'Hadir' THEN 1 ELSE 0 END) AS hadir,
                SUM(CASE WHEN status = 'Belum Hadir' THEN 1 ELSE 0 END) AS belum_hadir,
                SUM(CASE WHEN status = 'Telat' THEN 1 ELSE 0 END) AS telat,
                SUM(CASE WHEN status = 'Izin' THEN 1 ELSE 0 END) AS izin,
                SUM(CASE WHEN status = 'Alpa' THEN 1 ELSE 0 END) AS alpa
            FROM presensi
            WHERE id_praktikum = ?`,
            [id_praktikum]
        );

        // Kirim response JSON
        res.status(200).json({
            id_praktikum,
            totalPraktikan: totalPraktikan[0].total || 0,
            belumHadir: presensiData[0].belum_hadir || 0,
            hadir: presensiData[0].hadir || 0,
            telat: presensiData[0].telat || 0,
            alpa: presensiData[0].alpa || 0,
            izin: presensiData[0].izin || 0
        });

    } catch (error) {
        console.error("Error mengambil data presensi:", error);
        res.status(500).json({ message: "Gagal mengambil data presensi", error: error.message });
    }
};


// ✅ Ambil summary presensi berdasarkan ID User
