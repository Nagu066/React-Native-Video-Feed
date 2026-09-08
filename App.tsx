import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { VideoFeed } from './src/components/feed/VideoFeed';
import { colors, typography } from './src/theme/tokens';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

export default function App() {
  const [activeTab, setActiveTab] = useState<'foryou' | 'following'>('foryou');

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="light" />

      {/* Main Virtualized Infinite Feed */}
      <VideoFeed />

      {/* Top Floating App Bar (TikTok / Reels Style Tabs) */}
      <View pointerEvents="box-none" style={styles.topHeaderContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setActiveTab('following')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'following' ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              Following
            </Text>
          </TouchableOpacity>

          <View style={styles.tabDivider} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setActiveTab('foryou')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'foryou' ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              For You
            </Text>
            {activeTab === 'foryou' ? <View style={styles.tabIndicator} /> : null}
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHeaderContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 800,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(10, 10, 14, 0.45)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  tabText: {
    fontSize: typography.fontSizes.base,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  tabTextActive: {
    color: colors.textPrimary,
  },
  tabTextInactive: {
    color: colors.textMuted,
  },
  tabDivider: {
    width: 1,
    height: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -4,
    left: 4,
    right: 4,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
