"use client";

import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { StartCounterButton } from "./components/startCounterButton";
import { TotalResult } from "./components/totalResult";
import { StartCounter } from "./components/counter";
import { MyVideo } from "./components/myVideo";
import { VideoProcessing } from "./components/videoProcessing";
import { PoseDetector, SupportedModels, TrackerType, createDetector, movenet } from "@tensorflow-models/pose-detection";
import { Progress } from "./components/Progress";
import ExternalVideo from "./components/externalVideo";
import { LoaderInfo } from "./components/loaderInfo";
import { MyVideoSame } from "./components/myVideoSame";

export default function KidancePage() {
  const [result, setResult] = useState(0);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const detector = useRef<PoseDetector | null>(null);
  const playVideo = async () => {
    videoRef.current && videoRef.current.play();
  };

  const [showResult, setShowResult] = useState<boolean>(false);
  const [isOpenCounter, setIsOpenCounter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const initStartedRef = useRef<boolean>(false);
  const [showStartButton, setShowStartButton] = useState(true);
  
  const [progress, setProgress] = useState<number | null>(null);

  const init = async () => {
    if (!detector.current) {
      console.log("Init started");
      detector.current = await createDetector(SupportedModels.MoveNet);
      console.log("Init finished");
      console.log("Start preloading");
      const imageElement = document.querySelector('img#bank') as HTMLImageElement;

      if (!imageElement) {
        return;
      }

      await detector.current.estimatePoses(imageElement)

      console.log("Preloading finished");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (initStartedRef.current) {
      return;
    }

    initStartedRef.current = true;
    init();
  }, []);
  
  if (isLoading) {
    return <LoaderInfo />
  }
  return (
    <>
      <Box bgcolor='#000' width='100%'>
      <ExternalVideo onEnded={(e) => {
          setShowResult(true);
          setProgress(null);
        }}
        videoRef={videoRef}
      />
      {showStartButton && <StartCounterButton onClick={() => {
        setShowStartButton(false);
        setIsOpenCounter(true);
      }}  />}
      {isOpenCounter && <StartCounter setIsOpen={setIsOpenCounter} playVideo={playVideo}/>}
      {showResult && <TotalResult setIsShown={setShowResult} result={result} onRetry={() => {
        setIsOpenCounter(true);
      }}/>}
      <Progress value={progress} />
      </Box>
      <MyVideo videoRef={myVideoRef} />
      <VideoProcessing 
        detector={detector}
        videoRef={videoRef} 
        myVideoRef={myVideoRef} 
        onScoreUpdate={setResult} 
        onProgress={setProgress}
      />
      <div id="rest"></div>
    </>
  );
}

