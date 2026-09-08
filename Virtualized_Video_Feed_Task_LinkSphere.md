## L I NKSPHERE TECHNOLOGI ES

## Virtualized Video Feed with Gestures & Simulated Upscaling

TARGET ROLE

Senior React Native Developer

Recording

TIME ALLOTMENT

DELIVERABLE FORMAT

48–72h window (4–6h dev effort)

GitHub Repo + 30–60s Screen

## 1. OBJECTIVE & SCENARIO

LinkSphere Technologies is engineering a responsive consumer media platform. This take-home task evaluates your ability to build a smooth, vertically scrolling video feed that balances UI-thread performance (60+ FPS), aggressive memory recycling, gesture physics, and local state persistence without Cumulative Layout Shift (CLS).

## 2. TECH STACK & DESIGN TOKENS

|   | Area Specification / Library |   | Configuration & Tokens |   |   |
| --- | --- | --- | --- | --- | --- |
|   | Framework React Native 0.73+ (CLI or Bare |   | Strict TypeScript mode enabled |   |   |
|   | Expo) Feed Virtualization @shopify/flash-list |   | Configured with pagingEnabled |   |   |
|   | Gestures & Animations react-native-gesture-handler + |   |   | Native UI thread execution via Reanimated |   |
|   | Worklets react-native-reanimated v3 Video Playback react-native-video or expo-video / expo-av Local Persistence react-native-mmkv |   |   | Lifecycle-managed stream switching Synchronous, zero UI-latency caching |   |
|   | UI Theme & Tokens Target App Theme: Deep dark #0A0A0E, Card #14141B Icons lucide-react-native |   | Accents: #8B5CF6 (Purple) & #06B6D4 (Cyan) rgba(255,255,255,0.12) | Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, Sparkles, Sliders | ; Glassmorphic cards: rgba(255,255,255,0.06) with 1px border |

## 3. DATA SOURCES (NO BACKEND REQUIRED)

To keep this strictly client-side, do not write a custom backend. Choose either of the following data strategies:

- Public CDN / Sample Video URLs (Recommended): Populate a static array of at least 6–8 public MP4/HLS sample streaming links (e.g., standard Google Cloud Storage / Cloudflare / Big Buck Bunny / Fastly test streams).

- Local Bundled Assets: Bundle 2–3 lightweight MP4 files inside assets/ and loop them across the feed array.


## 4. DELIVERABLES & CORE TASKS

## Task 1: Virtualized Infinite Feed (@shopify/flash-list)

- Implement a vertical scrolling feed using @shopify/flash-list configured with pagingEnabled.

- Enforce explicit estimatedItemSize matching the window height to prevent blank areas.

- Use viewability listeners (onViewableItemsChanged) to autoplay only the focused video cell in the viewport. Immediately pause and release decoding memory for off-screen items.

Gestures

- Attach a double-tap gesture to the video card using react-native-gesture-handler.

- Trigger a floating Heart icon animation running purely on the native UI thread via Reanimated worklets (spring- scale up, vertical translation, and fade out).

- Optimistically write the "Liked" count and state to react-native-mmkv with zero UI latency.

Architecture

## Task 2: 60 FPS Double-Tap Gesture (Reanimated v3 Worklets)

## Task 3: Dynamic Resolution & Simulated Upscaling Layer

- Implement a floating glassmorphic toggle button utilizing the Sparkles icon labeled "AI Upscale / HD".

- Toggling ON must dynamically switch playback to a higher-bitrate stream URL or apply a native dynamic sharpness/contrast filter layer.

- Critical Requirement: Preserve continuous playback—swapping streams/qualities must preserve currentTime without resetting video progress to 0:00.

- Display an animated HUD toast ("Upscaled 1080p") that automatically fades out after 2 seconds.

Playback

## Task 4: Ad Placement Without Layout Shifts (Zero CLS)

- Inject a mock sponsored card at every 5th feed index.

- Allocate fixed-dimension skeleton containers so the feed never stutters, recalculates height, or triggers Cumulative Layout Shift (CLS) when items mount.

Stability

