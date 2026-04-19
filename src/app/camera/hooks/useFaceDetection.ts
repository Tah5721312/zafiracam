'use client';

import { useState, useRef, useCallback } from 'react';
import * as faceapi from 'face-api.js';
import { FaceDetectionResult } from '../types';

const MODEL_URL = '/models';

export function useFaceDetection() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modelsLoadedRef = useRef(false);

  const loadModels = useCallback(async () => {
    if (modelsLoadedRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);

      modelsLoadedRef.current = true;
      setIsModelLoaded(true);
    } catch (err) {
      setError('Failed to load face detection models. Please check if model files exist in /public/models');
      console.error('Error loading models:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const detectFace = useCallback(async (imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<FaceDetectionResult | null> => {
    if (!modelsLoadedRef.current) {
      await loadModels();
    }

    try {
      const detection = await faceapi
        .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 }))
        .withFaceLandmarks();

      if (!detection) {
        return null;
      }

      return {
        detection: {
          box: {
            x: detection.detection.box.x,
            y: detection.detection.box.y,
            width: detection.detection.box.width,
            height: detection.detection.box.height,
          },
        },
        landmarks: detection.landmarks,
      };
    } catch (err) {
      console.error('Face detection error:', err);
      return null;
    }
  }, [loadModels]);

  const cropFace = useCallback(async (
    sourceImage: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    detection: FaceDetectionResult,
    targetSize: number = 256
  ): Promise<ImageData | null> => {
    const box = detection.detection.box;

    const getCenter = (points: { x: number; y: number }[]) => {
      const sum = points.reduce(
        (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
        { x: 0, y: 0 }
      );
      return { x: sum.x / points.length, y: sum.y / points.length };
    };

    let rotation = 0;
    let faceCenter = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    let cropSize = Math.max(box.width, box.height) * 1.6;

    if (detection.landmarks) {
      const leftEye = detection.landmarks.getLeftEye();
      const rightEye = detection.landmarks.getRightEye();
      const jaw = detection.landmarks.getJawOutline(); // chin landmarks

      if (leftEye.length > 0 && rightEye.length > 0) {
        const leftEyeCenter = getCenter(leftEye);
        const rightEyeCenter = getCenter(rightEye);

        const dx = rightEyeCenter.x - leftEyeCenter.x;
        const dy = rightEyeCenter.y - leftEyeCenter.y;
        rotation = Math.atan2(dy, dx);

        const eyeDistance = Math.sqrt(dx * dx + dy * dy);

        const eyeMidpoint = {
          x: (leftEyeCenter.x + rightEyeCenter.x) / 2,
          y: (leftEyeCenter.y + rightEyeCenter.y) / 2,
        };

        // Use the bottom jaw point (chin tip) for vertical centering
        let chinY = eyeMidpoint.y + eyeDistance * 1.2; // fallback
        if (jaw && jaw.length > 0) {
          // The chin tip is roughly the middle of the jaw outline (index 8 in 68-point model)
          const chinPoint = jaw[Math.floor(jaw.length / 2)];
          chinY = chinPoint.y;
        }

        // Center between the top of forehead and chin
        // Forehead is approximately eyeDistance above the eyes
        const foreheadY = eyeMidpoint.y - eyeDistance * 1.0;
        const faceMidY = (foreheadY + chinY) / 2;

        faceCenter = {
          x: eyeMidpoint.x,
          y: faceMidY,
        };

        // Crop size based on full face height (forehead to chin)
        const faceHeight = chinY - foreheadY;
        cropSize = faceHeight * 1.15; // slight padding around face
      }
    }

    cropSize = Math.max(64, Math.min(cropSize, Math.max(sourceImage.width, sourceImage.height)));

    const out = document.createElement('canvas');
    out.width = targetSize;
    out.height = targetSize;
    const outCtx = out.getContext('2d');
    if (!outCtx) return null;

    outCtx.imageSmoothingEnabled = true;
    outCtx.imageSmoothingQuality = 'high';

    outCtx.translate(targetSize / 2, targetSize / 2);
    outCtx.rotate(-rotation);

    const scale = targetSize / cropSize;
    outCtx.scale(scale, scale);

    outCtx.drawImage(sourceImage, -faceCenter.x, -faceCenter.y);

    outCtx.setTransform(1, 0, 0, 1, 0, 0);
    return outCtx.getImageData(0, 0, targetSize, targetSize);
  }, []);

  return {
    isModelLoaded,
    isLoading,
    error,
    loadModels,
    detectFace,
    cropFace,
  };
}
