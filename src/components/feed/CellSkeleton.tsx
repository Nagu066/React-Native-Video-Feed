import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../theme/tokens';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

interface CellSkeletonProps {
  type?: 'video' | 'ad';
  itemWidth?: number;
  itemHeight?: number;
}

export const CellSkeleton: React.FC<CellSkeletonProps> = ({
  type = 'video',
  itemWidth,
  itemHeight,
}) => {
  const opacity = useSharedValue(0.25);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.65, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, itemWidth && itemHeight ? { width: itemWidth, height: itemHeight } : null]}>
      {/* Background base layer to prevent any CLS layout jump */}
      <View style={styles.backdrop} />

      {/* Shimmer pulse effect */}
      <Animated.View style={[styles.shimmerLayer, animatedStyle]} />

      {/* Structured placeholder elements */}
      <View style={styles.overlayPlaceholder}>
        {type === 'ad' ? (
          <View style={styles.adBadgePlaceholder} />
        ) : null}

        <View style={styles.bottomSection}>
          <View style={styles.userRow}>
            <View style={styles.avatarPlaceholder} />
            <View style={styles.usernamePlaceholder} />
          </View>
          <View style={styles.captionPlaceholderLong} />
          <View style={styles.captionPlaceholderShort} />
        </View>

        {/* Right sidebar action buttons placeholder */}
        <View style={styles.actionRailPlaceholder}>
          <View style={styles.actionCirclePlaceholder} />
          <View style={styles.actionCirclePlaceholder} />
          <View style={styles.actionCirclePlaceholder} />
          <View style={styles.actionCirclePlaceholder} />
        </View>
      </View>
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
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.backgroundSecondary,
  },
  shimmerLayer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surface,
  },
  overlayPlaceholder: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 40,
  },
  adBadgePlaceholder: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 140,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  bottomSection: {
    width: '75%',
    gap: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  usernamePlaceholder: {
    width: 120,
    height: 16,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  captionPlaceholderLong: {
    width: '95%',
    height: 14,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  captionPlaceholderShort: {
    width: '60%',
    height: 14,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  actionRailPlaceholder: {
    position: 'absolute',
    right: 16,
    bottom: 50,
    gap: 18,
    alignItems: 'center',
  },
  actionCirclePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});
