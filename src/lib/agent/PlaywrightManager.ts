import { chromium, type Browser, type Page } from 'playwright';

export class PlaywrightManager {
    private static instance: PlaywrightManager;
    private browser: Browser | null = null;

    private constructor() { }

    public static getInstance(): PlaywrightManager {
        if (!PlaywrightManager.instance) {
            PlaywrightManager.instance = new PlaywrightManager();
        }
        return PlaywrightManager.instance;
    }

    /**
     * Initializes the browser if it's not already running.
     */
    public async getBrowser(): Promise<Browser> {
        if (!this.browser || !this.browser.isConnected()) {
            console.log('Launching new browser instance...');
            this.browser = await chromium.launch({
                headless: true, // Run headless for server/docker environments
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage', // Prevent OOM in Docker
                    '--disable-gl-drawing-for-tests'
                ]
            });
        }
        return this.browser;
    }

    /**
     * Creates a new secure context for a user session.
     * Incognito ensures no shared state between requests.
     */
    public async createPage(): Promise<Page> {
        const browser = await this.getBrowser();
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            viewport: { width: 1280, height: 800 }
        });
        return context.newPage();
    }

    /**
     * Closes the entire browser instance (for shutdown).
     */
    public async cleanup() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}
