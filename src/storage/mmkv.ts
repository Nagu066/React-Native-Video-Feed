import { createMMKV, MMKV } from 'react-native-mmkv';

// Safe instantiation to guarantee zero crash in any test/mock environment
let storageInstance: MMKV | null = null;
const fallbackStorage = new Map<string, string | number | boolean>();

try {
  storageInstance = createMMKV({
    id: 'linksphere-feed-storage',
  });
} catch (e) {
  console.warn('MMKV native JSI not available, using in-memory fallback adapter');
}

export const feedStorage = {
  getBoolean: (key: string): boolean => {
    try {
      if (storageInstance) {
        return storageInstance.getBoolean(key) ?? false;
      }
      return Boolean(fallbackStorage.get(key));
    } catch {
      return Boolean(fallbackStorage.get(key));
    }
  },

  setBoolean: (key: string, value: boolean): void => {
    try {
      if (storageInstance) {
        storageInstance.set(key, value);
      }
    } catch {
      // fallback
    }
    fallbackStorage.set(key, value);
  },

  getNumber: (key: string): number | undefined => {
    try {
      if (storageInstance) {
        return storageInstance.getNumber(key);
      }
      const val = fallbackStorage.get(key);
      return typeof val === 'number' ? val : undefined;
    } catch {
      const val = fallbackStorage.get(key);
      return typeof val === 'number' ? val : undefined;
    }
  },

  setNumber: (key: string, value: number): void => {
    try {
      if (storageInstance) {
        storageInstance.set(key, value);
      }
    } catch {
      // fallback
    }
    fallbackStorage.set(key, value);
  },

  getString: (key: string): string | undefined => {
    try {
      if (storageInstance) {
        return storageInstance.getString(key);
      }
      const val = fallbackStorage.get(key);
      return typeof val === 'string' ? val : undefined;
    } catch {
      const val = fallbackStorage.get(key);
      return typeof val === 'string' ? val : undefined;
    }
  },

  setString: (key: string, value: string): void => {
    try {
      if (storageInstance) {
        storageInstance.set(key, value);
      }
    } catch {
      // fallback
    }
    fallbackStorage.set(key, value);
  },
};

/**
 * Optimistic like toggle helper with synchronous zero UI latency
 */
export const toggleLikeOptimistic = (
  videoId: string,
  baselineLikes: number
): { isLiked: boolean; newCount: number } => {
  const likeKey = `liked_${videoId}`;
  const countKey = `likes_count_${videoId}`;

  const currentLiked = feedStorage.getBoolean(likeKey);
  const nextLiked = !currentLiked;
  const currentCount = feedStorage.getNumber(countKey) ?? baselineLikes;
  const nextCount = Math.max(0, currentCount + (nextLiked ? 1 : -1));

  // Synchronous write to MMKV
  feedStorage.setBoolean(likeKey, nextLiked);
  feedStorage.setNumber(countKey, nextCount);

  return { isLiked: nextLiked, newCount: nextCount };
};

export const getStoredLikeState = (
  videoId: string,
  baselineLikes: number
): { isLiked: boolean; likesCount: number } => {
  const isLiked = feedStorage.getBoolean(`liked_${videoId}`);
  const likesCount = feedStorage.getNumber(`likes_count_${videoId}`) ?? baselineLikes;
  return { isLiked, likesCount };
};

export const getStoredUpscalePreference = (): boolean => {
  return feedStorage.getBoolean('user_pref_upscale_enabled');
};

export const setStoredUpscalePreference = (enabled: boolean): void => {
  feedStorage.setBoolean('user_pref_upscale_enabled', enabled);
};
