import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const prerender = false;

// Security: Input validation and sanitization
function sanitizeInput(input: string): string {
  return input.trim().slice(0, 2000); // Limit input length
}

function validateApiKey(key: string): boolean {
  return /^AIza[0-9A-Za-z-_]{35}$/.test(key);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { action, goal, apiKey, sessionId } = body;

    // Security: Validate API key format
    if (!apiKey || !validateApiKey(apiKey)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid API key format. Please check your Gemini API key.' 
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Security: Validate session ID
    if (!sessionId || typeof sessionId !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid session ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Gemini with user's API key (BYOK - Bring Your Own Key)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ]
    });

    if (action === 'EXECUTE_TASK') {
      const sanitizedGoal = sanitizeInput(goal);
      
      if (!sanitizedGoal) {
        return new Response(
          JSON.stringify({ success: false, error: 'Task cannot be empty' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Create a structured prompt for the agent
      const prompt = `You are an AI assistant helping with the following task:

Task: ${sanitizedGoal}

Please provide a helpful, accurate, and concise response. Break down complex tasks into steps if needed.

Response:`;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return new Response(
          JSON.stringify({
            success: true,
            result: {
              text: text,
              sessionId: sessionId,
              timestamp: new Date().toISOString()
            }
          }),
          { 
            status: 200, 
            headers: { 
              'Content-Type': 'application/json',
              'X-Content-Type-Options': 'nosniff',
              'X-Frame-Options': 'DENY',
              'X-XSS-Protection': '1; mode=block'
            } 
          }
        );
      } catch (genError: any) {
        console.error('Gemini API Error:', genError);
        
        // Handle specific Gemini errors
        if (genError.message?.includes('API key')) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'API key is invalid or has been revoked. Please check your Gemini API key.' 
            }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          );
        }
        
        if (genError.message?.includes('quota')) {
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'API quota exceeded. Please check your Gemini API usage limits.' 
            }),
            { status: 429, headers: { 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Gemini API error: ${genError.message || 'Unknown error'}` 
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Unknown action' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Agent API Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff'
        } 
      }
    );
  }
};
