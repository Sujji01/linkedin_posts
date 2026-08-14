/**
 * 100% FREE LinkedIn Sync Script
 * Runs in GitHub Actions (0 cost, no third-party paid subscriptions)
 * Fetches latest posts and updates src/data/linkedinPosts.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.join(__dirname, '..', 'src', 'data', 'linkedinPosts.json');

const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/sujithpolisetty';
const ACTIVITY_URL = 'https://www.linkedin.com/in/sujithpolisetty/recent-activity/all/';

async function scrapeWithPuppeteer() {
  try {
    const puppeteer = await import('puppeteer');
    console.log('[Free Sync] Launching headless browser on GitHub runner...');
    const browser = await puppeteer.default.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.goto(ACTIVITY_URL, { waitUntil: 'networkidle2', timeout: 30000 });

    const posts = await page.evaluate(() => {
      const items = [];
      const postElements = document.querySelectorAll('.feed-shared-update-v2, .profile-creator-shared-feed-update__container');
      
      postElements.forEach((el, index) => {
        if (index >= 6) return;
        const textEl = el.querySelector('.feed-shared-update-v2__description, .break-words');
        const text = textEl ? textEl.innerText.trim() : '';
        const linkEl = el.querySelector('a.feed-shared-update-v2__permalink, a[data-control-name="post_link"]');
        const postLink = linkEl ? linkEl.href : window.location.href;

        if (text && text.length > 20) {
          items.push({
            id: `linkedin-post-${Date.now()}-${index}`,
            content: text,
            publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            postUrl: postLink,
            tags: (text.match(/#(\w+)/g) || ['#VLSI', '#PhysicalDesign']).map(t => t.replace('#', '')).slice(0, 5),
            keyHighlight: text.split('\n')[0].slice(0, 45) || 'Physical Design Insight'
          });
        }
      });
      return items;
    });

    await browser.close();
    return posts;
  } catch (err) {
    console.warn(`[Free Sync] Headless scrape notice: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('[Free Sync] Starting free automated LinkedIn sync...');
  let posts = null;

  try {
    posts = await scrapeWithPuppeteer();
  } catch (e) {
    console.log('[Free Sync] Fallback to existing verified data.');
  }

  if (posts && posts.length > 0) {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(posts, null, 2), 'utf8');
    console.log(`[Free Sync] ✅ Successfully updated ${posts.length} real posts to src/data/linkedinPosts.json`);
  } else {
    console.log('[Free Sync] Preserved current posts in src/data/linkedinPosts.json without corruption.');
  }
}

main();
