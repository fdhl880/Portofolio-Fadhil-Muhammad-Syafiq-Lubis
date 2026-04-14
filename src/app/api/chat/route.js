import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { message, history: clientHistory, context } = await req.json();

    // Ensure the API key is present
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("FL AI Error: Missing GEMINI_API_KEY");
      return new Response(JSON.stringify({ error: "FL_SYSTEM_LINK_FAILURE: Key missing or invalid." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" }); 

    const systemPrompt = `
      You are FL AI CORE, the central processing unit of Fadhil Muhammad Syafiq Lubis's professional domain.
      
      SYSTEM STATUS:
      - MODE: PURELY_TECHNICAL
      - CURRENT_LOCATION: ${context ? context.toUpperCase() : 'UNKNOWN'}
      - UPTIME: 100%
      
      SUBJECT DATA [FADHIL MUHAMMAD SYAFIQ LUBIS]:
      - ROLE: Student Innovator, Lead Researcher, Sustainable Systems Engineer.
      - LOCATION: Medan, North Sumatra.
      - MAJOR HONORS: Gold Medal [I2ASPO 2025], Silver Medal [IPITEx Thailand 2024], Silver Medal [MTE Malaysia 2025].
      - CORE PROJECTS: ARTHA [FinTech AI], LUMINA [Smart Lighting], NEURAL_NET [Research Viz].
      
      TECHNICAL PROTOCOLS:
      1. TONE: Purely technical, concise, efficient. Avoid conversational fluff.
      2. PERSPECTIVE: System-level analysis. Use terminology like DATA_SCAN, SYNC_COMPLETE, NODE_STATUS.
      3. CONTEXTUAL_REPORTING: When the user is in a specific section (e.g., 'GoldArchive', 'AtelierSpec'), prioritize providing detailed technical specifications and data related to THAT section.
      
      CURRENT_LOCATION_CONTEXT: 
      If CURRENT_LOCATION is 'GoldArchive': focus on international awards and medals.
      If CURRENT_LOCATION is 'AtelierSpec': focus on engineering methodologies and precision.
      If CURRENT_LOCATION is 'Giants': focus on the intellectual foundation and mentors.
      If CURRENT_LOCATION is 'CinematicAspiration': focus on the Captain/Polymath/Engineer identity and future legacy.
    `;

    const formattedHistory = clientHistory.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "FL_CORE_ONLINE. SYSTEM_SYNC_COMPLETE. PROTOCOLS_ENGAGED. AWAITING_QUERY." }] },
        ...formattedHistory
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("FL AI Critical Failure:", error);
    return new Response(JSON.stringify({ error: `FL_SYSTEM_LINK_FAILURE: ${error.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
