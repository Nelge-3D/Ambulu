"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/app/admin/components/Adminlayout";
import { Plus, Pencil, Trash2 } from "lucide-react";
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

  useEffect(() => {
    if (isOpen) setFocus("title");
  }, [isOpen, setFocus]);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Gestion des Cours</h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={18} /> Ajouter un cours
          </button>
        </div>

        <input
          type="text"
          placeholder="Recherche par titre ou langue"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="border p-2 rounded mb-4"
        >
          <option value="all">Toutes les langues</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.language}</p>
              <p className={`text-sm ${course.active ? "text-green-600" : "text-red-600"}`}>
                {course.active ? "Actif" : "Inactif"}
              </p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openModal(course)} className="text-blue-600">
                  <Pencil size={18} />
                </button>
                <button onClick={() => setShowDeleteConfirm(course.id)} className="text-red-600">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => toggleActiveStatus(course.id)} className="text-gray-600">
                  Toggle
                </button>
              </div>
              {showDeleteConfirm === course.id && (
                <div className="mt-2">
                  <p>Confirmer la suppression ?</p>
                  <button onClick={() => deleteCourse(course.id)} className="text-red-600 mr-2">
                    Oui
                  </button>
                  <button onClick={() => setShowDeleteConfirm(null)} className="text-gray-600">
                    Non
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded w-full max-w-md space-y-4">
            <Dialog.Title className="text-lg font-bold">
              {editingCourse ? "Modifier le cours" : "Ajouter un cours"}
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1">Titre</label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="border p-2 w-full rounded"
                />
                {errors.title && <p className="text-red-500 text-sm">Le titre est requis</p>}
              </div>
              <div>
                <label className="block mb-1">Langue</label>
                <input
                  type="text"
                  {...register("language", { required: true })}
                  className="border p-2 w-full rounded"
                />
                {errors.language && <p className="text-red-500 text-sm">La langue est requise</p>}
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 border rounded">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  {editingCourse ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </AdminLayout>
  );
}
