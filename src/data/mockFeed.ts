import { VideoItem, AdItem, FeedItem } from '../types/feed';

export const RAW_VIDEOS: VideoItem[] = [
  {
    id: 'vid-101',
    type: 'video',
    author: {
      username: 'tech_visionary',
      displayName: 'Alex Rivers',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Experiencing the next-gen spatial rendering pipeline in real-time. The frame latency is mind-blowing! 🚀✨',
    tags: ['#SpatialComputing', '#FutureTech', '#NeuralRendering'],
    musicTrack: 'Cyberpunk Odyssey • Synthwave Originals',
    posterUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      upscaledUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      bitrateStandard: '720p • 2.2 Mbps',
      bitrateUpscaled: '1080p • 6.8 Mbps (AI Enhanced)',
    },
    initialLikes: 14200,
    initialComments: 842,
    initialShares: 1250,
    initialBookmarks: 3120,
  },
  {
    id: 'vid-102',
    type: 'video',
    author: {
      username: 'neon_artisan',
      displayName: 'Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Deep blue oceanic fluid dynamics simulation under polarized optics. Notice the ray tracing detail! 🔮🌊',
    tags: ['#FluidDynamics', '#Cinematic', '#RayTracing'],
    musicTrack: 'Neon Drift • Midnight Lo-Fi Beats',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      upscaledUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      bitrateStandard: '720p • 2.5 Mbps',
      bitrateUpscaled: '1080p • 8.1 Mbps (Neural Upscaled)',
    },
    initialLikes: 28900,
    initialComments: 1420,
    initialShares: 3410,
    initialBookmarks: 6100,
  },
  {
    id: 'vid-103',
    type: 'video',
    author: {
      username: 'quantum_drone',
      displayName: 'Marcus Sterling',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: false,
    },
    caption: 'FPV dive down the vertical cliffs of Norway. Dynamic stabilization active at 60 FPS. 🏔️🦅',
    tags: ['#FPVDrones', '#NorwayAdventures', '#ExtremeCinema'],
    musicTrack: 'Apex Horizon • Orchestral Bass',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
      upscaledUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
      bitrateStandard: '720p • 2.0 Mbps',
      bitrateUpscaled: '1080p • 7.4 Mbps (SuperRes v3)',
    },
    initialLikes: 45300,
    initialComments: 2190,
    initialShares: 8700,
    initialBookmarks: 9400,
  },
  {
    id: 'vid-104',
    type: 'video',
    author: {
      username: 'cosmic_pulse',
      displayName: 'Nova Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Generative volumetric particles responding in real-time to audio frequencies. 🌌🪐',
    tags: ['#GenerativeArt', '#Cosmic', '#CreativeCoding'],
    musicTrack: 'Starlight Pulse • Deep Ambient Wave',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: 'https://media.w3.org/2010/05/video/movie_300.mp4',
      upscaledUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
      bitrateStandard: '720p • 2.4 Mbps',
      bitrateUpscaled: '1080p • 7.9 Mbps (AI HDR10)',
    },
    initialLikes: 19800,
    initialComments: 980,
    initialShares: 2100,
    initialBookmarks: 4300,
  },
  {
    id: 'vid-105',
    type: 'video',
    author: {
      username: 'urban_architect',
      displayName: 'David Vance',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: false,
    },
    caption: 'Kinetic architecture in downtown Tokyo. Sunlight reflection patterns shifting across the glass facade 🌇📐',
    tags: ['#Architecture', '#Minimalism', '#TokyoDesign'],
    musicTrack: 'Glass Shadows • Acoustic Fusion',
    posterUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      upscaledUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      bitrateStandard: '720p • 2.1 Mbps',
      bitrateUpscaled: '1080p • 6.5 Mbps (AI Clarity)',
    },
    initialLikes: 8700,
    initialComments: 412,
    initialShares: 930,
    initialBookmarks: 2140,
  },
  {
    id: 'vid-106',
    type: 'video',
    author: {
      username: 'hyper_velocity',
      displayName: 'Kira Thorne',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Supercar telemetry visualizer overlay on Nürburgring hot lap. Precision cornering at 280 km/h! 🏎️💨',
    tags: ['#Motorsport', '#Telemetry', '#TrackDay'],
    musicTrack: 'Overdrive Ignition • Electronic Drive',
    posterUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      upscaledUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
      bitrateStandard: '720p • 2.6 Mbps',
      bitrateUpscaled: '1080p • 8.6 Mbps (UltraHD Pro)',
    },
    initialLikes: 53100,
    initialComments: 3820,
    initialShares: 11200,
    initialBookmarks: 14500,
  },
  {
    id: 'vid-107',
    type: 'video',
    author: {
      username: 'zenith_wildlife',
      displayName: 'Dr. Sarah Jenkins',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Rare Arctic wolf pack hunting under the Aurora Borealis. Captured with custom telephoto sensor. 🐺❄️',
    tags: ['#WildlifePhotography', '#Aurora', '#ArcticExpedition'],
    musicTrack: 'Northern Solitude • Nordic Folk Flute',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
      upscaledUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
      bitrateStandard: '720p • 2.3 Mbps',
      bitrateUpscaled: '1080p • 7.7 Mbps (AI Upscaled)',
    },
    initialLikes: 68400,
    initialComments: 4510,
    initialShares: 14300,
    initialBookmarks: 18900,
  },
];

export const MOCK_ADS: AdItem[] = [
  {
    id: 'ad-501',
    type: 'ad',
    brandName: 'LinkSphere Cloud Studio',
    tagline: 'Stream, Scale & Upscale in Real-time',
    headline: 'Zero-Latency Edge Video Infrastructure',
    description: 'Transform your media pipeline with ultra-low latency transcoding, automated AI upscaling, and global CDN delivery.',
    mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Start Free Trial',
    ctaUrl: 'https://linksphere.ai',
    sponsoredLabel: 'SPONSORED PARTNER',
    badgeText: 'AD • 60 FPS INFRASTRUCTURE',
  },
  {
    id: 'ad-502',
    type: 'ad',
    brandName: 'AeroSound Pro X',
    tagline: 'Spatial Audio Reimagined',
    headline: 'Cinema-Grade Acoustic Transparency',
    description: 'Beryllium drivers with AI noise calibration that adapts dynamically to your ear canal in 10 microseconds.',
    mediaUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Explore AeroSound',
    ctaUrl: 'https://aerosound.example.com',
    sponsoredLabel: 'FEATURED BRAND',
    badgeText: 'AD • SPATIAL AUDIO',
  },
];

/**
 * Task 4: Injects a mock sponsored card at every 5th feed index (0-based: index 4, 9, 14...)
 * Guaranteed zero layout shifts with predictable deterministic placement.
 */
export const generateFeedWithAds = (videos: VideoItem[] = RAW_VIDEOS): FeedItem[] => {
  const result: FeedItem[] = [];
  let adCursor = 0;
  let videoCursor = 0;

  const targetTotal = 15;

  for (let i = 0; i < targetTotal; i++) {
    // Every 5th item (index 4, 9, 14, ...) is a sponsored ad card
    if ((i + 1) % 5 === 0) {
      const baseAd = MOCK_ADS[adCursor % MOCK_ADS.length]!;
      result.push({
        ...baseAd,
        id: `${baseAd.id}-pos-${i}`,
      });
      adCursor++;
    } else {
      const baseVideo = videos[videoCursor % videos.length]!;
      result.push({
        ...baseVideo,
        id: `${baseVideo.id}-pos-${i}`,
      });
      videoCursor++;
    }
  }

  return result;
};
