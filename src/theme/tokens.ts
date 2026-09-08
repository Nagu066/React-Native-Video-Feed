/**
 * Video Feed Design System Tokens
 * 60 FPS Dark Theme with Glassmorphism & High-Contrast Accents
 */

export const colors = {
  // Backgrounds
  background: '#0A0A0E',
  backgroundSecondary: '#14141B',
  surface: '#1A1A24',
  
  // Accents
  primary: '#8B5CF6',     // Vibrant Purple
  primaryLight: '#A78BFA',
  primaryDark: '#6D28D9',
  
  secondary: '#06B6D4',   // Electric Cyan
  secondaryLight: '#22D3EE',
  secondaryDark: '#0891B2',

  // Interactive / State
  heartActive: '#EF4444',
  bookmarkActive: '#F59E0B',
  success: '#10B981',

  // Neutrals
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  // Glassmorphic tokens
  glassBackground: 'rgba(255, 255, 255, 0.06)',
  glassBackgroundSubtle: 'rgba(255, 255, 255, 0.03)',
  glassBackgroundProminent: 'rgba(255, 255, 255, 0.12)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassBorderActive: 'rgba(139, 92, 246, 0.4)',
  
  // Overlays & Scrims
  overlayDark: 'rgba(10, 10, 14, 0.75)',
  gradientScrim: ['transparent', 'rgba(10, 10, 14, 0.3)', 'rgba(10, 10, 14, 0.85)'] as const,
};

export const typography = {
  fontSizes: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
  },
  lineHeights: {
    xs: 14,
    sm: 18,
    base: 22,
    lg: 24,
    xl: 28,
  },
};

export const glassmorphism = {
  card: {
    backgroundColor: colors.glassBackground,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: 16,
  },
  cardProminent: {
    backgroundColor: colors.glassBackgroundProminent,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: 20,
  },
  pill: {
    backgroundColor: colors.glassBackground,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: 999,
  },
};
