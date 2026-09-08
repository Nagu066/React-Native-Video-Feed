import React, { useRef, useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { VideoItem, VideoQuality } from '../../types/feed';
import { CustomVideoPlayer } from '../video/CustomVideoPlayer';
import { VideoOverlay } from '../video/VideoOverlay';
import { FloatingHeart, FloatingHeartHandle } from '../video/FloatingHeart';
import { UpscaleHUD, UpscaleHUDHandle } from '../video/UpscaleHUD';
import {
  getStoredLikeState,
  toggleLikeOptimistic,
  getStoredUpscalePreference,
  setStoredUpscalePreference,
} from '../../storage/mmkv';
import { colors } from '../../theme/tokens';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

interface VideoCellProps {
  item: VideoItem;
  isActive: boolean;
  shouldPreload?: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  itemWidth?: number;
  itemHeight?: number;
}

export const VideoCell: React.FC<VideoCellProps> = ({
  item,
  isActive,
  shouldPreload = false,
  isMuted,
  onToggleMute,
  itemWidth,
  itemHeight,
}) => {
  const heartRef = useRef<FloatingHeartHandle>(null);
  const hudRef = useRef<UpscaleHUDHandle>(null);

  // Local state synced with MMKV zero UI latency storage
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    return getStoredLikeState(item.id, item.initialLikes).isLiked;
  });

  const [likesCount, setLikesCount] = useState<number>(() => {
    return getStoredLikeState(item.id, item.initialLikes).likesCount;
  });

  // Dynamic Resolution / AI Upscale State
  const [quality, setQuality] = useState<VideoQuality>(() => {
    return getStoredUpscalePreference() ? 'AI_UPSCALE_HD' : 'SD';
  });

  // Update like state if persisted in MMKV
  useEffect(() => {
    const stored = getStoredLikeState(item.id, item.initialLikes);
    setIsLiked(stored.isLiked);
    setLikesCount(stored.likesCount);
  }, [item.id, item.initialLikes]);

  // JS callback for optimistic MMKV persistence
  const executeOptimisticLike = useCallback(() => {
    const result = toggleLikeOptimistic(item.id, item.initialLikes);
    setIsLiked(result.isLiked);
    setLikesCount(result.newCount);
  }, [item.id, item.initialLikes]);

  const triggerHeartSpawn = useCallback((x: number, y: number) => {
    heartRef.current?.spawn(x, y);
  }, []);

  // Task 2: Double-Tap Gesture with 60 FPS Native UI Execution
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(250)
    .onStart((event) => {
      'worklet';
      // UI-thread coordinate capture and floating animation
      runOnJS(triggerHeartSpawn)(event.x, event.y);
      // Synchronous optimistic state write to MMKV
      runOnJS(executeOptimisticLike)();
    });

  // Task 3: Toggle Upscale Mode
  const handleToggleUpscale = useCallback(() => {
    setQuality((prev) => {
      const nextQuality: VideoQuality =
        prev === 'AI_UPSCALE_HD' ? 'SD' : 'AI_UPSCALE_HD';
      setStoredUpscalePreference(nextQuality === 'AI_UPSCALE_HD');
      hudRef.current?.showToast(nextQuality);
      return nextQuality;
    });
  }, []);

  return (
    <View style={[styles.cellContainer, itemWidth && itemHeight ? { width: itemWidth, height: itemHeight } : null]}>
      <GestureDetector gesture={doubleTapGesture}>
        <View style={styles.touchableArea}>
          {/* Hardware Video Surface with Memory Recycling */}
          <CustomVideoPlayer
            streams={item.streams}
            quality={quality}
            isActive={isActive}
            shouldPreload={shouldPreload}
            isMuted={isMuted}
            posterUrl={item.posterUrl}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
          />

          {/* Task 2: Floating Heart Animation */}
          <FloatingHeart ref={heartRef} />

          {/* Task 3: Sparkles Toggle + 2s Animated HUD Toast */}
          <UpscaleHUD
            ref={hudRef}
            currentQuality={quality}
            onToggle={handleToggleUpscale}
            bitrateLabel={
              quality === 'AI_UPSCALE_HD'
                ? item.streams.bitrateUpscaled
                : item.streams.bitrateStandard
            }
          />

          {/* Video Metadata Overlay & Action Rail */}
          <VideoOverlay
            item={item}
            isLiked={isLiked}
            likesCount={likesCount}
            onLikePress={executeOptimisticLike}
            isMuted={isMuted}
            onToggleMute={onToggleMute}
          />
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  touchableArea: {
    flex: 1,
    position: 'relative',
  },
});
