import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Wayne RGT — Portfolio de tareas
      </div>
    </footer>
  );
};

export default Footer;