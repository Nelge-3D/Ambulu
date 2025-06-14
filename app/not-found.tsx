// pages/404.js

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0E0E0]">
      <div className="bg-white rounded-2xl shadow-md text-center px-8 py-12 w-full max-w-lg">
        <h1 className="text-[120px] font-bold text-green-500 opacity-20">404</h1>
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          Désolé, page introuvable
        </h2>
        <p className="text-green-600 mb-6">
          La page que vous avez demandée est introuvable
        </p>
        <Link href="/" passHref>
          <div className="inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium shadow hover:bg-green-800 transition cursor-pointer">
            RENTRER À LA MAISON
          </div>
        </Link>
      </div>
    </div>
  );
}
