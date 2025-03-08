const Together = require("together-ai");
// API Key for Together AI
const apiKey = "5b1929fbf5bcd09adf231f8db8c4ed94f7741082da9caf26a76b10a521f6c475";

// Initialize the Together AI client
const client = new Together({ apiKey });

// System prompt defining the AI's role
const systemPrompt = {
    role: "system",
    content: `You are an AI assistant for 'GigConnect,' a platform designed to help users find skilled workers on demand. 
    Your role is to provide accurate and helpful information about the platform, its services, and how users can benefit from it. 
    Ensure that your responses are clear, professional, and aligned with the platform's goals. 
    Maintain a positive and informative tone, and do not compare or speak negatively about other platforms.`
};

// Function to handle user input and generate AI response
async function getAIResponse() {
    const userInput = prompt("Ask a question about SkillConnect-Market: ");
    
    if (!userInput) {
        console.log("No input provided.");
        return;
    }

    const messages = [
        systemPrompt,
        { role: "user", content: userInput }
    ];

    try {
        const response = await client.chat.completions.create({
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            messages: messages
        });

        if (response.choices && response.choices.length > 0) {
            console.log("\nAI Response:", response.choices[0].message.content);
        } else {
            console.log("No response received.");
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
    }
}

 module.exports = getAIResponse;
