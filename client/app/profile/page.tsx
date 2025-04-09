"use client";

import { useEffect, useState } from "react";

interface User {
  id_user: number;
  full_name: string;
  email: string;
  role: string;
  angkatan: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Gagal memuat profil");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;

  if (!user)
    return (
      <div className="p-4 text-red-500">Gagal memuat data profil pengguna.</div>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-semibold mb-4 text-center">Profil Pengguna</h1>
      <div className="space-y-2">
        <div><strong>ID:</strong> {user.id_user}</div>
        <div><strong>Nama:</strong> {user.full_name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Role:</strong> {user.role}</div>
        <div><strong>Angkatan:</strong> {user.angkatan}</div>
      </div>
    </div>
  );
}
