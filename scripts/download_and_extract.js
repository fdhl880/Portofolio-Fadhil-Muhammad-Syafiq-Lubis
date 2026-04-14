const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Find ffmpeg in common WinGet install paths
const possiblePaths = [
  'C:\\Users\\Asus\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1-full_build\\bin',
  'C:\\ProgramData\\chocolatey\\bin',
  'C:\\ffmpeg\\bin'
];
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    process.env.PATH = process.env.PATH + ';' + p;
  }
}

const VIDEOS = [
  { url: 'https://assets.mixkit.co/videos/3651/3651-720.mp4',   name: 'precision', outDir: './public/sequences/precision' },
  { url: 'https://assets.mixkit.co/videos/487/487-720.mp4',     name: 'polymath',  outDir: './public/sequences/polymath' },
  { url: 'https://assets.mixkit.co/videos/30979/30979-720.mp4', name: 'captain',   outDir: './public/sequences/captain' }
];

const TOTAL_FRAMES = 120;
const TEMP_DIR = './temp_videos';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;
    const request = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if ([301, 302].includes(response.statusCode)) {
        file.close();
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) { reject(new Error(`HTTP ${response.statusCode} for ${url}`)); return; }
      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloaded = 0;
      response.on('data', (chunk) => {
        downloaded += chunk.length;
        const pct = totalSize ? Math.round(downloaded / totalSize * 100) : '?';
        process.stdout.write(`\r  ${pct}% (${(downloaded/1024/1024).toFixed(1)}MB)`);
      });
      response.pipe(file);
      file.on('finish', () => { file.close(); console.log('\n  Download complete!'); resolve(); });
    });
    request.on('error', reject);
  });
}

function findFfmpeg() {
  // Check where ffmpeg is installed by WinGet
  const wingetBase = path.join(process.env.LOCALAPPDATA || 'C:\\Users\\Asus\\AppData\\Local', 
    'Microsoft', 'WinGet', 'Packages');
  if (fs.existsSync(wingetBase)) {
    const pkgs = fs.readdirSync(wingetBase).filter(d => d.startsWith('Gyan.FFmpeg'));
    for (const pkg of pkgs) {
      const bins = path.join(wingetBase, pkg);
      const sub = fs.readdirSync(bins).find(d => d.includes('ffmpeg'));
      if (sub) {
        const ffmpegExe = path.join(bins, sub, 'bin', 'ffmpeg.exe');
        if (fs.existsSync(ffmpegExe)) return ffmpegExe;
      }
    }
  }
  return 'ffmpeg'; // fallback to PATH
}

async function run() {
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);
  
  const ffmpeg = findFfmpeg();
  const ffprobe = ffmpeg.replace('ffmpeg.exe', 'ffprobe.exe');
  console.log(`Using ffmpeg: ${ffmpeg}`);

  for (const video of VIDEOS) {
    console.log(`\n============================`);
    console.log(`Processing: ${video.name.toUpperCase()}`);
    console.log(`============================`);

    const videoPath = path.join(TEMP_DIR, `${video.name}.mp4`);

    // 1. Download if needed
    if (fs.existsSync(videoPath) && fs.statSync(videoPath).size > 100000) {
      console.log(`  Already downloaded (${(fs.statSync(videoPath).size/1024/1024).toFixed(1)}MB), skipping.`);
    } else {
      console.log(`  Downloading: ${video.url}`);
      await downloadFile(video.url, videoPath);
    }

    // 2. Get duration using ffprobe with explicit args
    let dur = 10; // default
    const probeResult = spawnSync(ffprobe, [
      '-v', 'quiet',
      '-print_format', 'json',
      '-show_format',
      videoPath
    ], { encoding: 'utf8' });
    
    try {
      const json = JSON.parse(probeResult.stdout);
      dur = parseFloat(json.format.duration);
      if (isNaN(dur) || dur <= 0) dur = 10;
    } catch(e) {
      console.log('  Warning: could not parse duration, using 10s');
    }
    console.log(`  Duration: ${dur.toFixed(2)}s`);

    // 3. Clear and prepare output dir
    if (!fs.existsSync(video.outDir)) {
      fs.mkdirSync(video.outDir, { recursive: true });
    } else {
      fs.readdirSync(video.outDir).forEach(f => {
        try { fs.unlinkSync(path.join(video.outDir, f)); } catch(e) {}
      });
    }

    // 4. Extract 120 evenly-spaced frames
    const step = dur / TOTAL_FRAMES;
    console.log(`  Extracting ${TOTAL_FRAMES} frames (1 every ${step.toFixed(3)}s)...`);
    
    let extracted = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const timestamp = (i * step).toFixed(6);
      const frameNum = String(i + 1).padStart(3, '0');
      const outFile = path.join(video.outDir, `frame_${frameNum}.webp`);
      
      const r = spawnSync(ffmpeg, [
        '-ss', timestamp,
        '-i', videoPath,
        '-vframes', '1',
        '-vf', 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720',
        '-q:v', '80',
        outFile,
        '-y'
      ], { encoding: 'utf8' });
      
      if (r.status === 0 && fs.existsSync(outFile)) {
        extracted++;
        if (i % 20 === 0) process.stdout.write(`\r  ${extracted}/${TOTAL_FRAMES} frames extracted...`);
      }
    }
    console.log(`\n  ✓ Done! Extracted ${extracted} frames.`);
  }

  console.log(`\n🎉 All 3 sequences ready!`);
}

run().catch(console.error);
