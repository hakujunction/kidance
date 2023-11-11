"use client";

import { RefObject, useEffect, useRef } from "react";
import { Positions, getPositions, keyPointsToObject } from "./utils";
import { Pose, PoseDetector } from "@tensorflow-models/pose-detection";

type VideoProcessingProps = {
  videoRef: RefObject<HTMLVideoElement>;
  myVideoRef: RefObject<HTMLVideoElement>;
  onProgress?: (percent: number) => void;
  onScoreUpdate?: (score: number) => void;
  detector: RefObject<PoseDetector>;
}

export function VideoProcessing({ videoRef, myVideoRef, detector, onScoreUpdate, onProgress }: VideoProcessingProps) {
  const isPlaying = useRef<boolean>(false);
  const score = useRef<number>(0);

  const currMePositions = useRef<Positions>({
    left_wrist: 0,
    right_wrist: 0,
    left_ankle: 0,
    right_ankle: 0,
  });

  const currVideoPositions = useRef<Positions>({
    left_wrist: 0,
    right_wrist: 0,
    left_ankle: 0,
    right_ankle: 0,
  });

  const lastFrameCount = useRef<number>(0);
  const lastFrameHitCount = useRef<number>(0);
  const frameCount = useRef<number>(0);
  const frameHitCount = useRef<number>(0);
  const intervalIdxRef = useRef<any>(0);
  
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.addEventListener('play', async () => {
      if (isPlaying.current) {
        return;
      }

      isPlaying.current = true;

      intervalIdxRef.current = setInterval(() => {
        const currFrameCount = frameCount.current - lastFrameCount.current;
        const currFrameHitCount = frameHitCount.current - lastFrameHitCount.current;

        onProgress?.(Math.floor(currFrameHitCount / currFrameCount * 100))
      }, 5000);

      requestAnimationFrame(async function detectPoses() {
        if (!isPlaying.current || !detector.current || !videoRef.current || !myVideoRef.current) {
          return;
        }

        let poses: Pose[];
        let myPoses: Pose[];
      
        try {
          [poses, myPoses] = await Promise.all([
            detector.current.estimatePoses(videoRef.current),
            detector.current.estimatePoses(myVideoRef.current)
          ]);
        } catch {
          return;
        }

        if (!poses.length || !myPoses.length) {
          requestAnimationFrame(detectPoses);
          return;
        }
  
        const keypointsObject = keyPointsToObject(poses[0].keypoints);
        const positions = getPositions(keypointsObject);

        currVideoPositions.current.left_ankle = positions.left_ankle;
        currVideoPositions.current.right_ankle = positions.right_ankle;
        currVideoPositions.current.left_wrist = positions.left_wrist;
        currVideoPositions.current.right_wrist = positions.right_wrist;

        const myKeypointsObject = keyPointsToObject(myPoses[0].keypoints);
        const myPositions = getPositions(myKeypointsObject);

        currMePositions.current.left_ankle = myPositions.left_ankle;
        currMePositions.current.right_ankle = myPositions.right_ankle;
        currMePositions.current.left_wrist = myPositions.left_wrist;
        currMePositions.current.right_wrist = myPositions.right_wrist;

        frameCount.current += 2;

        if (currVideoPositions.current.left_wrist === currMePositions.current.right_wrist) {
          frameHitCount.current += 1;
        }

        if (currVideoPositions.current.right_wrist === currMePositions.current.left_wrist) {
          frameHitCount.current += 1;
        }

        console.log(frameCount.current, frameHitCount.current);
  
        requestAnimationFrame(detectPoses);
      });
    });

    videoRef.current.addEventListener('pause', () => {
      if (!isPlaying.current) {
        return;
      }

      isPlaying.current = false;

      onScoreUpdate?.(Math.floor(frameHitCount.current / frameCount.current * 100));
      score.current = 0;
      frameCount.current = 0;
      frameHitCount.current = 0;

      currMePositions.current.left_ankle = 0;
      currMePositions.current.right_ankle = 0;
      currMePositions.current.left_wrist = 0;
      currMePositions.current.right_wrist = 0;

      currVideoPositions.current.left_ankle = 0;
      currVideoPositions.current.right_ankle = 0;
      currVideoPositions.current.left_wrist = 0;
      currVideoPositions.current.right_wrist = 0;

      clearInterval(intervalIdxRef.current);
    });
  }, []);

  return null;
}