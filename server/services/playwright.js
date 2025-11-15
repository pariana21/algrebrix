import { chromium } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();

const PLAYWRIGHT_ENABLED = process.env.PLAYWRIGHT_ENABLED !== 'false';

export async function extractPageContent(url) {
  if (!PLAYWRIGHT_ENABLED) {
    return await fallbackExtraction(url);
  }

  let browser = null;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });

    const page = await context.newPage();

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 10000
    });

    await page.evaluate(() => {
      const selectors = [
        '.cookie-banner', '.cookie-notice', '.gdpr-banner',
        '[class*="cookie"]', '[id*="cookie"]',
        '.modal-overlay', '.popup-overlay'
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });
    });

    const title = await page.title().catch(() => 'No title');

    const excerpt = await page.evaluate(() => {
      const paragraphs = Array.from(document.querySelectorAll('p'));

      const meaningfulP = paragraphs.find(p => {
        const text = p.textContent?.trim() || '';
        return text.length > 50 && !text.match(/cookie|gdpr|accept|reject/i);
      });

      if (meaningfulP) {
        return meaningfulP.textContent.trim().substring(0, 300);
      }

      const bodyText = document.body.innerText || document.body.textContent || '';
      const cleanText = bodyText.replace(/\s+/g, ' ').trim();
      return cleanText.substring(0, 300);
    });

    await browser.close();

    return {
      url,
      title: title || 'No title found',
      excerpt: excerpt || 'No content available'
    };

  } catch (error) {
    if (browser) {
      await browser.close().catch(() => {});
    }

    console.error(`Playwright extraction failed for ${url}, using fallback:`, error.message);
    return await fallbackExtraction(url);
  }
}

async function fallbackExtraction(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 8000
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'No title';

    const pMatch = html.match(/<p[^>]*>([^<]+)<\/p>/i);
    let excerpt = pMatch ? pMatch[1].trim() : '';

    if (!excerpt || excerpt.length < 50) {
      const textContent = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      excerpt = textContent.substring(0, 300);
    }

    return {
      url,
      title: title.substring(0, 200),
      excerpt: excerpt.substring(0, 300) || 'No content available'
    };

  } catch (error) {
    console.error(`Fallback extraction failed for ${url}:`, error.message);
    return {
      url,
      title: 'Extraction failed',
      excerpt: `Unable to access page: ${error.message}`
    };
  }
}
