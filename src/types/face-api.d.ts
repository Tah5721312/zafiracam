declare module 'face-api.js' {
  export interface Box {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  export interface Detection {
    box: Box;
    score: number;
  }

  export interface Point {
    x: number;
    y: number;
  }

  export interface FaceLandmarks {
    getJawOutline(): Point[];
    getLeftEyeBrow(): Point[];
    getRightEyeBrow(): Point[];
    getNose(): Point[];
    getLeftEye(): Point[];
    getRightEye(): Point[];
    getMouth(): Point[];
  }

  export interface WithFaceLandmarks<T> {
    detection: { box: Box };
    landmarks: FaceLandmarks;
    descriptor?: Float32Array;
    alignedRect?: { box: Box };
  }

  export interface TinyFaceDetectorOptions {
    inputSize?: number;
    scoreThreshold?: number;
  }

  export class TinyFaceDetectorOptions {
    constructor(options?: { inputSize?: number; scoreThreshold?: number });
  }

  export namespace nets {
    class TinyFaceDetector {
      loadFromUri(uri: string): Promise<void>;
    }
    class FaceLandmark68Net {
      loadFromUri(uri: string): Promise<void>;
    }
    export const tinyFaceDetector: TinyFaceDetector;
    export const faceLandmark68Net: FaceLandmark68Net;
  }

  export function detectSingleFace(
    input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    options?: TinyFaceDetectorOptions
  ): {
    withFaceLandmarks(): Promise<WithFaceLandmarks<any> | undefined>;
  };
}
