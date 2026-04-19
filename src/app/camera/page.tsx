'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { Camera } from './components/Camera';
import { AvatarCanvas } from './components/AvatarCanvas';
import { AvatarSelector } from './components/AvatarSelector';
import { FaceDetectionLoader } from './components/FaceDetectionLoader';
import { useFaceDetection } from './hooks/useFaceDetection';
import { avatars, DEFAULT_AVATAR } from './avatarConfig';
import { Avatar } from './types';

export default function CameraPage() {
  const [captureError, setCaptureError] = useState<string | null>(null);
  const [croppedFaceData, setCroppedFaceData] = useState<ImageData | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(DEFAULT_AVATAR);
  const [faceScale, setFaceScale] = useState(1);
  const [faceOffsetX, setFaceOffsetX] = useState(0);
  const [faceOffsetY, setFaceOffsetY] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
    
  const { isLoading, error, loadModels, detectFace, cropFace } = useFaceDetection();

  // Load models on mount
  useEffect(() => {
    loadModels();
  }, [loadModels]);

  const handleCapture = useCallback(async (imageData: ImageData) => {
    setCaptureError(null);
    setFaceScale(1);
    setFaceOffsetX(0);
    setFaceOffsetY(0);
    setCroppedFaceData(null);

    // Create image element from ImageData
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.putImageData(imageData, 0, 0);

    const img = new Image();
    img.onload = async () => {
      const detection = await detectFace(img);
      if (!detection) {
        setCaptureError('لم يتم اكتشاف وجه واضح. جرّب إضاءة أفضل أو قرب الكاميرا من وجهك.');
        return;
      }

      // Use avatar face area dimensions for better fit (more reasonable size)
      const targetSize = Math.max(selectedAvatar.faceArea.width, selectedAvatar.faceArea.height) * 1.8;
      const cropped = await cropFace(img, detection, targetSize);
      if (!cropped) {
        setCaptureError('حصلت مشكلة أثناء قص الوجه. جرّب صورة أخرى.');
        return;
      }

      setCroppedFaceData(cropped);

      // Adjust scale
      const paddingRatio = 0.55;
      setFaceScale(paddingRatio);
      setFaceOffsetX(0);
      setFaceOffsetY(-selectedAvatar.faceArea.height * 0.05);

      // Auto-scroll to preview section on mobile
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    };
    img.src = canvas.toDataURL();
  }, [detectFace, cropFace, selectedAvatar.faceArea.width, selectedAvatar.faceArea.height]);

  const handleImageUpload = useCallback((file: File) => {
    // Handle file upload if needed
    console.log('Uploaded file:', file.name);
  }, []);

  const handleAvatarSelect = useCallback((avatar: Avatar) => {
    setSelectedAvatar(avatar);
    // Reset adjustments for new avatar
    setFaceScale(1);
    setFaceOffsetX(0);
    setFaceOffsetY(0);
  }, []);

  return (
    <main className="min-h-screen bg-obsidian-950 py-6 md:py-12 px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 rounded-full border border-gold-500/30 mb-4">
          <Sparkles size={18} className="text-gold-400" />
          <span className="text-gold-300 text-xs md:text-sm font-medium uppercase tracking-wider">AI-Powered Face Try-On</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-3">
          Avatar <span className="text-gold-400">Face Try-On</span>
        </h1>
        <p className="text-gray-400 text-xs md:text-base max-w-md mx-auto leading-relaxed">
          Take a selfie and see your face automatically placed on our exclusive collection avatars.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-10">
          {/* Left Column - Camera */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-obsidian-900/40 backdrop-blur-sm rounded-[2rem] p-5 md:p-8 border border-gold-500/10"
          >
            <h2 className="text-base md:text-lg font-medium text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-xs text-gold-400 font-bold">1</span>
              Capture Photo
            </h2>
            <Camera onCapture={handleCapture} onImageUpload={handleImageUpload} />

            {/* Mobile hint to scroll down after capture */}
            {croppedFaceData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center gap-2 text-gold-400/60 text-xs lg:hidden"
              >
                <ChevronDown size={14} className="animate-bounce" />
                <span>Scroll down to see your avatar</span>
                <ChevronDown size={14} className="animate-bounce" />
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Avatar Preview */}
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-obsidian-900/40 backdrop-blur-sm rounded-[2rem] p-5 md:p-8 border border-gold-500/10"
          >
            <h2 className="text-base md:text-lg font-medium text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-xs text-gold-400 font-bold">2</span>
              Avatar Preview
            </h2>
            
            <AnimatePresence mode="wait">
              {croppedFaceData ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6"
                >
                  <AvatarCanvas
                    avatar={selectedAvatar}
                    faceImageData={croppedFaceData}
                    faceScale={faceScale}
                    faceOffsetX={faceOffsetX}
                    faceOffsetY={faceOffsetY}
                    onScaleChange={setFaceScale}
                    onOffsetChange={(x, y) => {
                      setFaceOffsetX(x);
                      setFaceOffsetY(y);
                    }}
                  />

                  <AvatarSelector
                    avatars={avatars}
                    selectedAvatar={selectedAvatar}
                    onSelect={handleAvatarSelect}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-[280px] md:h-[400px] flex flex-col items-center justify-center text-center p-6 bg-obsidian-950/50 rounded-2xl border border-gold-500/5"
                >
                  <div className="w-20 h-20 rounded-full bg-gold-500/5 flex items-center justify-center mb-6 border border-gold-500/10">
                    <Sparkles size={32} className="text-gold-500/20" />
                  </div>
                  <p className="text-gold-200/60 text-sm md:text-base mb-2 font-medium">
                    Ready to see the magic?
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm max-w-[240px]">
                    Capture or upload a photo to automatically place your face on the avatar.
                  </p>

                  {captureError && (
                    <p className="mt-6 text-sm text-red-400/80 bg-red-400/5 px-4 py-2 rounded-lg border border-red-400/10 max-w-sm">
                      {captureError}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Model Loading Indicator */}
      <FaceDetectionLoader isLoading={isLoading} error={error} />
    </main>
  );
}
