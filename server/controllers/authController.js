import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

// ====================
// REGISTER
// ====================
export const register = async (req, res) => {
  const { full_name, email, nim, password, role, angkatan } = req.body;

  try {
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ? OR nim = ?",
      [email, nim]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email atau NIM sudah terdaftar!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (full_name, email, nim, password, role, angkatan) VALUES (?, ?, ?, ?, ?, ?)",
      [full_name, email, nim, hashedPassword, role, angkatan]
    );

    res.status(201).json({ message: "Akun berhasil didaftarkan!" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan!", error: error.message });
  }
};

// ====================
// LOGIN
// ====================

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    const validUser = user[0];
    const isMatch = await bcrypt.compare(password, validUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
      { id: validUser.id_user, role: validUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // === Set token ke dalam cookie ===
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true jika sudah pakai https
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 jam
    });

    res.json({
      message: "Login berhasil!",
      user: {
        id: validUser.id_user,
        full_name: validUser.full_name,
        role: validUser.role,
        angkatan: validUser.angkatan,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan!", error: error.message });
  }
};


export const logoutUser = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Tidak ada token untuk dihapus" });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logout berhasil" });
};

