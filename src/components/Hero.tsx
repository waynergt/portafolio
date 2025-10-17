import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="py-12 flex flex-col-reverse md:flex-row items-center gap-8">
      <div className="md:w-2/3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100">
          Hola, soy Wayne — desarrollador frontend
        </h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl">
          Construyo interfaces limpias, accesibles y rápidas. Aquí podrás ver mis
          tecnologías favoritas, mi experiencia, proyectos y las tareas que
          gestiono en mi portafolio.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            Contáctame
          </a>
          <a
            href="#tasks"
            className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Ver tareas
          </a>
        </div>
      </div>

      <div className="md:w-1/3 flex justify-center">
        <div className="w-44 h-44 bg-gradient-to-br from-blue-200 to-blue-400 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
          Foto
        </div>
      </div>
    </div>
  );
};

export default Hero;