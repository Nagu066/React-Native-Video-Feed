import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Sparkles, Sliders } from 'lucide-react-native';
import { colors, glassmorphism, typography } from '../../theme/tokens';
import { VideoQuality } from '../../types/feed';

export interface UpscaleHUDHandle {
  showToast: (mode: VideoQuality) => void;
}

interface UpscaleHUDProps {
  currentQuality: VideoQuality;
  onToggle: () => void;
  bitrateLabel?: string;
}

export const UpscaleHUD = forwardRef<UpscaleHUDHandle, UpscaleHUDProps>(
  ({ currentQuality, onToggle, bitrateLabel }, ref) => {
    const isUpscaled = currentQuality === 'AI_UPSCALE_HD';

    // Toast Animation Shared Values
    const toastTranslateY = useSharedValue(-80);
    const toastOpacity = useSharedValue(0);
    const toastScale = useSharedValue(0.9);
    const [toastMessage, setToastMessage] = React.useState('Upscaled 1080p • AI Enhanced');

    // Pulse animation for upscale button
    const glowOpacity = useSharedValue(0.6);

    useEffect(() => {
      if (isUpscaled) {
        glowOpacity.value = withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.6, { duration: 400 })
        );
      }
    }, [isUpscaled, glowOpacity]);

    useImperativeHandle(ref, () => ({
      showToast: (mode: VideoQuality) => {
        const msg =
          mode === 'AI_UPSCALE_HD'
            ? '✨ Upscaled 1080p • AI Enhanced'
            : 'Standard 720p • Balanced Quality';
        setToastMessage(msg);

        // Slide and pop down
        toastTranslateY.value = withSpring(0, { damping: 14, stiffness: 200 });
        toastScale.value = withSpring(1, { damping: 14, stiffness: 200 });
        toastOpacity.value = withTiming(1, { duration: 200 });

        // Auto fade out after 2000ms (2 seconds)
        toastOpacity.value = withDelay(
          2000,
          withTiming(0, { duration: 350 }, (finished) => {
            if (finished) {
              toastTranslateY.value = -80;
            }
          })
        );
      },
    }));

    const toastAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: toastTranslateY.value },
        { scale: toastScale.value },
      ],
      opacity: toastOpacity.value,
    }));

    return (
      <>
        {/* Floating Animated HUD Toast */}
        <Animated.View
          pointerEvents="none"
          style={[styles.toastContainer, toastAnimatedStyle]}
        >
          <View style={[styles.toastCard, isUpscaled ? styles.toastCardActive : styles.toastCardStandard]}>
            <Sparkles
              size={18}
              color={isUpscaled ? colors.secondaryLight : colors.textSecondary}
            />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        </Animated.View>

        {/* Floating Glassmorphic AI Upscale Toggle Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
          onPress={onToggle}
          style={[
            styles.toggleButton,
            isUpscaled ? styles.toggleButtonActive : styles.toggleButtonInactive,
          ]}
        >
          <View style={styles.toggleContent}>
            <Sparkles
              size={16}
              color={isUpscaled ? '#22D3EE' : colors.textSecondary}
            />
            <Text
              style={[
                styles.toggleText,
                isUpscaled ? styles.toggleTextActive : styles.toggleTextInactive,
              ]}
            >
              {isUpscaled ? 'AI Upscaled' : 'AI Upscale / HD'}
            </Text>
            {isUpscaled ? (
              <View style={styles.liveBadge}>
                <Text style={styles.liveBadgeText}>1080p</Text>
              </View>
            ) : (
              <Sliders size={12} color={colors.textMuted} />
            )}
          </View>
          {bitrateLabel && isUpscaled ? (
            <Text style={styles.bitrateText}>{bitrateLabel}</Text>
          ) : null}
        </TouchableOpacity>
      </>
    );
  }
);

const styles = StyleSheet.create({
  // Toast Styles
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10000,
    elevation: 30,
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
  toastCardActive: {
    backgroundColor: 'rgba(15, 23, 42, 0.94)',
    borderColor: '#06B6D4',
    shadowColor: '#06B6D4',
  },
  toastCardStandard: {
    backgroundColor: 'rgba(20, 20, 27, 0.92)',
    borderColor: colors.glassBorder,
    shadowColor: '#000000',
  },
  toastText: {
    color: colors.textPrimary,
    fontSize: typography.fontSizes.sm,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // Toggle Button Styles
  toggleButton: {
    position: 'absolute',
    top: 55,
    right: 18,
    zIndex: 9999,
    elevation: 25,
    borderRadius: 24,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: 'rgba(6, 182, 212, 0.22)',
    borderColor: '#22D3EE',
    shadowColor: '#06B6D4',
    shadowOpacity: 0.6,
  },
  toggleButtonInactive: {
    backgroundColor: 'rgba(20, 20, 27, 0.75)',
    borderColor: colors.glassBorder,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  toggleText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  toggleTextActive: {
    color: '#22D3EE',
  },
  toggleTextInactive: {
    color: colors.textSecondary,
  },
  liveBadge: {
    backgroundColor: '#0891B2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveBadgeText: {
    color: colors.textPrimary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bitrateText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
});
