import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { ExternalLink, Sparkles, Megaphone } from 'lucide-react-native';
import { colors, typography } from '../../theme/tokens';
import { AdItem } from '../../types/feed';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

interface SponsoredAdCellProps {
  item: AdItem;
}

export const SponsoredAdCell: React.FC<SponsoredAdCellProps> = ({ item }) => {
  const handleOpenCta = async () => {
    try {
      const supported = await Linking.canOpenURL(item.ctaUrl);
      if (supported) {
        await Linking.openURL(item.ctaUrl);
      }
    } catch {
      // ignore
    }
  };

  return (
    <View style={styles.container}>
      {/* Zero CLS Guarantee: Full viewport background image */}
      <Image
        source={{ uri: item.mediaUrl }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      {/* Dark gradient scrim overlay */}
      <View style={styles.scrimOverlay} />

      {/* Top Sponsored Tag Badge */}
      <View style={styles.topBadgeContainer}>
        <View style={styles.sponsoredPill}>
          <Megaphone size={13} color={colors.secondaryLight} />
          <Text style={styles.sponsoredPillText}>{item.sponsoredLabel}</Text>
        </View>
        <View style={styles.verifiedPartnerBadge}>
          <Sparkles size={12} color={colors.primaryLight} />
          <Text style={styles.verifiedPartnerText}>{item.badgeText}</Text>
        </View>
      </View>

      {/* Bottom Glassmorphic Card Container */}
      <View style={styles.bottomCardContainer}>
        <View style={styles.glassmorphicCard}>
          <Text style={styles.brandTitle}>{item.brandName}</Text>
          <Text style={styles.headline}>{item.headline}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {/* Call To Action Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleOpenCta}
            style={styles.ctaButton}
          >
            <Text style={styles.ctaButtonText}>{item.ctaText}</Text>
            <ExternalLink size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    backgroundColor: colors.backgroundSecondary,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
  },
  scrimOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 10, 14, 0.65)',
  },
  topBadgeContainer: {
    paddingTop: 55,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sponsoredPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: colors.secondary,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  sponsoredPillText: {
    color: colors.secondaryLight,
    fontSize: typography.fontSizes.xs,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  verifiedPartnerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  verifiedPartnerText: {
    color: colors.primaryLight,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  bottomCardContainer: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },
  glassmorphicCard: {
    backgroundColor: 'rgba(20, 20, 27, 0.82)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    gap: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
  },
  brandTitle: {
    color: colors.secondaryLight,
    fontSize: typography.fontSizes.sm,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headline: {
    color: colors.textPrimary,
    fontSize: typography.fontSizes.xl,
    fontWeight: '800',
    lineHeight: typography.lineHeights.xl,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.fontSizes.sm,
    lineHeight: typography.lineHeights.sm,
  },
  ctaButton: {
    marginTop: 6,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: typography.fontSizes.base,
    fontWeight: '700',
  },
});
