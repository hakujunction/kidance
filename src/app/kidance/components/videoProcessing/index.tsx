"use client";

import { RefObject, useEffect, useRef } from "react";
import { Positions, getPositions, keyPointsToObject } from "./utils";
import { Pose, PoseDetector } from "@tensorflow-models/pose-detection";

const ONPROGRESS_INTERVAL = 1000;

type VideoProcessingProps = {
  videoRef: RefObject<HTMLVideoElement>;
  myVideoRef: RefObject<HTMLVideoElement>;
  onProgress?: (percent: number) => void;
  onScoreUpdate?: (score: number) => void;
  detector: RefObject<PoseDetector>;
}

const STEP = 0.5;

export function VideoProcessing({ videoRef, myVideoRef, detector, onScoreUpdate, onProgress }: VideoProcessingProps) {
  const isPlaying = useRef<boolean>(false);
  const score = useRef<number>(0);

  const frameCount = useRef<number>(0);
  const intervalIdxRef = useRef<any>(0);

  const startTimeRef = useRef<number>(0);
  const currTimeRef = useRef<number>(0);

  const videoResultsRef = useRef<Record<string, Positions>>({});
  const myVideoResulstsRef = useRef<Record<string, Positions>>({});
  const maxStepRef = useRef<number>(0);

  const calculateScore = (min = 0) => {
    let score = 0;

    for (let i = min; i <= maxStepRef.current; i+=STEP) {
      const videoResult = videoResultsRef.current[i];
      const myVideoResult = myVideoResulstsRef.current[i];

      if (!videoResult || !myVideoResult) {
        continue;
      }

      if (min !== 0) {
        if (videoResult.left_wrist === myVideoResult.left_wrist) {
          score += 1;
        }

        if (videoResult.right_wrist === myVideoResult.right_wrist) {
          score += 1;
        }
      } else {
        if (videoResult.left_wrist === myVideoResult.left_wrist && videoResult.right_wrist === myVideoResult.right_wrist) {
          score += 1;
        }
      }
    }

    if (min !== 0) {
      return score / 2;
    }

    return score;
  }

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.addEventListener('play', async () => {
      startTimeRef.current = Date.now();
      if (isPlaying.current) {
        return;
      }

      isPlaying.current = true;

      intervalIdxRef.current = setInterval(() => {
        const currMyTime = Number.parseFloat(((Date.now() - startTimeRef.current) / 1000).toFixed(1));
        const fragmentsSize = Object.keys(myVideoResulstsRef.current ?? {}).filter(t => Number.parseFloat(t) > currMyTime - ONPROGRESS_INTERVAL / 1000).length

        if (!fragmentsSize) {
          onProgress?.(0);
          return;
        }

        const score = Math.floor(calculateScore(currMyTime - ONPROGRESS_INTERVAL / 1000) / (fragmentsSize)) * 100;
        console.log("set", score);
        onProgress?.(score);
      }, ONPROGRESS_INTERVAL);

      requestAnimationFrame(async function detectPoses() {
        if (!isPlaying.current || !detector.current || !videoRef.current || !myVideoRef.current) {
          return;
        }

        const currentVideoTime = videoRef.current.currentTime;
        const currentTime = Number.parseFloat(currentVideoTime.toFixed(1));

        let myPoses: Pose[];
        let poses: Pose[];
      
        try {
          [poses, myPoses] = await Promise.all([
            detector.current.estimatePoses(videoRef.current),
            detector.current.estimatePoses(myVideoRef.current),
          ]);
        } catch(e) {
          console.log(e);
          return;
        }

        if (!poses.length) {
          requestAnimationFrame(detectPoses);
          return;
        }

        const keypointsObject = keyPointsToObject(poses[0].keypoints, "video");
        const positions = getPositions(keypointsObject);

        if (currentTime % STEP === 0 && !videoResultsRef.current[currentTime]) {
          videoResultsRef.current[currentTime] = positions;
        }

        if (!myPoses.length) {
          console.log("My poses not found")
          requestAnimationFrame(detectPoses);
          return;
        }

        const myKeypointsObject = keyPointsToObject(myPoses[0].keypoints);
        const myPositions = getPositions(myKeypointsObject);

        const currMyTime = Number.parseFloat(((Date.now() - startTimeRef.current) / 1000).toFixed(1));

        if (currMyTime % STEP === 0 && !videoResultsRef.current[currMyTime]) {
          myVideoResulstsRef.current[currMyTime] = myPositions;
          frameCount.current += 1;
          maxStepRef.current = Math.max(maxStepRef.current, currMyTime);
        }

        currTimeRef.current = Date.now();

        requestAnimationFrame(detectPoses);
      });
    });

    videoRef.current.addEventListener('pause', () => {
      if (!isPlaying.current || !frameCount.current) {
        return;
      }

      isPlaying.current = false;

      console.log({
        score: Math.floor(calculateScore() / (Object.keys(myVideoResulstsRef.current ?? {}).length) * 100),
        frameCount: frameCount.current,
        videoResults: videoResultsRef.current,
        myVideoResulsts: myVideoResulstsRef.current,
      });

      if (Object.keys(myVideoResulstsRef.current).length / Object.keys(videoResultsRef.current).length < 0.5) {
        onScoreUpdate?.(0);
      } else {
        onScoreUpdate?.(Math.floor(calculateScore() / (Object.keys(myVideoResulstsRef.current ?? {}).length) * 100));
      }

      score.current = 0;
      frameCount.current = 0;

      videoResultsRef.current = {};
      myVideoResulstsRef.current = {};

      clearInterval(intervalIdxRef.current);
    });
  }, [detector, myVideoRef, onProgress, onScoreUpdate, videoRef]);

  return null;
}