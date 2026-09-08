# React Native Virtualized Video Feed

A high-performance, 60+ FPS vertically scrolling virtualized video feed built with React Native, Expo, FlashList, and Reanimated v3. Engineered for aggressive memory recycling, native UI-thread gesture physics, synchronous local persistence, continuous playback stream switching, and Zero Cumulative Layout Shift (CLS).

---

## 📱 App Demo

https://github.com/Nagu066/React-Native-Video-Feed/releases/download/v1.0.0/demo.mp4

---

## 🚀 Key Features & Architecture

### 1. Virtualized Infinite Feed (`@shopify/flash-list`)
- **Paging & Layout**: Configured with `pagingEnabled` and item size matching exact viewport height (`WINDOW_HEIGHT`).
- **Memory Recycling & Viewport Lifecycle**: Uses `viewabilityConfig` (80% visible threshold) and `onViewableItemsChanged` to mount and autoplay **only** the single focused video cell in the viewport.
- **Immediate Teardown**: Off-screen video instances immediately pause playback and release decoding memory/surfaces, falling back to cached posters to guarantee zero memory leaks and prevent OOM crashes on mobile hardware.
- **Separate Cell Pools**: `getItemType` partitions video cells and sponsored ad cards into distinct recycling pools.

### 2. 60 FPS Double-Tap Gesture (`react-native-reanimated` v3 + Worklets)
- **UI-Thread Execution**: Built using `react-native-gesture-handler` (v2) and `react-native-reanimated` v3 worklets.
- **Floating Heart Animation**: Spawns directly at the double-tap touch coordinates `(x, y)`. Drives a spring scale pop (`0 -> 1.35 -> 1.0`), vertical translation (`-110px`), and smooth fade-out running completely on the native UI thread.
- **Zero Bridge Overhead**: Zero JavaScript thread blocking; zero frame dips below 60 FPS.
- **Synchronous Zero UI-Latency Persistence**: Optimistically increments like count and persists state synchronously to `react-native-mmkv`.

### 3. Dynamic Resolution & Simulated Upscaling Layer
- **Glassmorphic HUD Toggle**: Floating button with the `Sparkles` icon labeled **"AI Upscale / HD"**.
- **Continuous Playback Preservation**: Dynamically swaps playback stream between standard (720p) and upscaled (1080p high-bitrate) while tracking playhead progress. Preserves `currentTime` with sub-second precision—**never resets video progress to 0:00**.
- **Simulated Neural Upscaling Layer**: Overlays a dynamic contrast/sharpness enhancement layer for instant visual crispness while the higher-bitrate buffer fills.
- **2-Second HUD Toast**: Animated glassmorphic notification (`"✨ Upscaled 1080p • AI Enhanced"`) that slides in and automatically fades out after 2000ms.

### 4. Ad Placement Without Layout Shifts (Zero CLS)
- **Deterministic Injection**: Injects a mock sponsored brand card at every 5th feed index (`(index + 1) % 5 === 0` -> indices 4, 9, 14...).
- **Zero CLS Guarantee**: Pre-allocates fixed-dimension containers (`width: WINDOW_WIDTH`, `height: WINDOW_HEIGHT`) with shimmering skeletons (`CellSkeleton.tsx`) so the feed never recalculates dimensions, stutters, or triggers Cumulative Layout Shift when media mounts.
- **High-Impact Brand Cards**: Verified partner badges, glassmorphic card overlays, and external link handling (`Linking.openURL`).

---

## 🎨 Design Tokens & UI Aesthetics

| Token Category | Value / Specification | Description |
| :--- | :--- | :--- |
| **Deep Dark Background** | `#0A0A0E` | Main app canvas |
| **Card Surface** | `#14141B` / `#1A1A24` | Feed card backgrounds |
| **Primary Accent** | `#8B5CF6` (Vibrant Purple) | Interactive indicators & active tabs |
| **Secondary Accent** | `#06B6D4` (Electric Cyan) | AI Upscale glow & badges |
| **Glassmorphic Cards** | `rgba(255, 255, 255, 0.06)` | 1px border `rgba(255, 255, 255, 0.12)` |
| **Icons** | `lucide-react-native` | `Heart`, `MessageCircle`, `Share2`, `Bookmark`, `Volume2`, `VolumeX`, `Sparkles`, `Sliders` |

