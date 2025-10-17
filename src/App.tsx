import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ThemeProvider from "./context/ThemeProvider";
import { useRouteScroll } from "./hooks/useRouteScroll";

const pageVariants = {
  initial: { opacity: 0, scale: 0.995 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.995 },
};

// Usamos solo duration para evitar problemas de tipado con `ease`
const pageTransition = {
  duration: 0.25,
};

const AppContent: React.FC = () => {
  useRouteScroll();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 theme-transition">
      <Header />

      <main className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="w-full"
          >
            <div className="container mx-auto px-4">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/technologies" element={<Home />} />
                <Route path="/experience" element={<Home />} />
                <Route path="/tasks" element={<Home />} />
                <Route path="/education" element={<Home />} />
                <Route path="/contact" element={<Home />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;