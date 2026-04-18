# Avatar Face Try-On Component

A reusable, modular Avatar Face Try-On system built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Automatically detects faces from camera/upload and overlays them on avatar templates.

## 🎯 Features

- **Camera & Upload**: Open camera or upload image
- **AI Face Detection**: Automatic face detection using face-api.js
- **Face Cropping**: Smart face extraction with padding
- **Background Removal**: Automatic background removal before overlay
- **Avatar System**: Multiple avatar templates with configurable face areas
- **Calibration Mode**: Live adjustment of face area positions with visual feedback
- **Real-time Overlay**: Canvas-based face positioning with drag/zoom
- **Download**: Export final avatar image
- **Responsive**: Mobile-first dark UI with glassmorphism effects

## 📁 Files Structure

```
src/app/camera/
├── page.tsx                    # Main page with two-column layout
├── camera.tsx                  # Component exports
├── types.ts                    # TypeScript interfaces
├── avatarConfig.ts             # Avatar configurations
├── components/
│   ├── Camera.tsx              # Camera/Upload component
│   ├── AvatarCanvas.tsx        # Face overlay canvas
│   ├── AvatarSelector.tsx      # Avatar picker
│   └── FaceDetectionLoader.tsx # Loading indicator
├── hooks/
│   └── useFaceDetection.ts     # Face detection hook
│   └── useBackgroundRemoval.ts # Background removal hook
└── types/
    └── face-api.d.ts           # Type declarations
```

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install face-api.js framer-motion lucide-react
```

### 2. Download Face Detection Models

Create `/public/models/` and download:

```bash
# Tiny Face Detector
curl -L -o public/models/tiny_face_detector_model-weights_manifest.json https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-weights_manifest.json
curl -L -o public/models/tiny_face_detector_model-shard1 https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-shard1

# Face Landmarks
curl -L -o public/models/face_landmark_68_model-weights_manifest.json https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-weights_manifest.json
curl -L -o public/models/face_landmark_68_model-shard1 https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-shard1
```

### 3. Add Avatar Images

Place avatar PNGs with transparent face areas in `/public/avatars/`:
- `/public/avatars/man.png`
- `/public/avatars/woman.png`

### 4. Configure Avatars

Edit `avatarConfig.ts` to match your avatar image dimensions:

```typescript
export const avatars: Avatar[] = [
  {
    id: 'man',
    name: 'Classic Man',
    image: '/avatars/man.png',
    faceArea: {
      x: 125,    // Face position X
      y: 110,    // Face position Y
      width: 150, // Face area width
      height: 180, // Face area height
      rotate: 0,  // Optional rotation
    },
  },
  // Add more avatars...
];
```

### 5. Use in Your App

Copy the entire `/camera` directory to your Next.js app and navigate to `/camera`.

## 🎨 Customization

### Avatar Configuration

Each avatar needs:
- **image**: Path to PNG with transparent face area
- **faceArea**: Precise coordinates where face should be placed
- **name**: Display name for the avatar

### UI Theming

The component uses Tailwind CSS with these custom colors:
- `gold-500/10` - Accent backgrounds
- `obsidian-950` - Dark background
- `gold-400` - Primary text/accent

Adjust in your `tailwind.config.ts`:

```typescript
colors: {
  gold: { /* your gold palette */ },
  obsidian: { /* your dark palette */ },
}
```

### Canvas Size

Default canvas is 400x400px. Modify in `AvatarCanvas.tsx`:

```typescript
canvas.width = 400;
canvas.height = 400;
```

## 🔧 API Reference

### useFaceDetection Hook

```typescript
const {
  isModelLoaded,
  isLoading,
  error,
  loadModels,
  detectFace,
  cropFace,
} = useFaceDetection();
```

### Avatar Type

```typescript
interface Avatar {
  id: string;
  name: string;
  image: string;
  faceArea: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate?: number;
  };
}
```

### FaceDetectionResult

```typescript
interface FaceDetectionResult {
  detection: {
    box: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
  landmarks?: FaceLandmarks;
}
```

## 🎮 How It Works

1. **Camera Capture**: User takes photo or uploads image
2. **Face Detection**: AI detects face using TinyFaceDetector
3. **Face Cropping**: Extracts face with 20% padding, resizes to 256x256
4. **Background Removal**: Automatically removes background from cropped face
5. **Avatar Overlay**: Places processed face in avatar's face area
6. **Interactive Controls**: Drag to position, zoom to scale
7. **Calibration**: Adjust face area position with live preview
8. **Export**: Download final image

## 🌟 Advanced Features

### Custom Face Detection Thresholds

Edit `useFaceDetection.ts`:

```typescript
const detection = await faceapi
  .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions({ 
    inputSize: 512, 
    scoreThreshold: 0.5  // Lower = more sensitive
  }))
  .withFaceLandmarks();
```

### Face Shape Masking

Change face clipping shape in `AvatarCanvas.tsx`:

```typescript
// Circle (default)
ctx.beginPath();
ctx.arc(centerX, centerY, width / 2, 0, Math.PI * 2);

// Ellipse
ctx.beginPath();
ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, Math.PI * 2);

// Rectangle
ctx.rect(x, y, width, height);
```

### Background Removal

The system includes client-side background removal:

```typescript
// In useBackgroundRemoval.ts
const { removeBackground, isProcessing, error } = useBackgroundRemoval();

// Applied after face cropping
const processedFace = await removeBackground(croppedFace);
```

**Customization options:**
- Adjust detection thresholds in `isPixelBackground()`
- Modify smoothing algorithms in `smoothEdges()`
- Replace with external API (remove.bg) for better results

### Calibration Mode

Enable live adjustment of face area positions:

```typescript
// Enable in AvatarCanvas
<AvatarCanvas showFaceArea={true} />

// UI controls for x, y, width, height
// Linked width/height ratio preservation
// Copy Config button for easy setup
```

### Performance Optimization

- Use smaller input images for faster detection
- Cache face detection results
- Preload avatar images

## 🐛 Troubleshooting

### Face Not Detected
- Ensure good lighting
- Face should be clearly visible
- Try different angles
- Adjust `scoreThreshold` in detection options

### Face Position Wrong
- Calibrate `faceArea` coordinates in `avatarConfig.ts`
- Use browser dev tools to measure exact positions
- Test with different face sizes

### Models Not Loading
- Check `/public/models/` directory exists
- Verify all 4 model files are downloaded
- Check network tab for 404 errors

### Background Removal Issues
- Poor lighting may affect removal quality
- Complex backgrounds may need manual adjustment
- Try using plain backgrounds for best results
- Consider external API for professional results

### Calibration Mode Problems
- Face area rectangle not aligned with avatar face
- Use "Copy Config" to save calibrated values
- Test with different avatar sizes
- Ensure aspect ratio is preserved

### Build Errors
- Ensure `face-api.js` types are installed
- Check Next.js image optimization settings
- Verify all imports are correct

## 📱 Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Camera access supported
- **Safari**: Requires HTTPS for camera
- **Mobile**: Touch gestures supported for drag

## 🚀 Production Tips

1. **Preload Models**: Load face detection models on app start
2. **Image Optimization**: Compress avatar images
3. **Error Handling**: Graceful fallbacks for camera denied
4. **Analytics**: Track avatar selection and usage
5. **CDN**: Serve models and avatars from CDN

## 📄 License

MIT License - Feel free to use in commercial projects.
