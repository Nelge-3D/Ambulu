"use client";

import { useState, useEffect,} from "react";
import AdminLayout from "@/app/admin/components/Adminlayout";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface Course {
  id: number;
  title: string;
  language: string;
  active: boolean;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: "Introduction au Fang", language: "Fang", active: true },
    { id: 2, title: "Grammaire Nzebi", language: "Nzebi", active: true },
    { id: 3, title: "Expressions courantes en Teke", language: "Teke", active: true },
  ]);

  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const { register, handleSubmit, reset, formState: { errors }, setFocus } = useForm<Course>();

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.language.toLowerCase().includes(search.toLowerCase());
    
    const matchesLanguage = languageFilter === "all" || course.language === languageFilter;
    
    return matchesSearch && matchesLanguage;
  });

  const languages = Array.from(new Set(courses.map(course => course.language)));

  const onSubmit = (data: Course) => {
    if (editingCourse) {
      setCourses(prev =>
        prev.map(c => (c.id === editingCourse.id ? { ...c, ...data } : c))
      );
    } else {
      setCourses(prev => [...prev, { ...data, id: Date.now(), active: true }]);
    }
    closeModal();
  };

  const openModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      reset(course);
    } else {
      setEditingCourse(null);
      reset({ title: "", language: "", active: true });
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingCourse(null);
    reset();
  };

  const toggleActiveStatus = (id: number) => {
    setCourses(prev =>
      prev.map(c => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  const deleteCourse = (id: number) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setShowDeleteConfirm(null);
  };

  // Focus le premier champ quand la modale s'ouvre
  useEffect(() => {
    if (isOpen) setFocus("title");
  }, [isOpen, setFocus]);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des cours</h1>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          <Plus size={16} /> Ajouter un cours
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 flex-1">
          <Search className="text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Rechercher un cours..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            aria-label="Rechercher un cours"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="languageFilter" className="text-sm font-medium">
            Filtrer par langue
          </label>
          <select
            id="languageFilter"
            value={languageFilter}
            onChange={e => setLanguageFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-2"
            aria-label="Sélectionner une langue"
          >
            <option value="all">Toutes les langues</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Langue</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y">
            {filteredCourses.map((course) => (
              <tr key={course.id} className={!course.active ? "opacity-50" : ""}>
                <td className="px-4 py-2">{course.title}</td>
                <td className="px-4 py-2">
                  <span 
                    className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    role="status"
                    aria-label={`Langue: ${course.language}`}
                  >
                    {course.language}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span 
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      course.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                    role="status"
                    aria-label={`Statut: ${course.active ? "Actif" : "Inactif"}`}
                  >
                    {course.active ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => openModal(course)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label={`Modifier le cours ${course.title}`}
                    title="Modifier"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => toggleActiveStatus(course.id)}
                    className="text-yellow-600 hover:text-yellow-800"
                    aria-label={course.active ? "Désactiver le cours" : "Activer le cours"}
                    title={course.active ? "Désactiver" : "Activer"}
                  >
                    {course.active ? "Désactiver" : "Activer"}
                  </button>
                  {showDeleteConfirm === course.id ? (
                    <div className="inline-flex gap-2" role="group" aria-label="Confirmation de suppression">
                      <button
                        onClick={() => deleteCourse(course.id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Confirmer la suppression"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="text-gray-600 hover:text-gray-800"
                        aria-label="Annuler la suppression"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(course.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Supprimer le cours ${course.title}`}
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredCourses.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  Aucun cours trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed z-50 inset-0 flex items-center justify-center"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <Dialog.Panel className="relative bg-white p-6 rounded-xl w-[90%] max-w-md z-50 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">
            {editingCourse ? "Modifier un cours" : "Ajouter un cours"}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Titre <span className="text-red-600">*</span>
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Le titre est requis" })}
                className={`w-full border rounded px-3 py-2 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete="off"
              />
              {errors.title && (
                <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="language">
                Langue <span className="text-red-600">*</span>
              </label>
              <input
                id="language"
                type="text"
                {...register("language", { required: "La langue est requise" })}
                className={`w-full border rounded px-3 py-2 ${
                  errors.language ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete="off"
              />
              {errors.language && (
                <p className="text-red-600 text-xs mt-1">{errors.language.message}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                {editingCourse ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>
    </AdminLayout>
  );
}