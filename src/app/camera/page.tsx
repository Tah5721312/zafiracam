'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Sparkles } from 'lucide-react';
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

      // Adjust scale: the cropped face includes padding, so scale down to fit face area
      // Typical face occupies ~60% of crop, so we scale by ~0.6 to fit
      const paddingRatio = 0.55;
      setFaceScale(paddingRatio);
      setFaceOffsetX(0);
      setFaceOffsetY(-selectedAvatar.faceArea.height * 0.05);
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
    <main className="min-h-screen bg-obsidian-950 py-8 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 rounded-full border border-gold-500/30 mb-4">
          <Sparkles size={18} className="text-gold-400" />
          <span className="text-gold-300 text-sm font-medium">AI-Powered Face Try-On</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-gold-100 mb-2">
          Avatar Face Try-On
        </h1>
        <p className="text-gold-400/70 text-sm max-w-md mx-auto">
          Take a selfie and see your face automatically placed on different avatars.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Camera */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-obsidian-900 to-obsidian-950 rounded-3xl p-6 border border-gold-500/20"
          >
            <h2 className="text-lg font-medium text-gold-200 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-sm text-gold-400">1</span>
              Capture Photo
            </h2>
            <Camera onCapture={handleCapture} onImageUpload={handleImageUpload} />
          </motion.div>

          {/* Right Column - Avatar Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-obsidian-900 to-obsidian-950 rounded-3xl p-6 border border-gold-500/20"
          >
            <h2 className="text-lg font-medium text-gold-200 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-sm text-gold-400">2</span>
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
                  className="h-[400px] flex flex-col items-center justify-center text-gold-400/50"
                >
                  <div className="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                    <Sparkles size={40} className="text-gold-500/30" />
                  </div>
                  <p className="text-center">
                    Capture or upload a photo first<br />
                    to see the avatar preview
                  </p>

                  {captureError && (
                    <p className="mt-4 text-center text-sm text-red-400 max-w-sm">
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
