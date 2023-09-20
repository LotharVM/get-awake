"use client";

import { KNOB_MAX_RANGE } from "@/constants";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

export const Background = () => {
  const knobValue = useMotionValue(0);
  const backgroundColor = useTransform(
    knobValue,
    [0, KNOB_MAX_RANGE],
    ["rgb(0 0 0 / 0)", "rgb(0 0 0 / 1)"]
  );

  return (
    <motion.div
      className="flex min-h-screen w-full items-center justify-center"
      style={{ backgroundColor }}
    >
      <div>
        <input
          type="range"
          min="1"
          max={KNOB_MAX_RANGE}
          defaultValue={knobValue.current}
          onChange={(e) => knobValue.set(e.target.value)}
        />
      </div>
    </motion.div>
  );
};
