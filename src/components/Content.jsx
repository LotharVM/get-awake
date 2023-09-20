"use client";

import { KNOB_MAX_RANGE } from "@/constants";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

export const Content = ({ knobValue }) => {
  const toForeground = useTransform(knobValue, [0, KNOB_MAX_RANGE], [0.25, 1]);
  const toBackground = useTransform(knobValue, [0, KNOB_MAX_RANGE], [1, 0.25]);

  const toVisible = useTransform(knobValue, [0, KNOB_MAX_RANGE / 2], [0, 1]);
  const toHidden = useTransform(knobValue, [0, KNOB_MAX_RANGE / 2], [1, 0]);

  return (
    <div
      className="flex fixed inset-0 min-h-screen w-full items-center justify-center pointer-events-none z-10
    "
    >
      <motion.div
        className="fixed flex w-[800px] justify-center items-center h-[800px] backdrop-blur-[100px] border border-solid border-[#ffffff03]"
        style={{ scale: toForeground, opacity: toVisible }}
      >
        <h1 className="text-6xl">By Night</h1>
      </motion.div>
      <motion.div
        className="fixed flex w-[800px] justify-center items-center h-[800px] backdrop-blur-[100px] border border-solid border-[#ffffff03]"
        style={{ scale: toBackground, opacity: toHidden }}
      >
        <h1 className="text-6xl">By Day</h1>
      </motion.div>
    </div>
  );
};
