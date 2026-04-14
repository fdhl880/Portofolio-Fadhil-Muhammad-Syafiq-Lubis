/**
 * Global Asset Infrastructure Utility
 * Offloads heavy 3D models and high-res video backgrounds to Supabase Storage.
 * Ensures the frontend bundle remains optimized and lag-free.
 */

const SUPABASE_PROJECT_ID = 'rlfyyywtxmqohppsmxva';
const BUCKET_NAME = 'assets'; // Assuming 'assets' bucket
const SUPABASE_STORAGE_BASE = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/${BUCKET_NAME}`;

export const ASSETS = {
  // 3D Models
  MODELS: {
    NUCLEUS: `${SUPABASE_STORAGE_BASE}/models/nucleus_core_v2.glb`,
    PROJECT_HOLOGRAPH: `${SUPABASE_STORAGE_BASE}/models/project_hologram.glb`,
    HERO_GEOMETRY: `${SUPABASE_STORAGE_BASE}/models/hero_exclusive.glb`,
  },
  
  // High-Performance 1080p Video Backgrounds
  VIDEOS: {
    ENGINEER: `${SUPABASE_STORAGE_BASE}/videos/engineer_1080p.mp4`,
    PROFESSOR: `${SUPABASE_STORAGE_BASE}/videos/professor_polymath_1080p.mp4`,
    CAPTAIN: `${SUPABASE_STORAGE_BASE}/videos/captain_industry_1080p.mp4`,
    INTRO_STATIC: `${SUPABASE_STORAGE_BASE}/videos/intro_cinematic.mp4`,
  },

  // Heavy textures or HDRIs
  ENVMAPS: {
    STUDIO: `${SUPABASE_STORAGE_BASE}/env/studio_night.hdr`,
    SPACE: `${SUPABASE_STORAGE_BASE}/env/deep_space_cinematic.hdr`,
  }
};

/**
 * Returns the optimized URL for an asset.
 * If the blob base URL is not set, it falls back to local placeholders to prevent breakage.
 */
export function getAssetUrl(category, key, fallbackPath) {
  const blobUrl = ASSETS[category]?.[key];
  if (blobUrl && !blobUrl.startsWith('undefined')) {
    return blobUrl;
  }
  return fallbackPath || '';
}
