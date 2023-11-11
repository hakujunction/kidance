"use client";

import { Box, Modal, Paper } from "@mui/material";
import { useRef, useState } from "react";

import { StartCounterButton } from "./components/startCounterButton";
import { TotalResult } from "./components/totalResult";
import { StartCounter } from "./components/counter";
import { MyVideo } from "./components/myVideo";
import { VideoProcessing } from "./components/videoProcessing";
import { PoseDetector, SupportedModels, createDetector } from "@tensorflow-models/pose-detection";

export default function KidancePage() {
  const [result, setResult] = useState(0);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const detector = useRef<PoseDetector | null>(null);
  const playVideo = async (event: any) => {
    if (!detector.current) {
      detector.current = await createDetector(SupportedModels.MoveNet);
    }
    videoRef.current && videoRef.current.play();
  };
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isOpenCounter, setIsOpenCounter] = useState(false);

  return (
    <>
      <Box bgcolor='#000' width='100%'>
      <video id="video" ref={videoRef as any} controls  onEnded={(e) => {
          setShowResult(true);
          console.log('ended')
        }}>
        <source src="/dance.mp4" type="video/mp4"/>
      </video>
      <StartCounterButton setIsOpen={setIsOpenCounter}  />
      {isOpenCounter && <StartCounter setIsOpen={setIsOpenCounter} playVideo={playVideo}/>}
      {showResult && <TotalResult setIsShown={setShowResult} result={result} onRetry={() => {
        setIsOpenCounter(true);
      }}/>}
      </Box>
      <MyVideo videoRef={myVideoRef} />
      <VideoProcessing 
        detector={detector}
        videoRef={videoRef} 
        myVideoRef={myVideoRef} 
        onScoreUpdate={setResult} 
      />
    </>
  )
}

