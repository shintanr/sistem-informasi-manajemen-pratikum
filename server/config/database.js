import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
})

// Fungsi untuk mengambil daftar lab
export async function getLabs() {
  const [rows] = await pool.query("SELECT * FROM labs")
  return rows
}

// Fungsi untuk mengambil data praktikum berdasarkan lab_id
export async function getPraktikumDataByLabId(labId) {
  const [rows] = await pool.query("SELECT * FROM praktikum WHERE lab_id = ?", [labId])
  return rows
}

// Fungsi untuk mengambil data modul berdasarkan praktikum_id
export async function getModulesEldasByPraktikumId(praktikumId) {
  const [rows] = await pool.query("SELECT * FROM modul_eldas WHERE id_praktikum = ?", [praktikumId])
  return rows
}

// Panggil testDatabaseQueries hanya jika file ini dijalankan langsung, bukan diimpor
if (import.meta.url === `file://${process.argv[1]}`) {
  testDatabaseQueries()
}


export default pool;