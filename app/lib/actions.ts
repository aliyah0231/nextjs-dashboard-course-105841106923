'use server';

import postgres from "postgres";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

// Koneksi ke Neon (pastikan sudah set DATABASE_URL di .env)
const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi" };
  }

  // Cek user
  const [user] = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (!user) {
    return { error: "User tidak ditemukan" };
  }

  // Cocokkan password
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return { error: "Password salah" };
  }

  // Simpan session di cookie
  const cookieStore = await cookies();
  cookieStore.set("session_id", user.id, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 // 1 hari
  });

  return { success: true };
}
