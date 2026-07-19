// Find the button
const analyzeButton = document.getElementById("analyzeBtn");

// Find the input box
const topicInput = document.getElementById("topicInput");

// Find the result area
const resultDiv = document.getElementById("result");



analyzeButton.addEventListener("click", async function () {

    const topic = topicInput.value;
    resultDiv.innerHTML = "<p>Generating learning roadmap...</p>";

    const roadmap = await generateLearningPath(topic);

    resultDiv.innerText = roadmap;


    console.log(topic);
});

//async function(This function has to wait for the internet) makes it asynchronous, allowing the use of await inside it. Await pauses the execution of the function until the Promise is resolved, making it easier to work with asynchronous code.
async function generateLearningPath(topic) {
     
    if (!topic.trim()) {
    return "⚠️ Please enter a topic first.";
    }
    
    try{

         const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${API_KEY}`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },
            // Convert a JavaScript object into JSON text before sending it to the Gemini server
            body: JSON.stringify({
                 contents: [
                        {
                            parts: [
                                {
                                    text:
                                    `The user wants to learn ${topic}.
                                    
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
    // Convert the JSON response back into a JavaScript object
    const data = await response.json();

    // Navigate through Gemini's response structure and extract only the generated text
    const result = data.candidates[0].content.parts[0].text;

    // Return the roadmap to whoever called this function
    return result; 

    }
    catch (error) {
        console.error(error);
        return "❌ Sorry! Unable to generate the learning roadmap right now. Please try again.";
    }
   

}
/* The Above function:
Flow:

User enters topic
        ↓
generateLearningPath(topic)
        ↓
Send POST request to Gemini API
        ↓
Wait for AI response
        ↓
Receive JSON response
        ↓
Extract generated text
        ↓
Return roadmap back to caller

if faced problem any above process, catch block is executed.
*/