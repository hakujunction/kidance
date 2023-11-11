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

  }, [videoRef.current]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    document.body.addEventListener('click', () => {
      setTimeout(() => {
        videoRef.current!.play();
      }, 6000);
    });

    return;

    init();
  }, [videoRef.current]);

  return (
    <video
      id="myVideo"
      ref={videoRef}
      src="/dance.2.mp4"
      loop
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
