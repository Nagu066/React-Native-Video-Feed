import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';
import { colors } from '../../theme/tokens';

export interface FloatingHeartHandle {
  spawn: (x: number, y: number) => void;
}

interface FloatingHeartProps {
  onAnimationEnd?: () => void;
}

export const FloatingHeart = forwardRef<FloatingHeartHandle, FloatingHeartProps>(
  ({ onAnimationEnd }, ref) => {
    const posX = useSharedValue(0);
    const posY = useSharedValue(0);
    const scale = useSharedValue(0);
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const rotation = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      spawn: (x: number, y: number) => {
        'worklet';
        posX.value = x - 40; // center 80px heart
        posY.value = y - 40;
        translateY.value = 0;
        rotation.value = Math.random() * 30 - 15; // subtle tilt between -15° and +15°

        // Spring pop up
        scale.value = withSequence(
          withSpring(1.35, { damping: 10, stiffness: 220 }),
          withSpring(1.0, { damping: 14, stiffness: 180 })
        );

        // Vertical floating upward translation
        translateY.value = withTiming(-110, { duration: 850 });

        // Fade out
        opacity.value = withSequence(
          withTiming(1, { duration: 100 }),
          withDelay(
            450,
            withTiming(0, { duration: 300 }, (finished) => {
              if (finished && onAnimationEnd) {
                runOnJS(onAnimationEnd)();
              }
            })
          )
        );
      },
    }));

    const animatedStyle = useAnimatedStyle(() => ({
      left: posX.value,
      top: posY.value,
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
        { rotateZ: `${rotation.value}deg` },
      ],
    }));

    return (
      <Animated.View pointerEvents="none" style={[styles.heartContainer, animatedStyle]}>
        {/* Glow backdrop layer */}
        <Heart
          size={84}
          color="rgba(239, 68, 68, 0.45)"
          fill="rgba(239, 68, 68, 0.45)"
          style={StyleSheet.absoluteFill}
        />
        {/* Primary vibrant heart */}
        <Heart
          size={76}
          color="#FFFFFF"
          fill={colors.heartActive}
          strokeWidth={2}
        />
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  heartContainer: {
    position: 'absolute',
    width: 84,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    shadowColor: colors.heartActive,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 20,
  },
});
