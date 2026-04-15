/**
 * ATELIER LUBIS — Section Media Database
 * 
 * Centralized registry for every section's visual background.
 * Each entry maps to a high-end cinematic image or video URL.
 * 
 * To use your own Supabase assets, replace any `url` value with:
 * `https://<SUPABASE_PROJECT_ID>.supabase.co/storage/v1/object/public/assets/<path>`
 */

const SUPABASE_BASE = `https://rlfyyywtxmqohppsmxva.supabase.co/storage/v1/object/public/assets`;

export const SECTION_MEDIA = {

  intro: {
    id: 'intro',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80',
    // Deep space nebula — cinematic entry
    overlayOpacity: 0.55,
    theme: 'deep-space',
  },

  LuxuryHero: {
    id: 'LuxuryHero',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
    // Circuit board close-up — engineering precision
    overlayOpacity: 0.50,
    theme: 'titanium',
  },

  GoldArchive: {
    id: 'GoldArchive',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=1920&q=80',
    // Gold abstract liquid — luxury & achievement
    overlayOpacity: 0.52,
    theme: 'gold-luxury',
  },

  AtelierSpec: {
    id: 'AtelierSpec',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    // Dark blueprint technical lines
    overlayOpacity: 0.48,
    theme: 'blueprint',
  },

  OriginSection: {
    id: 'OriginSection',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    // Indonesian mountain landscape — roots & heritage
    overlayOpacity: 0.45,
    theme: 'heritage',
  },

  GiantsSection: {
    id: 'GiantsSection',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
    // Portrait in low light — mentor silhouette
    overlayOpacity: 0.62,
    theme: 'monochrome',
  },

  HeritageSection: {
    id: 'HeritageSection',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80',
    // Library / chronological books — timeline of knowledge
    overlayOpacity: 0.50,
    theme: 'archive',
  },

  AtelierPhilosophy: {
    id: 'AtelierPhilosophy',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=1920&q=80',
    // Minimalist architectural lines — philosophy of form
    overlayOpacity: 0.52,
    theme: 'minimal-luxe',
  },

  ManifestoSection: {
    id: 'ManifestoSection',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
    // Earth from space — global manifesto
    overlayOpacity: 0.48,
    theme: 'galaxy',
  },

  StudioGallery: {
    id: 'StudioGallery',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80',
    // Tech workspace — studio feel
    overlayOpacity: 0.55,
    theme: 'studio',
  },

  CinematicAspiration: {
    id: 'CinematicAspiration',
    type: 'video',
    url: `${SUPABASE_BASE}/videos/engineer_1080p.mp4`,
    fallbackUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
    overlayOpacity: 0.50,
    theme: 'cyber-deep',
  },

  collections: {
    id: 'collections',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=80',
    // Code on screen in dark IDE
    overlayOpacity: 0.60,
    theme: 'code-dark',
  },

  TrophyGallery: {
    id: 'TrophyGallery',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1920&q=80',
    // Gold award bokeh — certification
    overlayOpacity: 0.52,
    theme: 'gold-matte',
  },

  ExpertiseLaboratory: {
    id: 'ExpertiseLaboratory',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
    // Circuit board — lab dark
    overlayOpacity: 0.55,
    theme: 'lab-dark',
  },

  DiscoverySection: {
    id: 'DiscoverySection',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
    // Cosmos close-up — discovery
    overlayOpacity: 0.50,
    theme: 'cosmos',
  },

  RoadmapSection: {
    id: 'RoadmapSection',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=1920&q=80',
    // Aerial road at night — trajectory
    overlayOpacity: 0.50,
    theme: 'night-city',
  },

  VisionSection: {
    id: 'VisionSection',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
    // Milky Way — future horizon
    overlayOpacity: 0.45,
    theme: 'horizon',
  },

  ContactSection: {
    id: 'ContactSection',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1920&q=80',
    // Clean minimal desk — communication node
    overlayOpacity: 0.55,
    theme: 'clean-dark',
  },
};

/**
 * Retrieves the media config for a given sectionId.
 * Falls back to a default deep-space image if section is unknown.
 */
export function getSectionMedia(sectionId) {
  return SECTION_MEDIA[sectionId] || {
    id: sectionId,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80',
    overlayOpacity: 0.60,
    theme: 'default',
  };
}