## 5. EVALUATION CRITERIA & SUBMISSION INSTRUCTIONS

## Memory & Lifecycle

Off-screen video instances must cease audio and frame decoding immediately to prevent memory leaks.

## UI Thread Isolation

Zero frame dips below 60 fps during continuous scrolling or simultaneous double-tap gestures.

## Code Hygiene

Strict TypeScript interfaces without arbitrary any declarations, modular component structure, and separation of video prefetching hooks.

## Submission Instructions:

- 1. Push code to a public GitHub repository.

- 2. Provide a README.md with clear build and run commands for iOS and Android.

- 3. Attach a 30–60 second screen recording demonstrating smooth paging, the double-tap animation, and seamless upscaling without playback restarts.

---

## 6. STEP-BY-STEP IMPLEMENTATION PLAN

### Phase 1: Architecture, Environment & Strict TypeScript Setup

#### 1.1 Project Initialization & Dependency Installation
- Scaffold a React Native project using Expo Bare / Prebuild workflow (`npx create-expo-app@latest ./ --template bare-minimum`) or React Native 0.74+ CLI.
- Ensure strict TypeScript mode in `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "noUncheckedIndexedAccess": true
    }
  }
  ```
- Install core dependencies:
  - Feed Virtualization: `@shopify/flash-list`
  - Gestures & Native UI Animations: `react-native-gesture-handler`, `react-native-reanimated` (v3)
  - Synchronous Local Cache: `react-native-mmkv`
  - Video Playback Engine: `react-native-video` (v6) or `expo-video`
  - UI Icons: `lucide-react-native`
  - Linear Gradient & Glassmorphism: `expo-linear-gradient`, `expo-blur`
- Configure `babel.config.js` with `react-native-reanimated/plugin` as the last plugin.

#### 1.2 Design System & Token Configuration (`src/theme/tokens.ts`)
- Target Theme:
  - Deep Dark Background: `#0A0A0E`
  - Card Surface: `#14141B`
  - Accents: Primary `#8B5CF6` (Vibrant Purple), Secondary `#06B6D4` (Electric Cyan)
  - Glassmorphic Cards: `backgroundColor: 'rgba(255, 255, 255, 0.06)'`, `borderColor: 'rgba(255, 255, 255, 0.12)'`, `borderWidth: 1`
  - Typography: Crisp white `#FFFFFF` with muted secondary `#94A3B8`

#### 1.3 Strict Type Schemas (`src/types/feed.ts`)
- Define strict discriminating union models:
  ```typescript
  export type VideoQuality = 'SD' | 'AI_UPSCALE_HD';

  export interface VideoItem {
    id: string;
    type: 'video';
    author: {
      username: string;
      avatarUrl: string;
    };
    caption: string;
    musicTrack: string;
    streams: {
      standardUrl: string;    // 720p stream
      upscaledUrl: string;    // 1080p high-bitrate stream
    };
    initialLikes: number;
    initialComments: number;
    initialShares: number;
    aspectRatio?: number;
  }

  export interface AdItem {
    id: string;
    type: 'ad';
    brandName: string;
    tagline: string;
    mediaUrl: string;
    ctaText: string;
    ctaUrl: string;
    sponsoredLabel: string;
  }

  export type FeedItem = VideoItem | AdItem;
  ```

---

### Phase 2: Data Modeling & Zero-CLS Ad Injection (Task 4)

#### 2.1 Video Stream Dataset (`src/data/mockFeed.ts`)
- Populate static catalog of 8+ reliable public test streams (Google Cloud Storage / Fastly / Cloudflare HLS/MP4 samples) with dual-bitrate definitions (`standardUrl` and `upscaledUrl`).

#### 2.2 Sponsored Ad Injection Algorithm
- Write an injection utility `generateFeedWithAds(videos: VideoItem[]): FeedItem[]`:
  - Every 5th position (`(index + 1) % 5 === 0`) inserts a sponsored `AdItem`.
  - Guarantees predictable item positioning and stable key generation.

