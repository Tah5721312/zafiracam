'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera as CameraIcon, Upload, X, RotateCcw, User } from 'lucide-react';

interface CameraProps {
  onCapture: (imageData: ImageData) => void;
  onImageUpload: (file: File) => void;
}

export function Camera({ onCapture, onImageUpload }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      // Use ideal instead of exact to avoid constraint errors on some mobile devices
      const constraints = {
        video: { 
          facingMode: 'user', 
          width: { ideal: 512 }, 
          height: { ideal: 512 } 
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Explicitly play the video, as autoPlay can be unreliable on some mobile browsers
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.warn('Video play interrupted or failed:', playError);
        }
      }
      setIsCameraOpen(true);
    } catch (err) {
      console.error('Initial camera access failed, trying fallback:', err);
      
      // Fallback to simplest constraints if the preferred ones fail
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          await videoRef.current.play();
        }
        setIsCameraOpen(true);
      } catch (fallbackErr) {
        setError('تعذر فتح الكاميرا. يرجى التأكد من إعطاء الصلاحية أو استخدام خيار الرفع.');
        console.error('Camera fallback error:', fallbackErr);
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  }, []);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally for mirror effect
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    
    const imageDataUrl = canvas.toDataURL('image/png');
    setCapturedImage(imageDataUrl);
    
    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Get ImageData
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    onCapture(imageData);
    
    stopCamera();
  }, [onCapture, stopCamera]);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Resize to reasonable size
        const maxSize = 512;
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        const imageData = ctx.getImageData(0, 0, width, height);
        onCapture(imageData);
        
        setCapturedImage(canvas.toDataURL('image/png'));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    onImageUpload(file);
  }, [onCapture, onImageUpload]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const triggerNativeCamera = useCallback(() => {
    nativeCameraInputRef.current?.click();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isCameraOpen && !capturedImage && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative w-48 h-48 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20 flex items-center justify-center">
              <User size={64} className="text-gold-500/40" />
              <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-gold-500/30" />
            </div>
            
            <p className="text-gold-300 text-center text-sm">
              Take a selfie or upload a photo to try on avatars
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={startCamera}
                className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-black font-medium rounded-full transition-all transform hover:scale-105"
              >
                <CameraIcon size={20} />
                Webcam
              </button>
              
              <button
                onClick={triggerNativeCamera}
                className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-black font-medium rounded-full transition-all transform hover:scale-105"
              >
                <CameraIcon size={20} />
                Mobile Camera
              </button>
              
              <button
                onClick={triggerFileInput}
                className="flex items-center gap-2 px-6 py-3 bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 font-medium rounded-full border border-gold-500/30 transition-all"
              >
                <Upload size={20} />
                Upload
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <input
              ref={nativeCameraInputRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileUpload}
              className="hidden"
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </motion.div>
        )}

        {isCameraOpen && (
          <motion.div
            key="camera"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative"
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full max-w-md rounded-2xl shadow-xl border border-gold-500/30"
              style={{ transform: 'scaleX(-1)' }}
            />
            
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
              <button
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full bg-gold-500 hover:bg-gold-400 flex items-center justify-center shadow-lg transition-all transform hover:scale-105"
              >
                <div className="w-12 h-12 rounded-full border-4 border-black" />
              </button>
              
              <button
                onClick={stopCamera}
                className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md flex items-center justify-center border border-gold-500/30"
              >
                <X size={20} className="text-gold-400" />
              </button>
            </div>

            {/* Face guide overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-48 h-64 border-2 border-gold-500/50 rounded-full" />
            </div>
          </motion.div>
        )}

        {capturedImage && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative"
          >
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full max-w-md rounded-2xl shadow-xl border border-gold-500/30"
            />
            
            <div className="absolute inset-x-0 bottom-4 flex justify-center">
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-5 py-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-md text-gold-300 rounded-full border border-gold-500/30 transition-all"
              >
                <RotateCcw size={18} />
                Retake
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
