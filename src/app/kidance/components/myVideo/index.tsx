"use client";

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

  }, [videoRef]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    init();
  }, [videoRef, init]);

  return (
    <video
      id="myVideo"
      ref={videoRef}
      style={{
        position: "absolute",
        bottom: 24,
        right: 24,
        borderRadius: "24px",
        width: "30%",
        height: "auto",
      }}
    ></video>
  );
}
