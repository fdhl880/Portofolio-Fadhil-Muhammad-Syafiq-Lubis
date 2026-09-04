const puppeteer = require('puppeteer');
const fs = require('fs');

const sites = [
  { url: 'https://researchbuddyweb.vercel.app', name: 'project-researchbuddy' },
  { url: 'https://pyrofuelappharsa.vercel.app/', name: 'project-pyrofuel' },
  { url: 'https://boneato.vercel.app/', name: 'project-boneato' },
  { url: 'https://math-games-by-9-d.vercel.app/', name: 'project-nusamatika' }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  for (const site of sites) {
    try {
      console.log(`Capturing ${site.name}...`);
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Wait an extra second for animations
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({ path: `public/images/${site.name}.jpg`, quality: 80 });
      console.log(`Saved ${site.name}.jpg`);
    } catch (err) {
      console.error(`Failed to capture ${site.name}:`, err.message);
    }
  }

  await browser.close();
}

captureScreenshots();
