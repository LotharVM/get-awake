"use client";

import { KNOB_MAX_RANGE, KNOB_MIN_RANGE } from "@/constants";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

export const Content = ({ knobValue }) => {
  const toForeground = useTransform(
    knobValue,
    [KNOB_MIN_RANGE, KNOB_MAX_RANGE],
    [0.25, 1]
  );
  const toBackground = useTransform(
    knobValue,
    [KNOB_MIN_RANGE, KNOB_MAX_RANGE],
    [1, 0.25]
  );

  const toVisible = useTransform(
    knobValue,
    [KNOB_MIN_RANGE, KNOB_MAX_RANGE / 2],
    [0, 1]
  );
  const toHidden = useTransform(
    knobValue,
    [KNOB_MIN_RANGE, KNOB_MAX_RANGE / 2],
    [1, 0]
  );

  return (
    <div
      className="flex fixed inset-0 min-h-screen w-full items-center justify-center pointer-events-none z-10 text-white
    "
    >
      <motion.div
        className="fixed flex w-[60vh] justify-center items-center h-[60vh] backdrop-blur-[100px] border border-solid border-[#ffffff03]"
        style={{ scale: toForeground, opacity: toVisible }}
      >
        <h1 className="text-6xl">BY NIGHT</h1>
      </motion.div>
      <motion.div
        className="fixed flex w-[60vh] justify-center items-center h-[60vh] backdrop-blur-[100px] border border-solid border-[#ffffff03]"
        style={{ scale: toBackground, opacity: toHidden }}
      >
        <h1 className="text-6xl">BY DAY</h1>
      </motion.div>
    </div>
  );
};
