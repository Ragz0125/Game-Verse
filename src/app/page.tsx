"use client";

import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "./components/modules/LandingPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./components/common/Loader";

export default function Home() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      setLoader(false);
    }, 5000);

    return () => clearTimeout(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {loader ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Loader key={"loader"} />
          </motion.div>
        ) : (
          <LandingPage key={"home"} />
        )}
      </AnimatePresence>
    </>
  );
}
