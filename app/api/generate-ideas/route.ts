import { NextResponse } from 'next/server';
import { model } from '../../lib/gemini';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { budget, time, energy, latitude, longitude, useLocation } = body;

        // Construct the prompt
        let locationContext = "";
        if (useLocation && latitude && longitude) {
            locationContext = `The user is currently at Latitude: ${latitude}, Longitude: ${longitude}. Please suggest kindness activities that are feasible near this location. If specific places are relevant (like a nearby park, orphanage, or market), generic types are fine if you can't access real-time map data.`;
        }

        const prompt = `
      Act as a creative kindness coach for Gen Z Indonesians.
      The user wants to do a random act of kindness ("Pay It Forward").
      
      Context:
      - Budget: Rp ${budget}
      - Time Available: ${time} minutes
      - Energy Level: ${energy}
      ${locationContext}

      Generate 3 specific, fun, and meaningful kindness ideas in JSON format.
      Language: Indonesian (Gaul/Casual/Pop but polite).
      
      Required JSON Structure:
      [
        {
          "emoji": "string (relevant emoji)",
          "title": "string (catchy title)",
          "description": "string (actionable instruction)",
          "budget": "string (estimated cost formatted)",
          "time": "string (estimated duration)",
          "distance": "string (estimated distance or location context)",
          "difficulty": "Mudah" | "Sedang" | "Menantang",
          "category": "string (e.g. Berbagi Makanan, Lingkungan, Hewan, etc.)"
        }
      ]
      
      Only return the raw JSON array. No markdown code blocks.
    `;

        if (!process.env.GEMINI_API_KEY) {
            // Fallback response if no API Key (for testing/demo without breaking)
            return NextResponse.json([
                {

                    title: 'API Key Missing',
                    description: 'Please add GEMINI_API_KEY to .env.local',
                    budget: 'Rp 0',
                    time: '0 min',
                    distance: '-',
                    difficulty: 'Mudah',
                    category: 'System'
                }
            ]);
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown formatting from Gemini
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const suggestions = JSON.parse(cleanText);

        return NextResponse.json(suggestions);

    } catch (error) {
        console.error("Error generating ideas:", error);
        return NextResponse.json(
            { error: 'Failed to generate ideas' },
            { status: 500 }
        );
    }
}
