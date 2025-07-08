"use client"

import { AnimatePresence } from "framer-motion";
import SpeedlePage from "../components/modules/Speedle";


const Speedle = () => {
  return (
    <AnimatePresence mode="popLayout">
      <SpeedlePage />
    </AnimatePresence>
  );
};

export default Speedle;
