"use client";

import { Box, Modal, Paper } from "@mui/material";
import { useRef, useState } from "react";

import { StartCounterButton } from "./components/startCounterButton";
import { TotalResult } from "./components/totalResult";
import { StartCounter } from "./components/counter";


export default function KidancePage() {
  const videoRef = useRef<HTMLVideoElement>();
  const playVideo = (event: any) => {
    videoRef.current && videoRef.current.play();
  };
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isOpenCounter, setIsOpenCounter] = useState(false);

  return (
    <Box bgcolor='#000' width='100%'>
    <video ref={videoRef as any} controls  onEnded={(e) => {
        setShowResult(true);
        console.log('ended')
      }}>
      <source src="/dance.mp4" type="video/mp4"/>
    </video>
    <StartCounterButton setIsOpen={setIsOpenCounter}  />

    {isOpenCounter && <StartCounter setIsOpen={setIsOpenCounter} playVideo={playVideo}/>}
    {showResult && <TotalResult setIsShown={setShowResult}  onRetry={() => {
      setIsOpenCounter(true);
    }}/>}
    </Box>
  )
}

