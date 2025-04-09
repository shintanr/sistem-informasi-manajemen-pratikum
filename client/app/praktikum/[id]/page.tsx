'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Definisikan tipe data untuk modul
interface Module {
  id: string;
  name: string;
  modul: string;
  description: string; // Sesuaikan dengan struktur data Anda
}

const PraktikumDetail: React.FC = () => {
  const router = useRouter();
  const { prakId } = router.query; // Mengambil ID dari URL
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!prakId) return; // Hindari fetch jika prakId kosong

    async function fetchModuleDetail() {
      try {
        const response = await fetch(`http://localhost:8080/api/praktikum/prak-eldas/${prakId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setModule(data.data);
      } catch (err) {
        console.error("Error fetching module detail:", err);
        setError("Failed to fetch module details");
      } finally {
        setLoading(false);
      }
    }

    fetchModuleDetail();
  }, [prakId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {module ? (
        <>
          <h1 className="text-2xl font-bold">{module.name}</h1>
          <p>Modul ID: {module.modul}</p>
          <p>{module.description}</p> {/* Asumsikan ada deskripsi dalam data */}
          {/* Tambahkan informasi lain yang relevan di sini */}
        </>
      ) : (
        <p className="text-gray-500">Module not found</p>
      )}
    </div>
  );
};

export default PraktikumDetail;