#### 2.3 Fixed-Dimension Skeleton & Container Layout (`src/components/feed/CellSkeleton.tsx`)
- Compute exact screen dimensions via `Dimensions.get('window')`.
- Enforce strict width and height matching window viewport (`width: WINDOW_WIDTH, height: WINDOW_HEIGHT`).
- Prevent Cumulative Layout Shift (CLS) by mounting fixed-size skeletons with subtle shimmer/pulse animation during media buffering.

---

### Phase 3: Virtualized Infinite Feed with Aggressive Memory Recycling (Task 1)

#### 3.1 FlashList Configuration (`src/components/feed/VideoFeed.tsx`)
- Configure `@shopify/flash-list`:
  - `pagingEnabled={true}`
  - `decelerationRate="fast"`
  - `showsVerticalScrollIndicator={false}`
  - `estimatedItemSize={WINDOW_HEIGHT}`
  - `getItemType={(item: FeedItem) => item.type}` (ensures distinct cell recycling pools for videos vs. ads)

#### 3.2 Viewport Visibility Tracking
- Configure `viewabilityConfig`:
  - `itemVisiblePercentThreshold: 80` (requires 80% visibility before triggering playback)
  - `minimumViewTime: 120` ms (debounces quick fling scrolls)
- Connect `onViewableItemsChanged` to track `activeItemId`.

#### 3.3 Strict Memory & Decoding Lifecycle Management
- Inside `VideoCell.tsx`:
  - Compute `isActive = (item.id === activeItemId)`.
  - When `isActive === true`: Mount the native video playback engine and begin decoding/playback.
  - When `isActive === false`: Immediately pause audio/video and release decoding resources (`paused={true}` and teardown playback surface), displaying only a cached static poster thumbnail.
  - This guarantees that at most **one** active video decoder is consuming GPU/hardware resources, completely avoiding out-of-memory (OOM) crashes.

---

### Phase 4: 60 FPS Double-Tap Gesture & Reanimated v3 Worklets (Task 2)

#### 4.1 Native Gesture Detector Setup (`src/components/video/VideoGestureContainer.tsx`)
- Wrap the video cell in `GestureDetector` using `react-native-gesture-handler`:
  ```typescript
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(250)
    .onStart((event) => {
      'worklet';
      // UI-thread coordinate capture and animation trigger
      triggerFloatingHeartWorklet(event.x, event.y);
    });
  ```

#### 4.2 Reanimated v3 UI-Thread Heart Animation (`src/components/video/FloatingHeart.tsx`)
- Create shared values: `scale = useSharedValue(0)`, `translateY = useSharedValue(0)`, `opacity = useSharedValue(0)`.
- Worklet execution purely on the native UI thread:
  1. `scale.value = withSequence(withSpring(1.3), withSpring(1.0))`
  2. `translateY.value = withTiming(-100, { duration: 800 })`
  3. `opacity.value = withSequence(withTiming(1, { duration: 150 }), withDelay(400, withTiming(0, { duration: 250 })))`
- Zero bridge crossing: Runs at solid 60+ FPS regardless of JavaScript thread activity.

#### 4.3 Synchronous Zero UI-Latency Persistence (`src/storage/mmkv.ts`)
- Use `react-native-mmkv` directly:
  ```typescript
  export const feedStorage = new MMKV({ id: 'linksphere-feed-storage' });

  export const toggleLikeOptimistic = (videoId: string, currentLikes: number): { isLiked: boolean; newCount: number } => {
    const isLiked = !feedStorage.getBoolean(`liked_${videoId}`);
    const delta = isLiked ? 1 : -1;
    const newCount = (feedStorage.getNumber(`likes_${videoId}`) ?? currentLikes) + delta;
    
    feedStorage.set(`liked_${videoId}`, isLiked);
    feedStorage.set(`likes_${videoId}`, newCount);
    return { isLiked, newCount };
  };
  ```
- Updates occur synchronously with zero frame drop or UI delay.

---

### Phase 5: Dynamic Resolution & Simulated Upscaling Layer (Task 3)

