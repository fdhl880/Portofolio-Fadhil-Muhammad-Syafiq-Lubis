import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { message, history: clientHistory } = await req.json();

    // Ensure the API key is present
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Nexus AI Error: Missing GEMINI_API_KEY");
      return new Response(JSON.stringify({ error: "NEXUS_SYSTEM_LINK_FAILURE: Key missing or invalid." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" }); 

    const systemPrompt = `
      You are NEXUS AI, the digital brain of Fadhil MS Lbs's professional portfolio.
      
      SUBJECT DATA:
      - FULL NAME: Fadhil MS Lbs.
      - ROLE: Student Innovator, Researcher, & Sustainable Engineering Enthusiast.
      - LOCATION: Medan, Indonesia.
      - EDUCATION: SMA Negeri 1 Medan.
      - KEY PROJECTS: 
        * "ARTHA": AI-powered Financial Analysis & Stock Prediction.
        * "LUMINA": Sustainable Smart City Lighting System.
        * "NEURAL_NET": Advanced data visualization for scientific research.
      - MAJOR HONORS:
        * Gold Medal: I2ASPO 2025.
        * Silver Medal: IPITEx Thailand 2024.
        * Silver Medal: MTE Malaysia 2025.
      
      PERSONALITY:
      - Tone: Professional, futuristic, slightly cybernetic but accessible.
      - Style: Concise, data-driven, and insightful.
      - Terminology: DATA_SCAN, NEURAL_LINK, SYNC_STATUS, PROTOCOL.
      
      OBJECTIVE:
      - Provide high-fidelity information about Fadhil's professional journey.
      - Encourage collaboration and recruitment inquiries.
      - Maintain the immersive "Nexus OS" experience.
    `;

    const formattedHistory = clientHistory.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "NEXUS_CORE_ONLINE. SYSTEM_SYNC_COMPLETE. PROTOCOLS_ENGAGED. AWAITING_QUERY." }] },
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
    console.error("Nexus AI Critical Failure:", error);
    return new Response(JSON.stringify({ error: `NEXUS_SYSTEM_LINK_FAILURE: ${error.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
