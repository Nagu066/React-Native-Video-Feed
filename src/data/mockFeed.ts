import { VideoItem, AdItem, FeedItem } from '../types/feed';

// Bundled local assets for instant, 0-latency playback without network buffering
const supercarSD = require('../../assets/videos/supercar_sd.mp4');
const supercarHD = require('../../assets/videos/supercar_hd.mp4');

const citySD = require('../../assets/videos/city_sd.mp4');
const cityHD = require('../../assets/videos/city_hd.mp4');

const jellyfishSD = require('../../assets/videos/jellyfish_sd.mp4');
const jellyfishHD = require('../../assets/videos/jellyfish_hd.mp4');

const spaceSD = require('../../assets/videos/space_sd.mp4');
const spaceHD = require('../../assets/videos/space_hd.mp4');

const waterfallVideo = require('../../assets/videos/waterfall.mp4');
const waterfallHD = require('../../assets/videos/waterfall_hd.mp4');

const mountainVideo = require('../../assets/videos/mountain.mp4');
const mountainHD = require('../../assets/videos/mountain_hd.mp4');

const auroraVideo = require('../../assets/videos/aurora.mp4');

const desertVideo = require('../../assets/videos/desert.mp4');
const desertHD = require('../../assets/videos/desert_hd.mp4');

const oceansVideo = require('../../assets/videos/oceans.mp4');
const forestVideo = require('../../assets/videos/forest.mp4');

const wavesVideo = require('../../assets/videos/waves.mp4');
const wavesHD = require('../../assets/videos/waves_hd.mp4');

const aerialVideo = require('../../assets/videos/aerial.mp4');