---

## 📁 Project Structure

```
├── App.tsx                          # Root container with GestureHandlerRootView & header
├── src/
│   ├── theme/
│   │   └── tokens.ts                # Deep dark palette & glassmorphic tokens
│   ├── types/
│   │   └── feed.ts                  # Strict TypeScript schemas (VideoItem, AdItem, FeedItem)
│   ├── storage/
│   │   └── mmkv.ts                  # MMKV zero-latency persistence layer
│   ├── data/
│   │   └── mockFeed.ts              # Dual-bitrate stream catalog & ad injection
│   └── components/
│       ├── feed/
│       │   ├── VideoFeed.tsx        # FlashList virtualized feed container
│       │   ├── FeedItemRenderer.tsx # Cell router (Video vs Ad)
│       │   ├── VideoCell.tsx        # Interactive video cell with gestures & state
│       │   └── CellSkeleton.tsx     # Fixed-dimension Zero-CLS placeholder
│       ├── video/
│       │   ├── CustomVideoPlayer.tsx# Native player with memory lifecycle & seek continuity
│       │   ├── FloatingHeart.tsx    # 60 FPS Reanimated worklet heart animation
│       │   ├── UpscaleHUD.tsx       # Sparkles toggle & 2-second HUD toast
│       │   └── VideoOverlay.tsx     # Author metadata & right rail action buttons
│       └── ad/
│           └── SponsoredAdCell.tsx  # Zero-CLS sponsored card with CTA
├── tests/
│   └── unitTest.mjs                 # Automated tests for ad placement, MMKV, and playhead continuity
├── package.json
└── tsconfig.json                    # Strict TypeScript configuration
```

---

## 🛠️ Build & Run Commands

### Prerequisites
- **Node.js**: v18+ (tested on Node v25)
- **npm** or **yarn**
- **iOS**: macOS with Xcode 15+ and CocoaPods (`gem install cocoapods`)
- **Android**: Android Studio with Android SDK 34+ and JDK 17+

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Quality Checks
```bash
# Verify strict TypeScript typing (Zero errors)
npm run typecheck

# Run automated tests (Ad placement, MMKV, playhead continuity)
npm test
```

### 3. Run on iOS (Simulator or Device)
```bash
npm run ios
```
*Note: To build native development binaries with CocoaPods:*
```bash
npx expo run:ios
```

### 4. Run on Android (Emulator or Device)
```bash
npm run android
```
*Note: To build native development binaries with Gradle:*
```bash
npx expo run:android
```

### 5. Run Metro Bundler
```bash
npm start
```

---

## 🧪 Verification & Demonstration Guide

| Requirement | Test & Observation |
| :--- | :--- |
| **60+ FPS Paging** | Scroll vertically through the feed. Cards snap smoothly without blank flashes or frame hitching. |
| **Double-Tap Floating Heart** | Double-tap anywhere on a video card. A glowing heart springs up from the tap coordinate, floats upward, and fades out with zero UI thread stutter. The heart icon and like counter update optimistically. |
| **Dynamic AI Upscale** | Tap the floating glassmorphic **"AI Upscale / HD"** button at the top-right. The animated HUD toast (`"✨ Upscaled 1080p • AI Enhanced"`) slides in and auto-dismisses after 2 seconds. Video playback continues uninterrupted from its exact current playhead timestamp (does not restart to 0:00). |
| **Zero-CLS Ad Placement** | Scroll to the 5th item (index 4) and 10th item (index 9). The sponsored card mounts inside the identical fixed viewport dimensions without causing content reflow or layout shifts. |
| **Memory Recycling** | Scroll past a video. Audio and frame decoding immediately halt on the off-screen video. |
