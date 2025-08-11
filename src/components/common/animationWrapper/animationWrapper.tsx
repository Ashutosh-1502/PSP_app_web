"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setDisplayChildren(children); // update on route change
  }, [children]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // triggers animation on route change
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {displayChildren}
      </motion.div>
    </AnimatePresence>
  );
}
