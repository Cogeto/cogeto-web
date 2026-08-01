"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  words: readonly string[];
  intervalMs?: number;
  className?: string;
};

/** Cycles through short phrases with a gentle slide. Static full list under reduced motion. */
export default function RotatingWords({ words, intervalMs = 2600, className }: Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => clearInterval(id);
  }, [reduce, words.length, intervalMs]);

  if (reduce) {
    const all = `${words.slice(0, -1).join(", ")}, or ${words[words.length - 1]}`;
    return <span className={className}>{all}</span>;
  }

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className ?? ""}`}>
      {/* Widest phrase reserves the box so the line never reflows. */}
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 whitespace-nowrap text-left"
      >
        {[...words].sort((a, b) => b.length - a.length)[0]}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "80%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-80%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
          className="col-start-1 row-start-1 whitespace-nowrap text-left"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
