

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


var button = document.createElement("button");
button.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg>'
button.id = "captureVoice";

button.style.zIndex = "1000";
button.style.backgroundColor = "blue"; 
button.style.color = "white";
button.style.border = "none";
button.style.padding = "5px 10px";
button.style.borderRadius = "5px";
button.style.display = "flex";
button.style.alignItems = "center";





const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US"; 
var transcript = "";
var startTime=new Date().getTime();
recognition.onresult = async (event) => {
    
        console.log(event.results);
        transcript = event.results[event.results.length - 1][0].transcript;
        console.log(`Recognized text: ${transcript}`);
        const activeElement = document.activeElement;
        startTime=new Date().getTime();
        if(activeElement.id!="languageSelect" && activeElement.id!="captureVoice" && activeElement.id!="mainDiv" && activeElement.id!="closeButton"){
            activeElement.value= transcript; 
        }
};
var started = false;
recognition.onend = () => {
    transcript="";
    started = false;
    button.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg>'
};

var mainDiv=document.createElement("div");
mainDiv.id="mainDiv";
mainDiv.style.position = "fixed";
mainDiv.style.top = "10px";
mainDiv.style.right = "10px";
mainDiv.style.zIndex = "1000";
mainDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
mainDiv.style.color = "white";
mainDiv.style.padding = "10px 20px";
mainDiv.style.borderRadius = "5px";
mainDiv.style.display = "flex";
var closeButton = document.createElement("button");
closeButton.innerHTML = "x";
closeButton.style.backgroundColor = "red";
closeButton.style.color = "white";
closeButton.style.border = "none";
closeButton.style.padding = "5px 5px";
closeButton.style.borderRadius = "50%";
closeButton.style.height = "20px";
closeButton.style.display="flex";
closeButton.style.alignItems = "center";
closeButton.style.marginLeft = "10px";
closeButton.style.cursor="pointer"
closeButton.addEventListener("click", () => {
    const existingButton = document.getElementById("mainDiv");
    if (existingButton) {
        document.body.removeChild(existingButton);
        started = false; // Reset the started flag
        recognition.stop(); // Stop the recognition
        console.log("Button removed from the page");
    }
});
var closeDiv = document.createElement("div");
closeDiv.appendChild(closeButton);
closeDiv.style.display = "flex";
closeDiv.style.justifyContent = "center";
closeDiv.style.alignItems = "center";

 
mainDiv.appendChild(button);
var languages={"English":"en-US","Telugu":"te-IN","Hindi":"hi-IN","Spanish":"es-ES","French":"fr-FR","German":"de-DE","Chinese":"zh-CN","Japanese":"ja-JP","Russian":"ru-RU"};
var selectLanguage = document.createElement("select");
selectLanguage.id = "languageSelect";
for (const [language, code] of Object.entries(languages)) {
    var option = document.createElement("option");
    console.log(code);
    console.log(code=="en-US");
    
    if(code==="en-US"){
        option.selected = "selected"; 
    }
    option.value = code;
    option.textContent = language;
    selectLanguage.appendChild(option);
}
selectLanguage.style.marginLeft = "10px";
selectLanguage.style.backgroundColor = "blue";
selectLanguage.style.color = "white";
selectLanguage.style.border = "none";
selectLanguage.style.padding = "5px 10px";
selectLanguage.style.borderRadius = "5px";
selectLanguage.addEventListener("change", (event) => {
    event.preventDefault(); 
    recognition.lang = event.target.value; 
    recognition.stop(); 
    started = false; 
    button.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg>'
    console.log(`Language changed to: ${event.target.value}`);
});
mainDiv.appendChild(selectLanguage);
mainDiv.appendChild(closeDiv);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "addButton") {
        document.body.appendChild(mainDiv);   
        console.log("Button added to the page");
            
    }
    else if (message.action === "removeButton") {
        const existingButton = document.getElementById("mainDiv");
        console.log("Button removed from the page");
        if (existingButton) {
            document.body.removeChild(existingButton);
        }
    }
});


button.addEventListener("click", async () => {
    if(!started) {
        started = true;
        button.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>'
        recognition.start();
        console.log("SPEECH RECOG DONE");
        
    }
    else{
        started = false;
        recognition.stop();
        button.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg>'
        console.log("SPEECH RECOG STOPPED");
    }
});
