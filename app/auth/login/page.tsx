"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-[800px] h-[500px] flex rounded-xl shadow-lg overflow-hidden bg-white">
        
        {/* Left side (Welcome) */}
        <div className="w-1/2 bg-gradient-to-br from-teal-900 to-green-600 text-white flex flex-col items-center justify-center px-5">
          <h1 className="text-3xl font-bold mb-2">MBOLO !</h1>
          <p className="text-sm text-center px-4">
            Inscrivez-vous pour commencer à explorer notre plateforme.
          </p>
        </div>

        {/* Right side (Form) */}
        <div className="w-1/2 bg-white px-10 py-10 relative">
          <h2 className="text-2xl font-semibold text-center mb-6 text-green-900">Connection</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition duration-200"
              >
               se connecter
              </button>
            </div>
          </form>

          <div className="text-sm text-center mt-6">
            Déjà un compte ?{" "}
            <Link href="/auth/register" className="text-green-600 font-medium hover:underline">
              S&apos;inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
