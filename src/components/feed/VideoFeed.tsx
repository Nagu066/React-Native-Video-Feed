import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ViewToken,
  useWindowDimensions,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { FeedItem } from '../../types/feed';
import { generateFeedWithAds } from '../../data/mockFeed';
import { FeedItemRenderer } from './FeedItemRenderer';
import { colors } from '../../theme/tokens';

export const VideoFeed: React.FC = () => {
  const feedData = useMemo<FeedItem[]>(() => generateFeedWithAds(), []);
  
  // Use reactive window dimensions as fallback
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  
  // Dynamically measured viewport dimensions to prevent Android letterboxing & offset drift
  const [feedDimensions, setFeedDimensions] = useState<{ width: number; height: number }>({
    width: winWidth > 0 ? winWidth : Dimensions.get('window').width,
    height: winHeight > 0 ? winHeight : Dimensions.get('window').height,
  });

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height } = event.nativeEvent.layout;
      if (
        height > 0 &&
        (Math.abs(height - feedDimensions.height) > 1 ||
          Math.abs(width - feedDimensions.width) > 1)
      ) {
        setFeedDimensions({ width, height });
      }
    },
    [feedDimensions]
  );

  // Track currently active item index / id for aggressive memory recycling
  const [activeItemId, setActiveItemId] = useState<string>(feedData[0]?.id ?? '');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const activeItemIndex = useMemo(
    () => feedData.findIndex((i) => i.id === activeItemId),
    [feedData, activeItemId]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Viewability config: 60% visibility threshold without delay for instant response
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  }).current;

  // Task 1: Autoplay only focused video cell in the viewport, pause & release others immediately
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0]?.item) {
        const focusedItem = viewableItems[0].item as FeedItem;
        setActiveItemId(focusedItem.id);
      }
    }
  ).current;

  const renderItem = useCallback(
    ({ item, index }: { item: FeedItem; index: number }) => {
      const isActive = item.id === activeItemId;
      // Preload adjacent video cells (index - 1, index + 1) for instantaneous 0ms playback
      const shouldPreload = Math.abs(index - activeItemIndex) <= 1;
      return (
        <FeedItemRenderer
          item={item}
          isActive={isActive}
          shouldPreload={shouldPreload}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          itemWidth={feedDimensions.width}
          itemHeight={feedDimensions.height}
        />
      );
    },
    [activeItemId, activeItemIndex, isMuted, toggleMute, feedDimensions]
  );

  const keyExtractor = useCallback((item: FeedItem) => item.id, []);

  const getItemType = useCallback((item: FeedItem) => item.type, []);

  return (
    <View style={styles.container} onLayout={onLayout}>
      <FlashList
        data={feedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        {...({ estimatedItemSize: feedDimensions.height } as any)}
        // Android-specific: Use snapToInterval matching exact container height to guarantee zero overlap/drift
        pagingEnabled={Platform.OS === 'ios'}
        snapToInterval={feedDimensions.height}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // Performance optimizations for 60+ FPS
        drawDistance={feedDimensions.height * 0.5}
        removeClippedSubviews={true}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
