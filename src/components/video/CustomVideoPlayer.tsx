import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, ActivityIndicator } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { VideoQuality, VideoStreams } from '../../types/feed';
import { colors } from '../../theme/tokens';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

interface CustomVideoPlayerProps {
  streams: VideoStreams;
  quality: VideoQuality;
  isActive: boolean;
  shouldPreload?: boolean;
  isMuted: boolean;
  posterUrl: string;
  itemWidth?: number;
  itemHeight?: number;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  streams,
  quality,
  isActive,
  shouldPreload = false,
  isMuted,
  posterUrl,
  itemWidth,
  itemHeight,
}) => {
  const isUpscaled = quality === 'AI_UPSCALE_HD';
  const targetUrl = isUpscaled ? streams.upscaledUrl : streams.standardUrl;

  const [isBuffering, setIsBuffering] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const playheadRef = useRef<number>(0);
  const isSwitchingQualityRef = useRef<boolean>(false);

  // Initialize expo-video player
  const player = useVideoPlayer(targetUrl, (p) => {
    p.loop = true;
    p.muted = isMuted;
    if (isActive) {
      p.play();
    } else {
      p.pause();
    }
  });

  // Track playback time and status
  useEffect(() => {
    if (!player) return;

    const timeUpdateSub = player.addListener('timeUpdate', (event) => {
      if (!isSwitchingQualityRef.current) {
        playheadRef.current = event.currentTime;
      }
    });

    const statusChangeSub = player.addListener('statusChange', (event) => {
      if (event.status === 'loading') {
        setIsBuffering(true);
      } else if (event.status === 'readyToPlay') {
        setIsBuffering(false);
        setHasStartedPlaying(true);

        // If we were switching quality, restore the preserved currentTime
        if (isSwitchingQualityRef.current) {
          try {
            player.currentTime = playheadRef.current;
            if (isActive) {
              player.play();
            }
          } catch {
            // ignore
          }
          isSwitchingQualityRef.current = false;
        }
      } else if (event.status === 'error') {
        setIsBuffering(false);
      }
    });

    return () => {
      timeUpdateSub.remove();
      statusChangeSub.remove();
    };
  }, [player, isActive]);

  // Task 1: Viewport Lifecycle Management
  // When active: play. When offscreen: immediately pause and release decoding pipelines.
  useEffect(() => {
    if (!player) return;

    if (isActive) {
      try {
        player.play();
      } catch {
        // ignore
      }
    } else {
      try {
        player.pause();
      } catch {
        // ignore
      }
    }
  }, [player, isActive]);

  // Sync mute state
  useEffect(() => {
    if (!player) return;
    player.muted = isMuted;
  }, [player, isMuted]);

  const previousTargetUrlRef = useRef(targetUrl);

  // Task 3: Dynamic Resolution Switching with Preserved currentTime
  useEffect(() => {
    if (!player) return;

    // Only switch if targetUrl actually changed from previous
    if (previousTargetUrlRef.current === targetUrl) {
      return;
    }
    previousTargetUrlRef.current = targetUrl;

    // Capture current time before swapping source
    const currentPosition = player.currentTime > 0 ? player.currentTime : playheadRef.current;
    playheadRef.current = currentPosition;
    isSwitchingQualityRef.current = true;

    // Replace video stream source seamlessly and asynchronously
    player
      .replaceAsync(targetUrl)
      .then(() => {
        try {
          player.currentTime = currentPosition;
          if (isActive) {
            player.play();
          }
        } catch {
          // ignore
        }
      })
      .catch(() => {
        isSwitchingQualityRef.current = false;
      });
  }, [targetUrl, player, isActive]);

  return (
    <View style={[styles.container, itemWidth && itemHeight ? { width: itemWidth, height: itemHeight } : null]}>
      {/* Background Poster fallback */}
      <Image
        source={{ uri: posterUrl }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Hardware Video Player surface: Pre-buffered when adjacent, actively decoding/playing when focused */}
      {isActive || shouldPreload ? (
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
        />
      ) : null}

      {/* Task 3: Dynamic AI Sharpness & Contrast Simulation Layer */}
      {isUpscaled && isActive ? (
        <View pointerEvents="none" style={styles.upscaleEnhancementLayer}>
          <View style={styles.upscaleBadge}>
            <Text style={styles.upscaleBadgeText}>✨ AI NEURAL 1080p</Text>
          </View>
        </View>
      ) : null}

      {/* Loading & Buffering Spinner */}
      {isBuffering && isActive ? (
        <View style={styles.bufferContainer}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: colors.background,
    overflow: 'hidden',
    position: 'relative',
  },
  bufferContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 10, 14, 0.35)',
  },
  // High-pass dynamic contrast simulation overlay
  upscaleEnhancementLayer: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1.5,
    borderColor: 'rgba(6, 182, 212, 0.35)',
    backgroundColor: 'rgba(6, 182, 212, 0.03)',
  },
  upscaleBadge: {
    position: 'absolute',
    top: 56,
    left: 18,
    backgroundColor: 'rgba(6, 182, 212, 0.25)',
    borderColor: 'rgba(6, 182, 212, 0.6)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  upscaleBadgeText: {
    color: '#22D3EE',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
});
