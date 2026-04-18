'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar } from '../types';
import { Download, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface AvatarCanvasProps {
  avatar: Avatar;
  faceImageData: ImageData | null;
  faceScale: number;
  faceOffsetX: number;
  faceOffsetY: number;
  onScaleChange: (scale: number) => void;
  onOffsetChange: (x: number, y: number) => void;
  showFaceArea?: boolean;
}

export function AvatarCanvas({
  avatar,
  faceImageData,
  faceScale,
  faceOffsetX,
  faceOffsetY,
  onScaleChange,
  onOffsetChange,
  showFaceArea = false,
}: AvatarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [avatarImage, setAvatarImage] = useState<HTMLImageElement | null>(null);
  const [faceImage, setFaceImage] = useState<HTMLImageElement | null>(null);
  const [facePreviewUrl, setFacePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Load avatar image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setAvatarImage(img);
    img.src = avatar.image;
  }, [avatar.image]);

  // Convert ImageData to Image
  useEffect(() => {
    if (!faceImageData) {
      setFaceImage(null);
      setFacePreviewUrl(null);
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = faceImageData.width;
    canvas.height = faceImageData.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.putImageData(faceImageData, 0, 0);
      const url = canvas.toDataURL();
      const img = new Image();
      img.onload = () => setFaceImage(img);
      img.src = url;
      setFacePreviewUrl(url);
    }
  }, [faceImageData]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fallbackSize = 400;
    const targetWidth = avatarImage?.naturalWidth || fallbackSize;
    const targetHeight = avatarImage?.naturalHeight || fallbackSize;

    if (canvas.width !== targetWidth) canvas.width = targetWidth;
    if (canvas.height !== targetHeight) canvas.height = targetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw avatar first (as background)
    if (avatarImage) {
      ctx.drawImage(avatarImage, 0, 0, canvas.width, canvas.height);
    }


    if (showFaceArea) {
      const { x, y, width, height } = avatar.faceArea;
      ctx.save();
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.85)';
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 8]);
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = 'rgba(250, 204, 21, 0.15)';
      ctx.fillRect(x, y, width, height);
      ctx.restore();
    }
  }, [avatarImage, faceImage, avatar, faceScale, faceOffsetX, faceOffsetY, showFaceArea]);

  // Handle drag
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    dragStartRef.current = {
      x: mouseX - faceOffsetX,
      y: mouseY - faceOffsetY,
    };
    setIsDragging(true);
  }, [faceOffsetX, faceOffsetY]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    const x = mouseX - dragStartRef.current.x;
    const y = mouseY - dragStartRef.current.y;

    onOffsetChange(x, y);
  }, [isDragging, onOffsetChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Download result
  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `avatar-${avatar.id}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [avatar.id]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        width={avatarImage?.naturalWidth || 400}
        height={avatarImage?.naturalHeight || 400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full max-w-[400px] h-auto rounded-2xl shadow-2xl cursor-move border border-gold-500/30"
      />

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-gold-500/20">
        <button
          onClick={handleDownload}
          className="p-2 hover:bg-gold-500/20 rounded-full transition-colors text-gold-400"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Face preview */}
      {faceImageData && !showFaceArea && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          {facePreviewUrl && (
            <img
              src={facePreviewUrl}
              alt="Face preview"
              className="w-12 h-16 rounded-full object-cover border border-gold-500/30 shadow-lg bg-black/40"
            />
          )}
        </div>
      )}
    </motion.div>
  );
}
