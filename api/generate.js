export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {

        const { topic } = req.body;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `
The user wants to learn ${topic}.

Generate:
1. Beginner prerequisites
2. Concepts in order
3. Common mistakes
4. A roadmap in bullet points.
`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        res.status(200).json({
            roadmap: data.candidates[0].content.parts[0].text
        });

    }

    catch (err) {

        res.status(500).json({
            error: "Server Error"
        });

    }

}