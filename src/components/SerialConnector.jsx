"use client";

import { potentiometerPositionAtom, serialPortAtom } from "@/store/app";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const SerialConnector = ({ knobValue }) => {
  const [portIsOpen, setPortIsOpen] = useState(false);

  const [serialPort, setSerialPort] = useAtom(serialPortAtom);
  const [, setPotentiometerPosition] = useAtom(potentiometerPositionAtom);

  function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12:
        case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(
            ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
          );
          break;
      }
    }

    return out;
  }

  function convert(Uint8Arr) {
    var length = Uint8Arr.length;

    let buffer = Buffer.from(Uint8Arr);
    var result = buffer.readUIntBE(0, length);

    return result;
  }

  const startAConnection = () => {
    if ("serial" in navigator) {
      navigator.serial.requestPort().then(async (newPort) => {
        console.log(navigator.serial);
        setSerialPort(newPort);
      });
    }
  };

  useEffect(() => {
    if (!serialPort) {
      return;
    }
    serialPort
      .open({ baudRate: 9600 /* pick your baud rate */ })
      .then(async () => {
        const reader = serialPort.readable.getReader();

        setPortIsOpen(true);
        while (true) {
          // eslint-disable-next-line no-await-in-loop
          const { value, done } = await reader.read();

          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
          }

          const val3 = new TextDecoder("utf-8").decode(value);

          // console.log(val3);

          console.log(value.toString());
          // console.log(u8str);

          // console.log(typeof val2);
          // if (typeof val2 === "string" && val2 !== NaN) {
          // }
          // console.log(Number(val2));
          // value is a Uint8Array.
          knobValue.set(value[0].toString());
          setPotentiometerPosition(value[0]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serialPort]);

  const sendMessage = async (message) => {
    if (!serialPort) {
      return;
    }

    const writer = serialPort.writable.getWriter();

    await writer.write(new TextEncoder().encode(message.toString()));

    writer.releaseLock();
  };

  return (
    <div className="z-50 fixed bottom-4 right-4 text-white font-bold">
      {!portIsOpen && (
        <button onClick={startAConnection}>CONNECT DEVICE</button>
      )}
      {portIsOpen && <button onClick={sendMessage}>CONNECT DEVICE</button>}
    </div>
  );
};

SerialConnector.canvas = () => ({});
