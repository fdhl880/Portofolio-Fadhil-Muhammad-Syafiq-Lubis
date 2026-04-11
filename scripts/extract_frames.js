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
        '-vf scale=960:-1', 
        '-r 15', 
        '-vcodec libwebp',
        '-lossless 0',
        '-qscale 50',
        '-preset default',
        '-loop 0',
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
    await extractFrames('polymath_new.mp4', 'polymath');
    await extractFrames('captain_new.mp4', 'captain');
    console.log("All done!");
  } catch (err) {
    console.error("Failed:", err);
  }
};

run();