#### 5.1 Glassmorphic Upscale Toggle Button
- Floating glassmorphic button styled with `rgba(255,255,255,0.06)`, border `rgba(255,255,255,0.12)`, and the `Sparkles` icon (`lucide-react-native`).
- Styled with active purple (`#8B5CF6`) and cyan (`#06B6D4`) glow indicators.

#### 5.2 Seamless Continuous Playback Stream Switching
- Problem: Changing video URL often resets `currentTime` to `0:00`.
- Solution Architecture:
  1. Continuous time tracking: Maintain `currentPlayheadRef.current` updated via `onProgress` / time listener.
  2. When toggling upscale mode (`SD` <-> `AI_UPSCALE_HD`):
     - Update stream URI to `upscaledUrl` (or `standardUrl`).
     - Pass `initialTime={currentPlayheadRef.current}` or invoke native `playerRef.current?.seek(currentPlayheadRef.current)` upon buffer ready.
     - Keep the player component mounted so the layout remains steady.
  3. Native Contrast & Sharpness Filter Layer:
     - Overlay a native high-pass dynamic contrast/sharpness enhancer layer over the video container.
     - Provides instant perceived AI upscaling visual clarity while the 1080p stream completes buffering.

#### 5.3 Animated Glassmorphic HUD Toast
- Reanimated HUD toast container positioned at top-center:
  - Displays `"✨ AI Upscaled 1080p • Neural Enhanced"`.
  - Triggers spring slide-down and fade-in on toggle.
  - Automatically fades out after exactly 2000ms using `withDelay(2000, withTiming(0))`.

---

### Phase 6: Sponsored Card Layout & Action Overlays (Task 4)

#### 6.1 Sponsored Ad Card (`src/components/ad/SponsoredAdCell.tsx`)
- Zero-CLS guarantee: Container dimensions strictly pinned to viewport dimensions (`width: WINDOW_WIDTH, height: WINDOW_HEIGHT`).
- Elements:
  - "Sponsored" glassmorphic pill badge with brand icon.
  - High-impact promotional hero media with dark gradient scrim.
  - Brand headline, description tagline, and call-to-action button ("Learn More" with cyan/purple gradient accent).
  - External linking via React Native `Linking.openURL`.

#### 6.2 Interactive Sidebar Action Buttons (`src/components/video/VideoOverlay.tsx`)
- Glassmorphic circular icon buttons on the right rail:
  - Heart (Like counter with active pink/red fill)
  - MessageCircle (Comments counter)
  - Share2 (Share sheet invocation)
  - Bookmark (Save video state)
  - Volume2 / VolumeX (Global audio mute toggle)
  - Author info, username handle, caption, and music track ticker at bottom-left.

---

### Phase 7: Verification, Benchmarking & Submission Deliverables

#### 7.1 Automated Testing Suite
- Data layer tests: Validate ad injection algorithm places ads exactly at indices 4, 9, 14... (`feedData.test.ts`).
- Storage tests: Validate MMKV like state toggling, count arithmetic, and persistence consistency (`storage.test.ts`).
- TypeScript type checking: Run `npx tsc --noEmit` to verify zero `any` declarations.

#### 7.2 Manual & Performance Verification Checklist
1. **Paging & Virtualization**:
   - Verify smooth vertical snapping with no blank spaces or viewport shifts.
   - Verify off-screen cells release audio and video decoding.
2. **60 FPS Gesture Isolation**:
   - Open Performance Monitor (`Cmd + D` / `Cmd + M`).
   - Trigger rapid double-taps while scrolling; verify UI FPS stays at 60 FPS.
3. **Continuous Upscale Playback**:
   - Play video to 10s, toggle "AI Upscale / HD", and verify playback resumes immediately from 10s without restarting to 0:00.
   - Verify "Upscaled 1080p" HUD toast animates in and dismisses after 2 seconds.
4. **Zero CLS on Ad Mounting**:
   - Scroll to 5th item; ensure sponsored ad renders with zero layout shift or stutter.
5. **Submission Deliverables**:
   - Push code to a public GitHub repository.
   - Provide comprehensive `README.md` with iOS & Android run commands.
   - Record 30–60 second screen recording demonstrating all required flows.
