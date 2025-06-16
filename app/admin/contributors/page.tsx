"use client";

import { useState } from "react";
import AdminLayout from "@/app/admin/components/Adminlayout";
import { Pencil, Trash2, Search } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface Contributor {
  id: number;
  name: string;
  email: string;
  role: "contributeur" | "admin" | "superadmin";
  active: boolean;
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([
    { id: 1, name: "Alice Nguema", email: "alice@example.com", role: "contributeur", active: true },
    { id: 2, name: "Marc Obiang", email: "marc@example.com", role: "admin", active: true },
    { id: 3, name: "Sophie Mba", email: "sophie@example.com", role: "contributeur", active: false },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [isOpen, setIsOpen] = useState(false);
  const [editingContributor, setEditingContributor] = useState<Contributor | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Contributor>();

  const filteredContributors = contributors.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : statusFilter === "active" ? c.active : !c.active;

    return matchesSearch && matchesStatus;
  });

  const onSubmit = (data: Contributor) => {
    if (editingContributor) {
      setContributors(prev =>
        prev.map(c => (c.id === editingContributor.id ? { ...c, role: data.role } : c))
      );
    }
    closeModal();
  };

  const openModal = (contributor: Contributor) => {
    setEditingContributor(contributor);
    reset({ ...contributor });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingContributor(null);
    reset();
  };

  const deleteContributor = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce contributeur ?")) {
      setContributors(prev => prev.filter(c => c.id !== id));
    }
  };

  const toggleActiveStatus = (id: number) => {
    setContributors(prev =>
      prev.map(c => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <AdminLayout>
      {/* Titre et filtres */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 flex-wrap">
        <h1 className="text-3xl font-bold">Gestion des contributeurs</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Rechercher un contributeur..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
            className="text-sm border border-gray-300 rounded px-3 py-2 max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="inactive">Désactivés</option>
          </select>
        </div>
      </div>

      {/* Tableau responsive / affichage en cartes sur mobile */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="hidden sm:table-header-group bg-gray-100 text-left text-sm md:text-base">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm md:text-base divide-y sm:table-row-group">
            {filteredContributors.length > 0 ? (
              filteredContributors.map((contributor) => (
                <tr
                  key={contributor.id}
                  className={`block sm:table-row bg-white border sm:border-0 rounded-lg sm:rounded-none mb-4 sm:mb-0 ${
                    contributor.active ? "" : "opacity-50"
                  }`}
                >
                  <td className="block sm:table-cell px-4 py-2">
                    <span className="font-semibold sm:hidden">Nom : </span>
                    {contributor.name}
                  </td>
                  <td className="block sm:table-cell px-4 py-2 break-words">
                    <span className="font-semibold sm:hidden">Email : </span>
                    {contributor.email}
                  </td>
                  <td className="block sm:table-cell px-4 py-2 capitalize">
                    <span className="font-semibold sm:hidden">Rôle : </span>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${
                        contributor.role === "admin"
                          ? "bg-red-600"
                          : contributor.role === "superadmin"
                          ? "bg-purple-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {contributor.role}
                    </span>
                  </td>
                  <td className="block sm:table-cell px-4 py-2">
                    <span className="font-semibold sm:hidden">Statut : </span>
                    {contributor.active ? "Actif" : "Désactivé"}
                  </td>
                  <td className="block sm:table-cell px-4 py-2">
                    <span className="font-semibold sm:hidden">Actions : </span>
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => openModal(contributor)}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => toggleActiveStatus(contributor.id)}
                        className="text-yellow-600 hover:text-yellow-800 text-sm"
                      >
                        {contributor.active ? "Désactiver" : "Activer"}
                      </button>
                      <button
                        onClick={() => deleteContributor(contributor.id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  Aucun contributeur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal édition */}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed z-50 inset-0 flex items-center justify-center p-4"
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <Dialog.Panel className="relative bg-white p-6 rounded-xl w-full max-w-md z-50 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Modifier le rôle de {editingContributor?.name}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="role">
                Rôle
              </label>
              <select
                id="role"
                {...register("role", { required: "Le rôle est requis" })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="contributeur">Contributeur</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
              {errors.role && (
                <p className="text-red-600 text-xs mt-1">{errors.role.message}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </AdminLayout>
  );
}
