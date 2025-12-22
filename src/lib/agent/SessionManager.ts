import { Browser, Page, chromium } from 'playwright';

/**
 * SessionManager - Manages isolated Playwright sessions per user
 * 
 * CRITICAL: Replaces the singleton pattern to support concurrent users
 * Each sessionId gets its own Page instance with automatic cleanup
 */

interface Session {
  page: Page;
  lastActive: Date;
  goalContext?: string;
}

export class SessionManager {
  private static instance: SessionManager;
  private browser: Browser | null = null;
  private sessions: Map<string, Session> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;
  
  // Session expires after 30 minutes of inactivity
  private readonly SESSION_TIMEOUT_MS = 30 * 60 * 1000;
  
  private constructor() {
    // Start cleanup task
    this.startCleanupTask();
  }
  
  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }
  
  /**
   * Get or create a Playwright page for the given session
   */
  async getOrCreateSession(sessionId: string): Promise<Page> {
    // Update last active time if exists
    if (this.sessions.has(sessionId)) {
      const session = this.sessions.get(sessionId)!;
      session.lastActive = new Date();
      return session.page;
    }
    
    // Initialize browser if needed
    if (!this.browser) {
      this.browser = await chromium.launch({
        headless: true, // Run in headless mode on server
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      });
    }
    
    // Create new page for this session
    const context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      userAgent: 'WesternOS/1.0 (AgenticSeek Agent)'
    });
    
    const page = await context.newPage();
    
    // Store session
    this.sessions.set(sessionId, {
      page,
      lastActive: new Date()
    });
    
    console.log(`[SessionManager] Created new session: ${sessionId}`);
    return page;
  }
  
  /**
   * Update session context (e.g., current goal)
   */
  setSessionContext(sessionId: string, goalContext: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.goalContext = goalContext;
      session.lastActive = new Date();
    }
  }
  
  /**
   * Get session context
   */
  getSessionContext(sessionId: string): string | undefined {
    return this.sessions.get(sessionId)?.goalContext;
  }
  
  /**
   * Manually close a session
   */
  async closeSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      try {
        await session.page.context().close();
        this.sessions.delete(sessionId);
        console.log(`[SessionManager] Closed session: ${sessionId}`);
      } catch (error) {
        console.error(`[SessionManager] Error closing session ${sessionId}:`, error);
      }
    }
  }
  
  /**
   * Auto-cleanup task: removes inactive sessions
   */
  private startCleanupTask(): void {
    this.cleanupInterval = setInterval(() => {
      const now = new Date();
      const sessionsToClose: string[] = [];
      
      for (const [sessionId, session] of this.sessions.entries()) {
        const timeSinceActive = now.getTime() - session.lastActive.getTime();
        if (timeSinceActive > this.SESSION_TIMEOUT_MS) {
          sessionsToClose.push(sessionId);
        }
      }
      
      // Close expired sessions
      sessionsToClose.forEach(sessionId => {
        this.closeSession(sessionId);
      });
      
      if (sessionsToClose.length > 0) {
        console.log(`[SessionManager] Cleaned up ${sessionsToClose.length} expired sessions`);
      }
    }, 60 * 1000); // Run every minute
  }
  
  /**
   * Get active session count (for monitoring)
   */
  getActiveSessionCount(): number {
    return this.sessions.size;
  }
  
  /**
   * Cleanup all sessions and browser (for graceful shutdown)
   */
  async cleanup(): Promise<void> {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    
    // Close all sessions
    const closePromises = Array.from(this.sessions.keys()).map(sessionId =>
      this.closeSession(sessionId)
    );
    await Promise.all(closePromises);
    
    // Close browser
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
    
    console.log('[SessionManager] Complete cleanup finished');
  }
}

// Graceful shutdown handler
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, cleaning up sessions...');
  await SessionManager.getInstance().cleanup();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, cleaning up sessions...');
  await SessionManager.getInstance().cleanup();
  process.exit(0);
});
