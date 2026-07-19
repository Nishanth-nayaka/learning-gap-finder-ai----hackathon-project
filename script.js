// Find the button
const analyzeButton = document.getElementById("analyzeBtn");

// Find the input box
const topicInput = document.getElementById("topicInput");

// Find the result area
const resultDiv = document.getElementById("result");



analyzeButton.addEventListener("click", async function () {

    const topic = topicInput.value;
    resultDiv.innerHTML = "<p>Generating learning roadmap...</p>";

    const response = await fetch("/api/generate", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        topic: topic
    })

});
const data = await response.json();
const roadmap = data.roadmap;



    resultDiv.innerText = roadmap;


    console.log(topic);
});

