import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Music,
  CheckCircle2,
} from 'lucide-react-native';
import { colors, typography } from '../../theme/tokens';
import { VideoItem } from '../../types/feed';

interface VideoOverlayProps {
  item: VideoItem;
  isLiked: boolean;
  likesCount: number;
  onLikePress: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const VideoOverlay: React.FC<VideoOverlayProps> = ({
  item,
  isLiked,
  likesCount,
  onLikePress,
  isMuted,
  onToggleMute,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

  const formatCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this incredible video by @${item.author.username}: "${item.caption}"`,
      });
    } catch {
      // ignore
    }
  };

  return (
    <View pointerEvents="box-none" style={styles.overlayContainer}>
      {/* Bottom Left: Creator Information & Captions */}
      <View pointerEvents="box-none" style={styles.bottomInfoSection}>
        {/* Creator Info */}
        <View style={styles.authorRow}>
          <Image source={{ uri: item.author.avatarUrl }} style={styles.avatar} />
          <View style={styles.authorMeta}>
            <View style={styles.usernameRow}>
              <Text style={styles.displayName}>{item.author.displayName}</Text>
              {item.author.verified ? (
                <CheckCircle2 size={14} color={colors.secondary} />
              ) : null}
            </View>
            <Text style={styles.handle}>@{item.author.username}</Text>
          </View>
        </View>

        {/* Caption */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsCaptionExpanded(!isCaptionExpanded)}
        >
          <Text
            numberOfLines={isCaptionExpanded ? undefined : 2}
            style={styles.caption}
          >
            {item.caption}
          </Text>
        </TouchableOpacity>

        {/* Hashtags */}
        <View style={styles.tagRow}>
          {item.tags.map((tag, idx) => (
            <Text key={idx} style={styles.tagText}>
              {tag}{' '}
            </Text>
          ))}
        </View>

        {/* Music Track Ticker */}
        <View style={styles.musicRow}>
          <Music size={13} color={colors.textSecondary} />
          <Text numberOfLines={1} style={styles.musicText}>
            {item.musicTrack}
          </Text>
        </View>
      </View>

      {/* Right Rail: Interactive Action Buttons */}
      <View style={styles.actionRail}>
        {/* Like Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onLikePress}
          style={styles.actionItem}
        >
          <View
            style={[
              styles.iconCircle,
              isLiked ? styles.iconCircleLiked : styles.iconCircleDefault,
            ]}
          >
            <Heart
              size={24}
              color={isLiked ? colors.heartActive : colors.textPrimary}
              fill={isLiked ? colors.heartActive : 'transparent'}
            />
          </View>
          <Text style={[styles.actionLabel, isLiked ? styles.actionLabelLiked : null]}>
            {formatCount(likesCount)}
          </Text>
        </TouchableOpacity>

        {/* Comments Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.actionItem}
        >
          <View style={[styles.iconCircle, styles.iconCircleDefault]}>
            <MessageCircle size={24} color={colors.textPrimary} />
          </View>
          <Text style={styles.actionLabel}>{formatCount(item.initialComments)}</Text>
        </TouchableOpacity>

        {/* Bookmark Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsBookmarked(!isBookmarked)}
          style={styles.actionItem}
        >
          <View
            style={[
              styles.iconCircle,
              isBookmarked ? styles.iconCircleBookmarked : styles.iconCircleDefault,
            ]}
          >
            <Bookmark
              size={24}
              color={isBookmarked ? colors.bookmarkActive : colors.textPrimary}
              fill={isBookmarked ? colors.bookmarkActive : 'transparent'}
            />
          </View>
          <Text style={styles.actionLabel}>
            {formatCount(item.initialBookmarks + (isBookmarked ? 1 : 0))}
          </Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleShare}
          style={styles.actionItem}
        >
          <View style={[styles.iconCircle, styles.iconCircleDefault]}>
            <Share2 size={24} color={colors.textPrimary} />
          </View>
          <Text style={styles.actionLabel}>{formatCount(item.initialShares)}</Text>
        </TouchableOpacity>

        {/* Volume Mute Toggle */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onToggleMute}
          style={styles.actionItem}
        >
          <View style={[styles.iconCircle, styles.iconCircleMute]}>
            {isMuted ? (
              <VolumeX size={22} color={colors.textSecondary} />
            ) : (
              <Volume2 size={22} color={colors.secondaryLight} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
  bottomInfoSection: {
    width: '74%',
    gap: 8,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  authorMeta: {
    justifyContent: 'center',
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  displayName: {
    color: colors.textPrimary,
    fontSize: typography.fontSizes.base,
    fontWeight: '700',
  },
  handle: {
    color: colors.textSecondary,
    fontSize: typography.fontSizes.xs,
    fontWeight: '500',
  },
  caption: {
    color: colors.textPrimary,
    fontSize: typography.fontSizes.sm,
    lineHeight: typography.lineHeights.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagText: {
    color: colors.secondaryLight,
    fontSize: typography.fontSizes.xs,
    fontWeight: '600',
  },
  musicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  musicText: {
    color: colors.textSecondary,
    fontSize: typography.fontSizes.xs,
    fontWeight: '500',
    maxWidth: 200,
  },

  // Right Rail Action Items
  actionRail: {
    position: 'absolute',
    right: 14,
    bottom: 36,
    gap: 16,
    alignItems: 'center',
  },
  actionItem: {
    alignItems: 'center',
    gap: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  iconCircleDefault: {
    backgroundColor: 'rgba(20, 20, 27, 0.65)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000000',
  },
  iconCircleLiked: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: colors.heartActive,
    shadowColor: colors.heartActive,
  },
  iconCircleBookmarked: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: colors.bookmarkActive,
    shadowColor: colors.bookmarkActive,
  },
  iconCircleMute: {
    backgroundColor: 'rgba(20, 20, 27, 0.65)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  actionLabel: {
    color: colors.textPrimary,
    fontSize: typography.fontSizes.xs,
    fontWeight: '600',
  },
  actionLabelLiked: {
    color: colors.heartActive,
  },
});
