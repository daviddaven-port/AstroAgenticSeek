
import type { APIRoute } from 'astro';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject, type CoreMessage, type UserContent, type LanguageModel } from "ai";
import { z } from "zod";
import { SessionManager } from '../../lib/agent/SessionManager';


export const prerender = false;

// --- Security & Validation Schemas ---

const ProviderSchema = z.enum(['google', 'openai', 'anthropic']).default('google');

// Secure Schema for Navigation actions
const ActionSchema = z.object({
  action: z.enum(['START', 'GET_NEXT_STEP', 'EXECUTE_STEP']),
  goal: z.string().min(1).optional(),
  sessionId: z.string().min(1),
  apiKey: z.string().min(1).optional(), // Optional if we use env vars later, but required for BYOK
  provider: ProviderSchema,
  previousSteps: z.array(z.any()).optional(),
  step: z.object({
    tool: z.enum(["GOTO", "ACT", "EXTRACT", "OBSERVE", "CLOSE", "WAIT", "NAVBACK"]),
    instruction: z.string()
  }).optional()
});

// Helper: Get AI Client safely
function getClient(apiKey: string, provider: string) {
  if (provider === 'openai') {
    const openai = createOpenAI({ apiKey, baseURL: 'https://openrouter.ai/api/v1' });
    return openai('google/gemini-2.0-flash-lite-001'); // Using OpenRouter alias
  }
  const google = createGoogleGenerativeAI({ apiKey });
  return google('gemini-2.0-flash-lite-001');
}

// Helper: Execute Browser Action via SessionManager
async function runBrowserAction(sessionId: string, method: string, instruction: string) {
  const sessionManager = SessionManager.getInstance();
  
  try {
    const page = await sessionManager.getOrCreateSession(sessionId);
    
    switch (method) {
      case "GOTO":
        // SSRF Protection: Validate URL protocol
        if (!instruction.startsWith('http://') && !instruction.startsWith('https://')) {
          throw new Error("Invalid URL protocol. Only http:// and https:// are allowed.");
        }
        await page.goto(instruction, { timeout: 30000, waitUntil: 'domcontentloaded' });
        return `Navigated to ${instruction}`;

      case "ACT":
        // TODO: Implement smart action parsing (click, type, etc.)
        // For now, this is a placeholder
        return "Action performed (awaiting implementation)";

      case "EXTRACT":
        const content = await page.content();
        // Truncate to prevent response bloat
        return content.slice(0, 2000) + (content.length > 2000 ? '...[truncated]' : '');

      case "SCREENSHOT":
        const buffer = await page.screenshot({ type: 'png' });
        return buffer.toString('base64');

      case "OBSERVE":
        // Get page title and URL as quick observation
        const title = await page.title();
        const url = page.url();
        return `Page: ${title}\nURL: ${url}`;

      case "CLOSE":
        await sessionManager.closeSession(sessionId);
        return "Browser session closed";
      
      case "WAIT":
        const waitMs = parseInt(instruction) || 1000;
        await page.waitForTimeout(Math.min(waitMs, 10000)); // Max 10s
        return `Waited ${waitMs}ms`;
      
      case "NAVBACK":
        await page.goBack({ timeout: 10000 });
        return "Navigated back";

      default:
        return `Unknown method: ${method}`;
    }
  } catch (e: any) {
    console.error(`[Browser Error] Session: ${sessionId}, Method: ${method}, Error:`, e);
    return `Error: ${e.message}`;
  }
}

async function selectStartingUrl(goal: string, apiKey: string, provider: string) {
  const client = getClient(apiKey, provider);
  const result = await generateObject({
    model: client as LanguageModel,
    schema: z.object({
      url: z.string().url(),
      reasoning: z.string(),
    }),
    messages: [
      { role: "user", content: `Goal: "${goal}". Return the best starting URL.` },
    ],
  });
  return result.object;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.json();

    // 1. Zod Validation (Security Layer)
    const result = ActionSchema.safeParse(rawBody);
    if (!result.success) {
      return new Response(JSON.stringify({ error: "Invalid Request", details: result.error.format() }), { status: 400 });
    }
    const { action, goal, sessionId, apiKey, provider, step, previousSteps } = result.data;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key Required for BYOK" }), { status: 401 });
    }

    switch (action) {
      case "START": {
        if (!goal) return new Response(JSON.stringify({ error: "Goal required" }), { status: 400 });
        const { url, reasoning } = await selectStartingUrl(goal, apiKey, provider);

        // Execute Navigation
        await runBrowserAction(sessionId, "GOTO", url);

        return new Response(JSON.stringify({
          success: true,
          result: { text: `Navigated to ${url}`, tool: 'GOTO', instruction: url, reasoning },
          steps: [{ text: `Navigated to ${url}`, tool: 'GOTO', instruction: url, reasoning }]
        }));
      }

      case "EXECUTE_STEP": {
        if (!step) return new Response(JSON.stringify({ error: "Step required" }), { status: 400 });
        const output = await runBrowserAction(sessionId, step.tool, step.instruction);
        return new Response(JSON.stringify({ success: true, extraction: output }));
      }

      case "GET_NEXT_STEP": {
        const client = getClient(apiKey, provider);
        
        // Construct history context
        const historyText = previousSteps?.map((s: any, i: number) => 
          `Step ${i + 1}: ${s.tool} ${s.instruction || ''}\nResult: ${s.extraction || 'Done'}`
        ).join('\n') || "No previous steps.";

        const systemPrompt = `
          You are an AI Agent browsing the web. Your goal is: "${goal}".
          
          You have access to a local browser via Playwright.
          Available Tools:
          - GOTO [url]: Navigate to a URL.
          - ACT [selector]: Simulate user interaction (click, type). For now, describe the action clearly.
          - EXTRACT [selector]: Get text content from the page.
          - OBSERVE: Take a screenshot or read page state (simulated).
          - CLOSE: End the session when goal is achieved.
          
          Current Status/History:
          ${historyText}
          
          Decide the next single step. Valid tools: "GOTO", "ACT", "EXTRACT", "OBSERVE", "CLOSE".
          Be efficient.
        `;

        const result = await generateObject({
          model: client as LanguageModel,
          schema: z.object({
            tool: z.enum(["GOTO", "ACT", "EXTRACT", "OBSERVE", "CLOSE", "WAIT", "NAVBACK"]),
            instruction: z.string().describe("The parameter for the tool (URL, selector, or description)"),
            reasoning: z.string().describe("Why you chose this step"),
            done: z.boolean().describe("True if the goal is fully achieved")
          }),
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: "What is the next step?" }
          ]
        });

        return new Response(JSON.stringify({
          success: true,
          result: result.object,
          steps: [...(previousSteps || []), result.object]
        }));
      }

      default:
        return new Response(JSON.stringify({ error: "Action not implemented" }), { status: 501 });
    }

  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
  }
}
