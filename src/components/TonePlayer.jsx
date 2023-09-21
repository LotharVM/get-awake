"use client";

import { KNOB_MAX_RANGE } from "@/constants";
import { useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

export const TonePlayer = ({ knobValue }) => {
  const [isStarted, setIsStarted] = useState(false);

  // const player = new Tone.Player("/audio/audio.mp3").toDestination();

  const player = useRef(new Tone.Player("/audio/audio.mp3").toDestination());
  const eq = useRef(new Tone.EQ3(-10, 0, 0));

  useEffect(() => {
    // const player = new Tone.Player("/audio/audio.mp3").toDestination();
    // play as soon as the buffer is loaded
    player.current.autostart = true;
    player.current.loop = true;
    // player.current.playbackRate = 0.25;
    // filter.current.frequency.rampTo(20000, 10);

    // console.log(filter);

    // const filter = new Tone.Filter(0, "highpass").start();
    // const filter = new Tone.Filter(0, "highpass").toDestination();

    // const filter = new Tone.Filter(1500, "lowpass").toDestination();

    // const eq = new Tone.EQ3(-10, 0, 0);

    // player.current.chain(eq, Tone.Destination);
  }, [player]);

  const handleStart = () => {
    Tone.start();
    setIsStarted(true);
  };

  const speed = useTransform(knobValue, [0, KNOB_MAX_RANGE], [0.9, 1.05]);

  useMotionValueEvent(speed, "change", (latest) => {
    // if (playbackRate) {
    // console.log({ latest });
    player.current.playbackRate = latest;
    // }
  });

  return isStarted ? null : (
    <button
      className="fixed z-50 bottom-4 left-4 text-white font-bold"
      onClick={handleStart}
    >
      PLAY MUSIC
    </button>
  );
};
