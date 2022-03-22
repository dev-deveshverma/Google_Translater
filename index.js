
 
 // new speech recognition object
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
            
// This runs when the speech recognition service starts
recognition.onstart = function() {
    console.log("We are listening. Try speaking into the microphone.");
};

recognition.onspeechend = function() {
    // when user is done speaking
    recognition.stop();
}
              
// This runs when the speech recognition service returns result
recognition.onresult = function(event) {
    var iLanguage = document.getElementById("iLanguage")
    var transcript = event.results[0][0].transcript;
    console.log(transcript);
    document.getElementById("cLanguage").value = "en"
    iLanguage.value = transcript;
    convert();
};
   function speak() {  
    let target = document.getElementById("oLanguage").value;  
       var conLanguage = document.getElementById("conLanguage").value;
var msg = new SpeechSynthesisUtterance();
msg.lang = target;

msg.text = conLanguage;
window.speechSynthesis.speak(msg);
   }

async function convert(){
    var conLanguage = document.getElementById("conLanguage")
    let q = document.getElementById("iLanguage").value
    if(q.length == 0){
        return;
    }
    console.log(q)
    let source  = document.getElementById("cLanguage").value
    let target = document.getElementById("oLanguage").value;
    
    data ={
        q,
        source,
        target
    }
    data = JSON.stringify(data);
    
  let res = await fetch("https://libretranslate.de/translate", {
	method: "POST",
	body: data,
	headers: { "Content-Type": "application/json" }
});

let targetLanguage =  await res.json()
console.log(targetLanguage)
conLanguage.value = targetLanguage.translatedText;
}

var timerId;
function debounce(func,delay){
    if(timerId){
        clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
func()
    }, delay);
}