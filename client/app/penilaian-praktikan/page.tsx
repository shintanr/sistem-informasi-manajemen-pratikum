'use client';

import React, { useState } from 'react';
import Head from 'next/head';

const Penilaian = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Penilaian</title>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="font-nunito flex flex-col h-screen">
        <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
          <nav className="flex-1 flex justify-center space-x-6">
            {['Praktikum', 'Jadwal Praktikum', 'Presensi', 'Submission', 'Penilaian'].map((item, index) => (
              <a key={index} href="#" className="nav-link flex items-center space-x-1 border-b-2 border-transparent hover:text-[#FFFF77] hover:border-[#FFFF77] font-bold">
                <img src={`/${item.toLowerCase().replace(' ', '-')}.svg`} alt={item} className="w-5 h-5 mr-2 filter invert brightness-0" />
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-3 pe-16">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <span>Farhan Hussein</span>
          </div>
        </header>

        <div className="bg-blue-600 h-[30vh] w-full flex flex-col items-start justify-center relative ps-20 pb-10">
          <h1 className="text-3xl font-bold text-white font-nunito">TABEL PENILAIAN</h1>
        </div>

        <div className="bg-white h-[70vh] w-full flex flex-col items-center justify-start  relative">
          <div className="absolute top-[-64px] w-[90%] max-w-8xl bg-white rounded-xl shadow-md p-6 flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <h2 className="text-lg font-semibold text-black">Penilaian Praktikan</h2>
              </div>
              <div className="flex space-x-2 justify-items-end">
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm text-sm flex items-center gap-2"
                  >
                    Shift 1 (10.00 - 11.30)
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      <ul className="py-1 text-gray-700 text-sm">
                        {['Shift 1 (10.00 - 11.30)', 'Shift 2 (11.30 - 13.00)', 'Shift 3 (13.00 - 14.30)'].map((shift, index) => (
                          <li key={index}>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100">{shift}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm text-sm">
                  ⏳ Export
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 w-[90%] max-w-8xl mx-auto bg-white rounded-xl shadow-md p-6 text-black">
            <div className="flex justify-between items-center mt-4">
              <div className="relative">
                <input type="text" placeholder="🔍 Search" className="px-4 py-2 border rounded-md text-sm w-60" />
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm">⚙ Filters</button>
            </div>

            <div className="mt-6 border border-gray-300 rounded-md shadow-sm overflow-hidden">
              <iframe
                src="https://docs.google.com/spreadsheets/d/1nLjcC-uzoyJGOvfMZq4xZVP05AGmJGcOXcGJbcmsx2g/preview"
                width="100%"
                height="400"
                style={{ border: "none" }}
                className="rounded-md"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Penilaian;
