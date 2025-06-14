'use client';

import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactSection: FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-gray-50 text-black flex flex-col justify-center items-center px-6 md:px-16 py-16 overflow-hidden"
    >
      {/* === SVGs décoratifs === */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-10 left-10 w-32 h-32 text-green-300"
        fill="none"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" />
      </motion.svg>

      <motion.svg
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-20 right-10 w-40 h-40 text-green-200 rotate-45"
        fill="none"
        viewBox="0 0 100 100"
      >
        <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="8" />
      </motion.svg>

      <motion.svg
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 1.4 }}
        className="absolute bottom-0 left-[30%] w-60 h-60 text-green-100"
        fill="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M50 10 C65 10, 90 40, 50 90 C10 40, 35 10, 50 10 Z"
          stroke="currentColor"
          strokeWidth="6"
        />
      </motion.svg>

      {/* === Titre === */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-6 text-center relative z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Contacte <span className="text-green-800">l’équipe</span>
      </motion.h2>

      {/* === Formulaire === */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 md:p-8 rounded-xl shadow-lg border space-y-4 relative z-10"
      >
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Nom</span>
          <input
            type="text"
            name="name"
            placeholder="Ton nom"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            placeholder="Ton email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Message</span>
          <textarea
            name="message"
            placeholder="Ton message"
            value={form.message}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-3 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </label>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center gap-2 overflow-hidden px-6 py-3 text-lg rounded border-2 shadow-2xl text-white bg-green-700 transition-all duration-300 hover:bg-green-800 group"
        >
          <span className="relative z-10">Envoyer</span>
          <span className="absolute left-0 top-0 h-full w-0 bg-green-900 transition-all duration-500 ease-in-out group-hover:w-full z-0" />
        </motion.button>

        <AnimatePresence>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-green-700 mt-4 text-center font-medium"
            >
              Merci pour votre message ! Nous reviendrons vers vous bientôt.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </section>
  );
};

export default ContactSection;
