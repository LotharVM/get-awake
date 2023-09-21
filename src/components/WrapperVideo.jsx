"use client";

import { KNOB_MAX_RANGE, KNOB_MIN_RANGE } from "@/constants";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const WrapperVideo = ({ knobValue }) => {
  const filter = useTransform(
    knobValue,
    [0, KNOB_MAX_RANGE],
    ["hue-rotate(180deg)", "hue-rotate(360deg)"]
  );

  const backgroundColor = useTransform(
    knobValue,
    [0, 64, 128, KNOB_MAX_RANGE],
    ["#03fc77", "#a503fc", "#fc03f8", "#fcad03"]
  );

  const opacityVideoOne = useTransform(
    knobValue,
    [KNOB_MIN_RANGE, KNOB_MAX_RANGE],
    [0, 1]
  );
  const opacityVideoTwo = useTransform(
    knobValue,
    [KNOB_MIN_RANGE, KNOB_MAX_RANGE],
    [1, 0]
  );

  return (
    <div className="relative flex items-center justify-center h-screen mb-12 overflow-hidden">
      {/* <motion.div
        className="absolute z-20 w-full h-full bg-red-700 mix-blend-hue"
        style={{ filter }}
      /> */}

      <div className="absolute z-30 w-full h-full inset-0 bg-[url('https://cliply.co/wp-content/uploads/2021/07/402107790_STATIC_NOISE_400.gif')] mix-blend-luminosity pointer-events-none opacity-10" />

      <motion.div
        className="absolute z-20 w-full h-full bg-red-700 mix-blend-color-dodge opacity-40"
        style={{ backgroundColor }}
      />

      <motion.div
        className="absolute z-20 w-full h-full bg-red-700 mixblend"
        style={{ filter }}
      />
      {/* TOP */}
      <motion.div
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
        style={{ opacity: opacityVideoOne }}
      >
        <video
          playsInline
          autoPlay
          loop
          muted
          className="w-screen h-screen inset-0 object-cover"
        >
          <source src="/videos/1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      <motion.div
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none rotate-180"
        style={{ opacity: opacityVideoTwo }}
      >
        <video
          playsInline
          autoPlay
          loop
          muted
          className="w-screen h-screen inset-0 object-cover"
        >
          <source src="/videos/1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* BOTTOM */}
      <motion.div
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
        style={{ opacity: opacityVideoTwo }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-screen h-screen inset-0 object-cover"
        >
          <source src="/videos/2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      <motion.div
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none rotate-180"
        style={{ opacity: opacityVideoOne }}
      >
        <video
          autoPlay
          loop
          muted
          className="w-screen h-screen inset-0 object-cover"
          playsInline
        >
          <source src="/videos/2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
};
