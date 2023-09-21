"use client";

import { KNOB_MAX_RANGE } from "@/constants";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { WrapperVideo } from "./WrapperVideo";
import { Content } from "./Content";
import { TonePlayer } from "./TonePlayer";
import { SerialConnector } from "./SerialConnector";
import { useEffect } from "react";

export const KnobWrapper = () => {
  const knobValue = useMotionValue(0);

  // useEffect(() => {
  //   knobValue.on("change", (e) => console.log(e));
  // }, []);

  return (
    <>
      <img
        className="fixed top-[7.5vh] z-50 left-[50%] translate-x-[-50%]"
        src="https://live.awakenings.com/_next/static/media/logo-simple.203e48e9.svg"
      />
      <TonePlayer knobValue={knobValue} />
      <WrapperVideo knobValue={knobValue} />
      <Content knobValue={knobValue} />
      <SerialConnector knobValue={knobValue} />

      <input
        className="bottom-16 md:bottom-4 fixed z-40 left-[50%] translate-x-[-50%]"
        type="range"
        min="1"
        max={KNOB_MAX_RANGE}
        defaultValue={knobValue.current}
        onChange={(e) => knobValue.set(e.target.value)}
      />
    </>
  );
};
