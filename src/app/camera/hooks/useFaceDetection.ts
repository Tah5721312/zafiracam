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

      if (leftEye.length > 0 && rightEye.length > 0) {
        const leftEyeCenter = getCenter(leftEye);
        const rightEyeCenter = getCenter(rightEye);

        const dx = rightEyeCenter.x - leftEyeCenter.x;
        const dy = rightEyeCenter.y - leftEyeCenter.y;
        rotation = Math.atan2(dy, dx);

        const eyeDistance = Math.sqrt(dx * dx + dy * dy);

        faceCenter = {
          x: (leftEyeCenter.x + rightEyeCenter.x) / 2,
          y: (leftEyeCenter.y + rightEyeCenter.y) / 2 + eyeDistance * 0.45,
        };

        cropSize = eyeDistance * 3.4;
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
