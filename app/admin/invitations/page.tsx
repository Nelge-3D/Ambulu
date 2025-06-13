import AdminLayout from "@/app/admin/components/Adminlayout";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Bienvenue Admin</h1>

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