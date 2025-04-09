"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const redirectToDashboard = (role: string) => {
    const routes: Record<string, string> = {
      admin: "/admin/dashboard",
      praktikan: "/praktikan/dashboard",
      asisten: "/asisten/dashboard",
    };

    const route = routes[role] || "/dashboard";
    router.push(route);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token && role) {
      redirectToDashboard(role);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal!");
      }

      Cookies.set("token", data.token, { expires: 1 });
      Cookies.set("role", data.user.role, { expires: 1 });
      Cookies.set("userId", data.user.id, { expires: 1 });

      redirectToDashboard(data.user.role);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui!");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center font-nunito">
      <div className="flex w-full h-full bg-white shadow-xl overflow-hidden">
        {/* KIRI */}
        <div className="relative hidden md:flex w-1/2 h-full">
          <Image 
            src="/teknik-komputer.jpg"
            alt="Login Illustration"
            fill
            className="object-cover"
          />
        </div>

        {/* KANAN */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-12 h-full">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-4">
              <Image 
                src="https://ugc.production.linktr.ee/wDJz56aeTbK1fX6Xhr8t_CSagowYHYDXjdslc" 
                alt="Logo UNDIP" 
                width={80} 
                height={80} 
              />
            </div>

            <h2 className="text-3xl font-bold text-blue-600 text-center">Login</h2>

            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
              <label className="block">
                <span className="text-black">Email</span>
                <input
                  type="email"
                  placeholder="Masukkan email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-400 text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="block">
                <span className="text-black">Password</span>
                <input
                  type="password"
                  placeholder="Masukkan password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-400 text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Log in
              </button>
            </form>

            <div className="mt-4 text-center">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Lupa password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
