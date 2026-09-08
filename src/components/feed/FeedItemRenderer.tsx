import React from 'react';
import { FeedItem } from '../../types/feed';
import { VideoCell } from './VideoCell';
import { SponsoredAdCell } from '../ad/SponsoredAdCell';

interface FeedItemRendererProps {
  item: FeedItem;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const FeedItemRenderer: React.FC<FeedItemRendererProps> = React.memo(
  ({ item, isActive, isMuted, onToggleMute }) => {
    if (item.type === 'ad') {
      return <SponsoredAdCell item={item} />;
    }

    return (
      <VideoCell
        item={item}
        isActive={isActive}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
      />
    );
  }
);
