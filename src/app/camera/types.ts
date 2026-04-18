export interface FaceArea {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
}

export interface Avatar {
  id: string;
  name: string;
  image: string;
  faceArea: FaceArea;
  preview?: string;
}

export interface FaceDetectionResult {
  detection: {
    box: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
  landmarks?: {
    getJawOutline(): { x: number; y: number }[];
    getLeftEyeBrow(): { x: number; y: number }[];
    getRightEyeBrow(): { x: number; y: number }[];
    getNose(): { x: number; y: number }[];
    getLeftEye(): { x: number; y: number }[];
    getRightEye(): { x: number; y: number }[];
    getMouth(): { x: number; y: number }[];
  };
  descriptor?: Float32Array;
}

export interface CroppedFace {
  imageData: ImageData;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
}
