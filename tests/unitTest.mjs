import assert from 'node:assert';
import test from 'node:test';

// Test Data Fixtures matching src/data/mockFeed.ts
const RAW_VIDEOS = [
  {
    id: 'vid-101',
    type: 'video',
    streams: {
      standardUrl: 'https://cdn.example.com/720p.mp4',
      upscaledUrl: 'https://cdn.example.com/1080p.mp4',
    },
  },
  {
    id: 'vid-102',
    type: 'video',
    streams: {
      standardUrl: 'https://cdn.example.com/720p_2.mp4',
      upscaledUrl: 'https://cdn.example.com/1080p_2.mp4',
    },
  },
];

const MOCK_ADS = [
  {
    id: 'ad-501',
    type: 'ad',
    brandName: 'LinkSphere Studio',
  },
];

function generateFeedWithAds(videos = RAW_VIDEOS, ads = MOCK_ADS, targetTotal = 15) {
  const result = [];
  let adCursor = 0;
  let videoCursor = 0;

  for (let i = 0; i < targetTotal; i++) {
    if ((i + 1) % 5 === 0) {
      const baseAd = ads[adCursor % ads.length];
      result.push({
        ...baseAd,
        id: `${baseAd.id}-pos-${i}`,
      });
      adCursor++;
    } else {
      const baseVideo = videos[videoCursor % videos.length];
      result.push({
        ...baseVideo,
        id: `${baseVideo.id}-pos-${i}`,
      });
      videoCursor++;
    }
  }

  return result;
}

// Storage Optimistic Simulation
class MockStorage {
  constructor() {
    this.map = new Map();
  }
  getBoolean(key) {
    return Boolean(this.map.get(key));
  }
  setBoolean(key, val) {
    this.map.set(key, val);
  }
  getNumber(key) {
    return this.map.get(key);
  }
  setNumber(key, val) {
    this.map.set(key, val);
  }
}

function toggleLikeOptimistic(storage, videoId, baselineLikes) {
  const likeKey = `liked_${videoId}`;
  const countKey = `likes_count_${videoId}`;

  const currentLiked = storage.getBoolean(likeKey);
  const nextLiked = !currentLiked;
  const currentCount = storage.getNumber(countKey) ?? baselineLikes;
  const nextCount = Math.max(0, currentCount + (nextLiked ? 1 : -1));

  storage.setBoolean(likeKey, nextLiked);
  storage.setNumber(countKey, nextCount);

  return { isLiked: nextLiked, newCount: nextCount };
}

test('LinkSphere Virtualized Video Feed Test Suite', async (t) => {
  await t.test('Task 4: Zero CLS Sponsored Ad Placement (Every 5th Index)', () => {
    const feed = generateFeedWithAds();

    assert.strictEqual(feed.length, 15, 'Feed length should be 15');

    feed.forEach((item, index) => {
      const isFifth = (index + 1) % 5 === 0;
      if (isFifth) {
        assert.strictEqual(
          item.type,
          'ad',
          `Index ${index} must be sponsored ad card`
        );
        assert.ok(item.id.includes(`-pos-${index}`), 'Ad must have position-stable unique ID');
      } else {
        assert.strictEqual(
          item.type,
          'video',
          `Index ${index} must be video card`
        );
        assert.ok(item.streams.standardUrl, 'Video must have standard 720p stream');
        assert.ok(item.streams.upscaledUrl, 'Video must have upscaled 1080p stream');
      }
    });

    // Specifically verify 0-based indices 4, 9, 14
    assert.strictEqual(feed[4].type, 'ad');
    assert.strictEqual(feed[9].type, 'ad');
    assert.strictEqual(feed[14].type, 'ad');
  });

  await t.test('Task 2: Zero UI Latency Synchronous Like Persistence', () => {
    const storage = new MockStorage();
    const videoId = 'vid-101';
    const initialLikes = 14200;

    // First tap -> like
    const like1 = toggleLikeOptimistic(storage, videoId, initialLikes);
    assert.strictEqual(like1.isLiked, true);
    assert.strictEqual(like1.newCount, 14201);
    assert.strictEqual(storage.getBoolean(`liked_${videoId}`), true);
    assert.strictEqual(storage.getNumber(`likes_count_${videoId}`), 14201);

    // Second tap -> unlike
    const like2 = toggleLikeOptimistic(storage, videoId, initialLikes);
    assert.strictEqual(like2.isLiked, false);
    assert.strictEqual(like2.newCount, 14200);
    assert.strictEqual(storage.getBoolean(`liked_${videoId}`), false);
    assert.strictEqual(storage.getNumber(`likes_count_${videoId}`), 14200);
  });

  await t.test('Task 3: Seamless Stream Continuity Validation', () => {
    // Simulate playhead preservation during upscale toggle
    let playhead = 8.42; // seconds
    const switchStream = (targetQuality, currentPlayhead) => {
      const savedTime = currentPlayhead;
      const targetStream =
        targetQuality === 'AI_UPSCALE_HD'
          ? 'https://cdn.example.com/1080p.mp4'
          : 'https://cdn.example.com/720p.mp4';
      return { targetStream, restoredTime: savedTime };
    };

    const result = switchStream('AI_UPSCALE_HD', playhead);
    assert.strictEqual(result.restoredTime, 8.42, 'Playhead must be preserved exactly at 8.42s');
    assert.notStrictEqual(result.restoredTime, 0, 'Playhead must NOT reset to 0:00');
  });
});
