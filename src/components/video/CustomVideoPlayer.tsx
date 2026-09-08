import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { VideoQuality, VideoStreams } from '../../types/feed';
import { colors } from '../../theme/tokens';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

interface CustomVideoPlayerProps {
  streams: VideoStreams;
  quality: VideoQuality;
  isActive: boolean;
  isMuted: boolean;
  posterUrl: string;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  streams,
  quality,
  isActive,
  isMuted,
  posterUrl,
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

  // Task 3: Dynamic Resolution Switching with Preserved currentTime
  useEffect(() => {
    if (!player || !hasStartedPlaying) return;

    // Capture current time before swapping source
    const currentPosition = player.currentTime || playheadRef.current;
    playheadRef.current = currentPosition;
    isSwitchingQualityRef.current = true;

    try {
      // Replace video stream source seamlessly
      player.replace(targetUrl);
      // Immediately set target position
      player.currentTime = currentPosition;
      if (isActive) {
        player.play();
      }
    } catch {
      isSwitchingQualityRef.current = false;
    }
  }, [targetUrl, player, isActive, hasStartedPlaying]);

  return (
    <View style={styles.container}>
      {/* Background Poster fallback */}
      <Image
        source={{ uri: posterUrl }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Active Hardware Video Player surface: Only mounted when active or ready */}
      {isActive ? (
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
        />
      ) : null}

      {/* Task 3: Dynamic AI Sharpness & Contrast Simulation Layer */}
      {isUpscaled && isActive ? (
        <View pointerEvents="none" style={styles.upscaleEnhancementLayer} />
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
    borderWidth: 0.5,
    borderColor: 'rgba(6, 182, 212, 0.15)',
    backgroundColor: 'rgba(6, 182, 212, 0.02)',
  },
});
