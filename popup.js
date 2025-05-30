let started = false
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false; // Get real-time results (optional)
recognition.lang = "en-US"; // Language for recognition
var transcript = ""
var inserted = false;
recognition.onresult = async (event) => {
    console.log(event.results);
    transcript = event.results[event.results.length - 1][0].transcript;
    console.log(`Recognized text: ${transcript}`);
    chrome.runtime.sendMessage({
        type: "text_from_popup", 
        text: transcript,
    });



};

recognition.onend = () => {
    // transcript="";
    recognition.start();
};


document.getElementById("addButton").addEventListener("click", async () => {


        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log(tabs);
            
            if (tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "addButton" });
            }
        });
        inserted = true;
        
});


