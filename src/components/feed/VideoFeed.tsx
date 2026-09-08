import React, { useState, useRef, useCallback, useMemo } from 'react';
import { StyleSheet, View, Dimensions, ViewToken } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { FeedItem } from '../../types/feed';
import { generateFeedWithAds } from '../../data/mockFeed';
import { FeedItemRenderer } from './FeedItemRenderer';
import { colors } from '../../theme/tokens';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export const VideoFeed: React.FC = () => {
  const feedData = useMemo<FeedItem[]>(() => generateFeedWithAds(), []);
  
  // Track currently active item index / id for aggressive memory recycling
  const [activeItemId, setActiveItemId] = useState<string>(feedData[0]?.id ?? '');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Viewability config: requires 80% visibility to trigger focused autoplay
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 100,
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
    ({ item }: { item: FeedItem }) => {
      const isActive = item.id === activeItemId;
      return (
        <FeedItemRenderer
          item={item}
          isActive={isActive}
          isMuted={isMuted}
          onToggleMute={toggleMute}
        />
      );
    },
    [activeItemId, isMuted, toggleMute]
  );

  const keyExtractor = useCallback((item: FeedItem) => item.id, []);

  const getItemType = useCallback((item: FeedItem) => item.type, []);

  return (
    <View style={styles.container}>
      <FlashList
        data={feedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        {...({ estimatedItemSize: WINDOW_HEIGHT } as any)}
        pagingEnabled={true}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // Performance optimizations for 60+ FPS
        drawDistance={WINDOW_HEIGHT * 0.5}
        removeClippedSubviews={true}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: colors.background,
  },
});
