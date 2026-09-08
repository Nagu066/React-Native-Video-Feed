import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { VideoFeed } from './src/components/feed/VideoFeed';
import { colors } from './src/theme/tokens';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="light" />
      <VideoFeed />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
