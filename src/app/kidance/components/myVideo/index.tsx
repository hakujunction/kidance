"use client";

import { Box } from "@mui/material";
import { RefObject, useCallback, useEffect } from "react";

type MyVideoProps = {
  videoRef: RefObject<HTMLVideoElement>;
};

export function MyVideo({ videoRef }: MyVideoProps) {

  const init = useCallback(async () => {
    if (!videoRef.current) {
      return;
    }

    const video = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
  
    try {
      videoRef.current.srcObject = video;
      await videoRef.current.play();
    } catch {
      // Do nothing
    }

  }, [videoRef.current]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    init();
  }, [videoRef.current]);

  return (
    <video
      ref={videoRef}
      style={{
        position: "absolute",
        bottom: 24,
        right: 24,
        borderRadius: "24px",
        width: "500px",
        height: "auto",
      }}
    ></video>
  );
}
