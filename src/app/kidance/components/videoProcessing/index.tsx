"use client";

import { RefObject, useEffect, useRef } from "react";
import { Positions, getPositions, keyPointsToObject } from "./utils";
import { Pose, PoseDetector } from "@tensorflow-models/pose-detection";

const ONPROGRESS_INTRVAL = '1000';

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

  const startTimeRef = useRef<number>(0);
  const currTimeRef = useRef<number>(0);

  const videoResultsRef = useRef<Record<string, Positions>>({});
  const myVideoResulstsRef = useRef<Record<string, Positions>>({});
  const maxStepRef = useRef<number>(0);

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
        const currFrameCount = frameCount.current - lastFrameCount.current;
        const currFrameHitCount = frameHitCount.current - lastFrameHitCount.current;

        onProgress?.(Math.floor(currFrameHitCount / currFrameCount * 100))
      }, ONPROGRESS_INTRVAL);

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

        currVideoPositions.current.left_ankle = positions.left_ankle;
        currVideoPositions.current.right_ankle = positions.right_ankle;
        currVideoPositions.current.left_wrist = positions.left_wrist;
        currVideoPositions.current.right_wrist = positions.right_wrist;

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
          frameCount.current += 2;
          maxStepRef.current = Math.max(maxStepRef.current, currMyTime);
        }

        currMePositions.current.left_ankle = myPositions.left_ankle;
        currMePositions.current.right_ankle = myPositions.right_ankle;
        currMePositions.current.left_wrist = myPositions.left_wrist;
        currMePositions.current.right_wrist = myPositions.right_wrist;

        // console.log(Date.now(), "ml vr", myPositions.left_wrist, currVideoPositions.current.right_wrist);
        // console.log(Date.now(), "mr vl", myPositions.right_wrist, currVideoPositions.current.left_wrist);

        if (currVideoPositions.current.left_wrist === currMePositions.current.right_wrist) {
          frameHitCount.current += 1;
        }

        if (currVideoPositions.current.right_wrist === currMePositions.current.left_wrist) {
          frameHitCount.current += 1;
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

      const calculateScore = () => {
        let score = 0;

        for (let i = 0; i <= maxStepRef.current; i+=STEP) {
          const videoResult = videoResultsRef.current[i];
          const myVideoResult = myVideoResulstsRef.current[i];

          if (!videoResult || !myVideoResult) {
            continue;
          }

          if (videoResult.left_wrist === myVideoResult.left_wrist) {
            score += 1;
          }

          if (videoResult.right_wrist === myVideoResult.right_wrist) {
            score += 1;
          }
        }

        return score;
      }

      console.log({
        score: Math.floor(calculateScore() / (Object.keys(myVideoResulstsRef.current ?? {}).length * 2) * 100),
        frameCount: frameCount.current,
        frameHitCount: frameHitCount.current,
        currMePositions: currMePositions.current,
        currVideoPositions: currVideoPositions.current,
        videoResults: videoResultsRef.current,
        myVideoResulsts: myVideoResulstsRef.current,
      });

      onScoreUpdate?.(Math.floor(calculateScore() / (Object.keys(myVideoResulstsRef.current ?? {}).length * 2) * 100));
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

      videoResultsRef.current = {};
      myVideoResulstsRef.current = {};

      clearInterval(intervalIdxRef.current);
    });
  }, []);

  return null;
}