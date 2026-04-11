const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

// Set up the static binary
ffmpeg.setFfmpegPath(ffmpegStatic);

const extractFrames = (videoFilename, outputDirname) => {
  return new Promise((resolve, reject) => {
    const inputPath = path.join(__dirname, '../public/videos', videoFilename);
    const outputDir = path.join(__dirname, '../public/sequences', outputDirname);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log(`Starting extraction for ${videoFilename}...`);

    ffmpeg(inputPath)
      .outputOptions([
        '-vf scale=1280:-1', // Increased to 720p width for "Premium" look
        '-r 15', 
        '-vframes 120', // LIMIT to 120 frames (8 seconds) for browser memory safety
        '-vcodec libwebp',
        '-lossless 0',
        '-qscale 60',
        '-preset default',
        '-an'
      ])
      .output(`${outputDir}/frame_%03d.webp`)
      .on('end', () => {
        console.log(`Successfully extracted ${videoFilename} to ${outputDirname}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error processing ${videoFilename}:`, err);
        reject(err);
      })
      .run();
  });
};

const run = async () => {
  try {
    const jobs = [
      { vid: 'hero_intro.mp4', dir: 'hero' },
      { vid: 'precision.mp4', dir: 'precision' },
      { vid: 'gold.mp4', dir: 'gold' },
      { vid: 'origin.mp4', dir: 'origin' },
      { vid: 'vision.mp4', dir: 'vision' },
      { vid: 'material.mp4', dir: 'material' },
      { vid: 'polymath_new.mp4', dir: 'polymath' },
      { vid: 'captain_new.mp4', dir: 'captain' }
    ];

    for (const job of jobs) {
      await extractFrames(job.vid, job.dir);
    }
    console.log("All extractions completed!");
  } catch (err) {
    console.error("Failed:", err);
  }
};

run();
