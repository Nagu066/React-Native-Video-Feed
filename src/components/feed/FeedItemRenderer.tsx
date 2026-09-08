import React from 'react';
import { FeedItem } from '../../types/feed';
import { VideoCell } from './VideoCell';
import { SponsoredAdCell } from '../ad/SponsoredAdCell';

interface FeedItemRendererProps {
  item: FeedItem;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  itemWidth?: number;
  itemHeight?: number;
}

export const FeedItemRenderer: React.FC<FeedItemRendererProps> = React.memo(
  ({ item, isActive, isMuted, onToggleMute, itemWidth, itemHeight }) => {
    if (item.type === 'ad') {
      return (
        <SponsoredAdCell
          item={item}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
        />
      );
    }

    return (
      <VideoCell
        item={item}
        isActive={isActive}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        itemWidth={itemWidth}
        itemHeight={itemHeight}
      />
    );
  }
);