export const RAW_VIDEOS: VideoItem[] = [
  {
    id: 'vid-101',
    type: 'video',
    author: {
      username: 'apex_motorsport',
      displayName: 'Kira Thorne',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Unleashing 1,200 HP on the midnight neon circuit. Zero to 100 in 1.8s! 🏎️⚡️',
    tags: ['#Hypercar', '#Supercar', '#ElectricSpeed', '#TrackDay'],
    musicTrack: 'Overdrive Ignition • Cyberpunk Bass',
    posterUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: supercarSD,
      upscaledUrl: supercarHD,
      bitrateStandard: '720p • 2.4 Mbps',
      bitrateUpscaled: '1080p • 8.4 Mbps (AI Enhanced)',
    },
    initialLikes: 48200,
    initialComments: 1840,
    initialShares: 6250,
    initialBookmarks: 8120,
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
    caption: 'Midnight reflections across the Shanghai Bund skyline. Pure cinematic neon atmosphere 🔮🌃',
    tags: ['#Cyberpunk', '#ShanghaiNights', '#Cinematic4K', '#NeonVibes'],
    musicTrack: 'Neon Drift • Midnight Lo-Fi Beats',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: citySD,
      upscaledUrl: cityHD,
      bitrateStandard: '720p • 2.2 Mbps',
      bitrateUpscaled: '1080p • 7.8 Mbps (Neural HDR)',
    },
    initialLikes: 35900,
    initialComments: 1620,
    initialShares: 4410,
    initialBookmarks: 7100,
  },
  {
    id: 'vid-103',
    type: 'video',
    author: {
      username: 'deep_abyss',
      displayName: 'Marcus Sterling',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Deep sea bioluminescent jellyfish pulsating in pitch-black abyss. 4K OLED benchmark 🌊🪼✨',
    tags: ['#DeepOcean', '#Bioluminescence', '#OLED4K', '#MarineLife'],
    musicTrack: 'Abyssal Pulse • Ambient Deep Wave',
    posterUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: jellyfishSD,
      upscaledUrl: jellyfishHD,
      bitrateStandard: '720p • 2.0 Mbps',
      bitrateUpscaled: '1080p • 9.2 Mbps (SuperRes v3)',
    },
    initialLikes: 62300,
    initialComments: 3190,
    initialShares: 11700,
    initialBookmarks: 14400,
  },
  {
    id: 'vid-104',
    type: 'video',
    author: {
      username: 'cosmic_pulse',
      displayName: 'Dr. Nova Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Orbital flyover across planet Earth. Witnessing the sunrise from 400km above 🌍🚀✨',
    tags: ['#SpaceExploration', '#EarthView', '#CosmicCinema', '#Orbital'],
    musicTrack: 'Starlight Pulse • Deep Ambient Wave',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: spaceSD,
      upscaledUrl: spaceHD,
      bitrateStandard: '720p • 1.8 Mbps',
      bitrateUpscaled: '1080p • 8.1 Mbps (Neural AI)',
    },
    initialLikes: 51800,
    initialComments: 2980,
    initialShares: 8100,
    initialBookmarks: 11300,
  },
  {
    id: 'vid-105',
    type: 'video',
    author: {
      username: 'nature_odyssey',
      displayName: 'Maya Lin',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Cascading turquoise waterfalls hidden deep in the emerald rainforest valley 🌿🌊🏞️',
    tags: ['#Waterfall', '#Rainforest', '#NaturePerfection', '#Wanderlust'],
    musicTrack: 'Echoes of Rain • Ambient Forest Streams',
    posterUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: waterfallVideo,
      upscaledUrl: waterfallHD,
      bitrateStandard: '720p • 2.6 Mbps',
      bitrateUpscaled: '1080p • 8.8 Mbps (HDR Vivid)',
    },
    initialLikes: 39100,
    initialComments: 1420,
    initialShares: 5800,
    initialBookmarks: 7600,
  },
  {
    id: 'vid-106',
    type: 'video',
    author: {
      username: 'alpine_fpv',
      displayName: 'Lukas Berg',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: false,
    },
    caption: 'Diving 2,000 meters down glacial alpine peaks at sunset. Zero wind turbulence 🏔️🦅⛷️',
    tags: ['#AlpineFPV', '#GlacierClimb', '#MountainCinema'],
    musicTrack: 'Summit Winds • Nordic Acoustic',
    posterUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: mountainVideo,
      upscaledUrl: mountainHD,
      bitrateStandard: '720p • 2.1 Mbps',
      bitrateUpscaled: '1080p • 7.5 Mbps (AI Clarity)',
    },
    initialLikes: 24700,
    initialComments: 890,
    initialShares: 3100,
    initialBookmarks: 4200,
  },
  {
    id: 'vid-107',
    type: 'video',
    author: {
      username: 'nordic_skies',
      displayName: 'Freja Lindqvist',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Dancing curtains of the Aurora Borealis illuminate the frozen Arctic fjord 🌌❄️✨',
    tags: ['#NorthernLights', '#AuroraBorealis', '#NorwayNights'],
    musicTrack: 'Celestial Dance • Ambient Synth',
    posterUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: auroraVideo,
      upscaledUrl: spaceHD,
      bitrateStandard: '720p • 2.5 Mbps',
      bitrateUpscaled: '1080p • 8.3 Mbps (Neural HDR)',
    },
    initialLikes: 74200,
    initialComments: 4120,
    initialShares: 16500,
    initialBookmarks: 21000,
  },
  {
    id: 'vid-108',
    type: 'video',
    author: {
      username: 'sahara_nomad',
      displayName: 'Tariq Al-Mansoor',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verified: false,
    },
    caption: 'Endless golden sand ridges under the setting Sahara sun. The silence here is absolute 🏜️🐪🌅',
    tags: ['#SaharaDesert', '#GoldenHour', '#DesertVibes'],
    musicTrack: 'Desert Mirage • Oud & Strings',
    posterUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: desertVideo,
      upscaledUrl: desertHD,
      bitrateStandard: '720p • 2.2 Mbps',
      bitrateUpscaled: '1080p • 7.9 Mbps (AI SuperRes)',
    },
    initialLikes: 18900,
    initialComments: 670,
    initialShares: 2200,
    initialBookmarks: 3400,
  },
  {
    id: 'vid-109',
    type: 'video',
    author: {
      username: 'ocean_depths',
      displayName: 'Dr. Sarah Jenkins',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Exploring pristine coral reefs with pods of spinner dolphins in 4K clarity 🐬🪸🌊',
    tags: ['#MarineLife', '#CoralReef', '#Oceans', '#Conservation'],
    musicTrack: 'Oceanic Harmony • Symphony No. 4',
    posterUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: oceansVideo,
      upscaledUrl: jellyfishHD,
      bitrateStandard: '720p • 2.8 Mbps',
      bitrateUpscaled: '1080p • 9.0 Mbps (AI 60FPS)',
    },
    initialLikes: 58300,
    initialComments: 2840,
    initialShares: 9400,
    initialBookmarks: 13200,
  },
  {
    id: 'vid-110',
    type: 'video',
    author: {
      username: 'redwood_walker',
      displayName: 'Ethan Cross',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      verified: false,
    },
    caption: 'Morning sun rays piercing through the coastal redwood fog canopy 🌲☀️🍃',
    tags: ['#Redwoods', '#ForestMagic', '#PacificNorthwest'],
    musicTrack: 'Canopy Glow • Acoustic Fingerpicking',
    posterUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: forestVideo,
      upscaledUrl: waterfallHD,
      bitrateStandard: '720p • 2.3 Mbps',
      bitrateUpscaled: '1080p • 8.0 Mbps (AI Enhanced)',
    },
    initialLikes: 31200,
    initialComments: 1100,
    initialShares: 4700,
    initialBookmarks: 6300,
  },
  {
    id: 'vid-111',
    type: 'video',
    author: {
      username: 'coastal_vibes',
      displayName: 'Chloe Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Slow motion turquoise breakers crashing on volcanic black sand shores 🌊🏖️🖤',
    tags: ['#OceanWaves', '#SlowMo', '#Coastline', '#Zen'],
    musicTrack: 'Tidal Rhythm • Chillhop Beats',
    posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: wavesVideo,
      upscaledUrl: wavesHD,
      bitrateStandard: '720p • 2.0 Mbps',
      bitrateUpscaled: '1080p • 7.6 Mbps (UltraHD)',
    },
    initialLikes: 46800,
    initialComments: 1950,
    initialShares: 8200,
    initialBookmarks: 10400,
  },
  {
    id: 'vid-112',
    type: 'video',
    author: {
      username: 'skyline_drone',
      displayName: 'Kenji Sato',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      verified: true,
    },
    caption: 'Cinematic aerial descent through deep mountain ravines and winding river canyons ⛰️🚁',
    tags: ['#AerialCinema', '#DroneWorld', '#CanyonViews'],
    musicTrack: 'Horizon Call • Cinematic Orchestral',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    streams: {
      standardUrl: aerialVideo,
      upscaledUrl: mountainHD,
      bitrateStandard: '720p • 2.4 Mbps',
      bitrateUpscaled: '1080p • 8.5 Mbps (Neural Pro)',
    },
    initialLikes: 53600,
    initialComments: 2310,
    initialShares: 9900,
    initialBookmarks: 12800,
  },
];

export const MOCK_ADS: AdItem[] = [
  {
    id: 'ad-501',
    type: 'ad',
    brandName: 'Nebula Cloud Studio',
    tagline: 'Stream, Scale & Upscale in Real-time',
    headline: 'Zero-Latency Edge Video Infrastructure',
    description: 'Transform your media pipeline with ultra-low latency transcoding, automated AI upscaling, and global CDN delivery.',
    mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    ctaText: 'Start Free Trial',
    ctaUrl: 'https://nebulacloud.io',
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
