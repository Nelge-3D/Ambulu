// app/admin/page.tsx

"use client";

import AdminLayout from "@/app/admin/components/Adminlayout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Exemple avec localStorage / token
    localStorage.removeItem("token"); // ou firebase.auth().signOut(), etc.
    router.push("/login"); // redirige vers la page de connexion
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h1 className="text-3xl font-bold">Bienvenue Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Déconnexion
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ title, href }) => (
          <a
            key={title}
            href={href}
            className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition bg-white text-black"
          >
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Gérer la section {title.toLowerCase()}.
            </p>
          </a>
        ))}
      </div>
    </AdminLayout>
  );
}

const cards = [
  { title: "Cours", href: "/admin/courses" },
  { title: "Contributeurs", href: "/admin/contributors" },
  { title: "Dictionnaire", href: "/admin/dictionary" },
  { title: "Vue d'activité", href: "/admin/activity" },
];
