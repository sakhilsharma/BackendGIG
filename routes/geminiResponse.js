const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
console.log(GEMINI_API_KEY);
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
if (!GEMINI_API_KEY) {
    console.error("❌ ERROR: Missing GEMINI_API_KEY in environment variables!");
}
const geminiResponse = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // 🔹 Context: Provide FAQ Data
        const FAQ_CONTEXT = `
You are GigConnect's AI assistant. GigConnect is a platform that connects workers with clients looking for their services.
Answer user queries based on these FAQs:

### **Worker Registration & Verification**
- **How do I register as a worker?**  
  🔹 Go to the signup page and choose "Worker" to create an account. Fill in your name, profession, skills, hourly rate, and location.

- **What documents do I need for verification?**  
  🔹 Workers must upload a **government-issued ID (Aadhar, PAN, Passport, or Driver’s License)** and optionally provide **certifications, experience letters, or trade licenses**.

- **How long does verification take?**  
  🔹 Verification usually takes **24-48 hours** after document submission.

- **What happens if my verification is rejected?**  
  🔹 If rejected, you will receive a **notification with reasons**. You can update your details and reapply.

### **Hiring & Job Posting**
- **How do I hire a worker?**  
  🔹 Search for a profession, apply filters (location, price, skills), and click "Buy Time". You can contact the worker before finalizing.

- **Can I post a job instead of searching for workers?**  
  🔹Not yet! In future project expansion, clients may be able to  **post a job listing** specifying their **budget, job duration, and required skills**. Workers can apply directly.

- **Can I negotiate the price with workers?**  
  🔹 The pricing is pre-estimated and is the most affordable compared to market rates.


### **Services & Specializations**
- **What services are available?**  
  🔹 GigConnect offers a range of services, including:  
    - 🛠 **Plumbing** (Leak fixes, pipe installations)  
    - 🔌 **Electrical Work** (Wiring, repairs, installations)  
    - 🏗 **Carpentry** (Furniture making, repairs)  
    - 🎨 **Painting** (House painting, wall designs)  
    - 🚪 **Home Repairs** (General maintenance)  
    - More professional and freelance services.

- **Are all workers verified?**  
  🔹 Workers with a ✅ **Verified Badge** have completed identity verification and provided necessary credentials.

### **Payments & Disputes**
- **How does payment work?**  
  🔹 Clients can pay workers **directly via the GigConnect platform** using **UPI, debit/credit cards, or bank transfers**.

- **Do workers get paid in advance?**  
  🔹 Payments are **released after job completion**. Clients may need to pay an **advance for long-term work**.

- **What if I am not satisfied with the service?**  
  🔹 You can **leave a review and request a dispute resolution** via GigConnect’s support.

### **Support & Safety**
- **How do I contact support?**  
  🔹 Use the **Help Center** or **Chat Support** in the app.

- **What safety measures does GigConnect have?**  
  🔹 We verify workers and provide a **secure chat system** to protect client-worker interactions.

- **Can I report a worker/client?**  
  🔹 Yes! Use the **"Report User" button** on their profile or contact support.

Respond professionally and only answer based on this knowledge.
`;


        // ✅ Send contextual FAQ-based request
        const requestData = {
            contents: [
                {
                    parts: [
                        { text: `${FAQ_CONTEXT}\n\nUser Query: ${message}` }
                    ]
                }
            ]
        };

        const response = await axios.post(GEMINI_API_URL, requestData, {
            headers: { "Content-Type": "application/json" }
        });

        const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No relevant answer found.";
        res.json({ reply: aiResponse });
    } catch (error) {
        console.error("❌ ERROR:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate response" });
    }
};

module.exports = geminiResponse;