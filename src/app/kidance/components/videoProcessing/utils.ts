import {
  Keypoint,
} from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
// Register one of the TF.js backends.
import "@tensorflow/tfjs-backend-webgl";

tf.ready();

type KeypointName =
  | "nose"
  | "left_eye"
  | "right_eye"
  | "left_ear"
  | "right_ear"
  | "left_shoulder"
  | "right_shoulder"
  | "left_elbow"
  | "right_elbow"
  | "left_wrist"
  | "right_wrist"
  | "left_hip"
  | "right_hip"
  | "left_knee"
  | "right_knee"
  | "left_ankle"
  | "right_ankle";

type KeypointObject = Record<KeypointName, [number, number] | undefined>;

export const keyPointsToObject = (keypoints: Keypoint[], video: string = "my"): KeypointObject => {
  const obj: KeypointObject = {
    nose: undefined,
    left_eye: undefined,
    right_eye: undefined,
    left_ear: undefined,
    right_ear: undefined,
    left_shoulder: undefined,
    right_shoulder: undefined,
    left_elbow: undefined,
    right_elbow: undefined,
    left_wrist: undefined,
    right_wrist: undefined,
    left_hip: undefined,
    right_hip: undefined,
    left_knee: undefined,
    right_knee: undefined,
    left_ankle: undefined,
    right_ankle: undefined,
  };

  keypoints.forEach((keypoint) => {
    if (!keypoint.name) return;
    obj[keypoint.name as KeypointName] = [keypoint.x, keypoint.y];
  });

  return obj;
};

type DescartesSector = 0 | 1 | 2 | 3 | 4;

export type Positions = {
  left_wrist: DescartesSector;
  right_wrist: DescartesSector;
  left_ankle: DescartesSector;
  right_ankle: DescartesSector;
};

const getDescartesSector = (
  x: "left" | "right",
  y: "up" | "down"
): DescartesSector => {
  if (x === "left" && y === "up") return 1;
  if (x === "right" && y === "up") return 2;
  if (x === "right" && y === "down") return 3;
  if (x === "left" && y === "down") return 4;

  return 0;
};

export const getPositions = (keypointObject: KeypointObject): Positions => {
  const positions: Positions = {
    left_wrist: 0,
    right_wrist: 0,
    left_ankle: 0,
    right_ankle: 0,
  };

  if (!keypointObject.left_shoulder || !keypointObject.right_shoulder || !keypointObject.left_hip) {
    return positions;
  }

  const maxYShoulder = (
    keypointObject.left_shoulder[1] +
    keypointObject.left_hip[1]
  ) / 2;

  const middleXShoulder =
    (keypointObject.left_shoulder[0] + keypointObject.right_shoulder[0]) / 2;

  for (let part of Object.keys(positions) as Array<keyof Positions>) {
    let y: "up" | "down" = "up";
    let x: "left" | "right" = "left";

    if (!keypointObject[part]) continue;
    if (keypointObject[part]![1] > maxYShoulder) {
      y = "down";
    }
    if (keypointObject[part]![0] > middleXShoulder) {
      x = "right";
    }

    positions[part] = getDescartesSector(x, y);
  }

  return positions;
};