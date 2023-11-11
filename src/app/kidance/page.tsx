"use client";

import { Box, CircularProgress, Modal, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { StartCounterButton } from "./components/startCounterButton";
import { TotalResult } from "./components/totalResult";
import { StartCounter } from "./components/counter";
import { MyVideo } from "./components/myVideo";
import { VideoProcessing } from "./components/videoProcessing";
import { PoseDetector, SupportedModels, TrackerType, createDetector, movenet } from "@tensorflow-models/pose-detection";
import { Progress } from "./components/Progress";

export default function KidancePage() {
  const [result, setResult] = useState(0);
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const detector = useRef<PoseDetector | null>(null);
  const playVideo = async () => {
    if (!detector.current) {
      detector.current = await createDetector(SupportedModels.MoveNet);
    }
    videoRef.current && videoRef.current.play();
  };

  const [showResult, setShowResult] = useState<boolean>(false);
  const [isOpenCounter, setIsOpenCounter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const initStartedRef = useRef<boolean>(false);
  const [showStartButton, setShowStartButton] = useState(true);
  
  const [progress, setProgress] = useState('0%');
  
  useEffect(() => {
    const timeoutId = setInterval(() => {
      const pr = (Math.random() * 100 );
      if (pr < 30) {
        setProgress('doBetter');
        return;
      }

      if (pr < 60) {
        setProgress('good');
        return;
      }

      if (pr < 90) {
        setProgress('best');
        return;
      }

      if (pr < 190) {
        setProgress('excelent');
        return;
      }
    }, 3000);


    return function cleanup() {
      clearInterval(timeoutId);
    }
  }, []);

  const init = async () => {
    if (!detector.current) {
      console.log("Init started");
      detector.current = await createDetector(SupportedModels.MoveNet, {
        modelType: movenet.modelType.MULTIPOSE_LIGHTNING,
        enableSmoothing: true,
        multiPoseMaxDimension: 256,
        enableTracking: true,
        trackerType: TrackerType.BoundingBox,
      });
      console.log("Init finished");
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

  return isLoading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      flexDirection='column'
    >
      <CircularProgress />
    </Box>
  ): (
    <>
      <Box bgcolor='#000' width='100%'>
      <video id="video" ref={videoRef as any} controls onEnded={(e) => {
          setShowResult(true);
        }}>
        <source src="/dance.mp4" type="video/mp4"/>
      </video>
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
      />
    </>
  );
}

