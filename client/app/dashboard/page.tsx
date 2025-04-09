'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Definisikan tipe data untuk modul
interface Module {
  id: string; // Ganti dengan tipe yang sesuai
  name: string;
  modul: string;
  description?: string; // Tambahkan jika ada deskripsi
}

function Page() {
  const [labs, setLabs] = useState<string[]>([]);
  const [selectedLab, setSelectedLab] = useState<string>("");
  const [modules, setModules] = useState<Module[]>([]); // Ganti any[] dengan Module[]
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchLabs() {
      try {
        const response = await fetch("http://localhost:8080/api/lab");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setLabs(data.data);
          setSelectedLab(data.data[0] || ""); // Set default jika ada data
        } else {
          setError("Invalid response format from server");
        }
      } catch (err) {
        console.error("Error fetching labs:", err);
        setError("Failed to fetch labs");
      }
    }

    fetchLabs();
  }, []);

  useEffect(() => {
    if (!selectedLab) return; // Hindari fetch jika selectedLab kosong

    async function fetchModules() {
      setLoading(true);
      setError("");

      let apiUrl = `http://localhost:8080/api/lab/${selectedLab.replace(/\s+/g, "-").toLowerCase()}`;
      if (selectedLab === "Lab RPL") {
        apiUrl = "http://localhost:8080/api/lab/lab-rpl/1";
      } else if (selectedLab === "Lab Sister") {
        apiUrl = "http://localhost:8080/api/lab/lab-sister/4";
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setModules(data.data || []);
      } catch (err) {
        console.error("Error fetching modules:", err);
        setError("Failed to fetch modules");
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, [selectedLab]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white h-screen shadow-lg flex flex-col justify-between p-4">
        <div className="flex flex-col items-center justify-center mb-6 mt-8">
          <Image 
            src="https://ugc.production.linktr.ee/wDJz56aeTbK1fX6Xhr8t_CSagowYHYDXjdslc" 
            alt="Lab Logo" 
            width={80} 
            height={80} 
          />
        </div>

        <div className="relative mb-4">
          <select
            className="w-full p-2 border rounded-md text-black"
            value={selectedLab}
            onChange={(e) => setSelectedLab(e.target.value)}
          >
            {labs.map((lab, index) => (
              <option key={index} value={lab}>{lab}</option>
            ))}
          </select>

          <nav className="mt-6">
            <ul className="space-y-4">
              {[
                { href: "/jadwal-praktikum", img: "/jadwal-praktikum.svg", label: "Jadwal Praktikum" },
                { href: "/presensi", img: "/presensi.svg", label: "Presensi" },
                { href: "/submission", img: "/submission.svg", label: "Submission" },
                { href: "/penilaian", img: "/penilaian.svg", label: "Penilaian" }
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Image src={item.img} alt={item.label} width={20} height={20} />
                  <Link href={item.href} className="text-black hover:underline">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>        
        </div>
        <div className="mt-10">
          <Link href="#" className="flex items-center text-gray-600 px-4 py-2 hover:bg-gray-200 rounded-lg">
            <Image src="/account.svg" alt="Account Setting" width={20} height={20} className="mr-2" />
            Account Setting
          </Link>
          <Link href="#" className="flex items-center text-gray-600 px-4 py-2 hover:bg-gray-200 rounded-lg">
            <Image src="/logout.svg" alt="Logout" width={20} height={20} className="mr-2" />
            Log out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">{selectedLab || "Select a Lab"}</h1>
          <div className="flex items-center gap-4 mt-[-50px]">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <span className="text-black">Farhan Hussein</span>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.length > 0 ? (
                modules.map((module, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                  >
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {module.name || "Module Name"}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Modul ID: {module.modul || "N/A"}
                    </p>
                    <Link
                      href={`/praktikum/prak-eldas/${module.id}`} // Pastikan menggunakan ID yang benar
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-gray-500">No modules available</p>
              )}

            <div className="col-span-1">
              <Link
                href="/add-practicum" // Ganti dengan rute yang sesuai untuk menambahkan praktikum
                className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600"
              >
                Add Practicum
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Page;
