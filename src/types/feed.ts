export type VideoQuality = 'SD' | 'AI_UPSCALE_HD';

export interface Author {
  username: string;
  displayName: string;
  avatarUrl: string;
  verified?: boolean;
}

export interface VideoStreams {
  standardUrl: string;    // 720p stream
  upscaledUrl: string;    // 1080p high-bitrate / AI upscaled stream
  bitrateStandard?: string; // e.g. "2.4 Mbps"
  bitrateUpscaled?: string; // e.g. "8.5 Mbps"
}

export interface VideoItem {
  id: string;
  type: 'video';
  author: Author;
  caption: string;
  tags: string[];
  musicTrack: string;
  posterUrl: string;
  streams: VideoStreams;
  initialLikes: number;
  initialComments: number;
  initialShares: number;
  initialBookmarks: number;
  aspectRatio?: number;
}

export interface AdItem {
  id: string;
  type: 'ad';
  brandName: string;
  tagline: string;
  headline: string;
  description: string;
  mediaUrl: string;
  posterUrl: string;
  ctaText: string;
  ctaUrl: string;
  sponsoredLabel: string;
  badgeText: string;
}

export type FeedItem = VideoItem | AdItem;

export interface FeedViewabilityState {
  activeItemId: string | null;
  activeItemIndex: number;
}
