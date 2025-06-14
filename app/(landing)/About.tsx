"use client";

import { FC, useRef } from "react";
import { motion, useInView, easeInOut } from "framer-motion";

const AboutSection: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeInOut, // ✅ easing corrigé
      },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen w-full bg-white text-black flex flex-col justify-center items-center px-6 md:px-16 text-center py-20"
      aria-labelledby="about-heading"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2
          id="about-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12"
          variants={itemVariants}
        >
          À propos de{" "}
          <motion.span
            className="text-green-700 relative inline-block"
            variants={itemVariants}
          >
            Mbolo
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-green-200"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{
                delay: 0.8,
                duration: 0.8,
                ease: easeInOut, // ✅ correction ici aussi
              }}
            />
          </motion.span>
        </motion.h2>

        <motion.div className="space-y-8" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed"
              variants={itemVariants}
            >
              Notre <span className="font-semibold text-green-700">mission</span> est de{" "}
              <span className="highlight-text">préserver et transmettre</span> les langues
              vernaculaires d&apos;Afrique centrale. Grâce à une plateforme moderne et ludique,
              nous offrons aux jeunes générations un moyen simple d&apos;apprendre, pratiquer et
              partager leur héritage linguistique.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p
              className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Notre <span className="font-semibold text-green-700">vision</span> est un monde où{" "}
              <span className="highlight-text">chaque langue</span>, même minoritaire, peut
              continuer de vivre à travers les technologies modernes, la culture et
              l&apos;éducation.
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-4 md:gap-6"
          variants={itemVariants}
        >
          {["Langues", "Culture", "Éducation", "Technologie"].map((item) => (
            <motion.span
              key={item}
              className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm md:text-base"
              whileHover={{ scale: 1.05, backgroundColor: "#D1FAE5" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
