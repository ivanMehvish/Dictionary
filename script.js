let b1 = document.getElementById("b1");
b1.style.opacity = 0;
var srchbtn = document.getElementById("srchbtn");
srchbtn.addEventListener("click", valueFetch);
var wd = document.getElementById("word");
var audi = document.getElementById("audio");
var meaning = document.getElementById("meaning");
var error = document.getElementById("err");
var sound;
var s_url;
var list = document.getElementById("mean");
var phonetic = document.getElementById("phonetic");
var divel = document.getElementById("typewrite");

var txt = 'For all your Language doubts';
var speed = 5; // Speed of typewriting
var messageArray;

function valueFetch(event) {
    srchbtn.removeEventListener("click", valueFetch);
    b1.style.opacity = 1;
    list.innerText = "";
    phonetic.innerText = "";
    error.innerText = "";
    var word = f1.v.value;
    wd.innerText = word;
    var url_api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    getapi(url_api);
}

// Display data from the API
async function show(data) {
    if (data.message && data.message !== "") {
        error.innerText = data.message;
        srchbtn.addEventListener("click", valueFetch);
        return;
    }

    // Fetch phonetics
    for (let i = 0; i < data[0].phonetics.length; ++i) {
        if (data[0].phonetics[i].text) {
            let phoneticText = document.createElement("div");
            phoneticText.innerText = data[0].phonetics[i].text;
            phoneticText.classList.add('text-gray-600');
            phonetic.appendChild(phoneticText);
            break;
        }
    }

    // Fetch audio
    for (let i = 0; i < data[0].phonetics.length; ++i) {
        if (data[0].phonetics[i].audio) {
            s_url = data[0].phonetics[i].audio;
            sound = new Audio(s_url);
            break;
        }
    }
    audi.addEventListener("click", Splay);

    // Fetch meanings and add to list
    for (let j = 0; j < data[0].meanings.length; ++j) {
        let pos = document.createElement("div");
        pos.classList.add('font-bold', 'text-lg', 'text-gray-800');
        pos.innerText = data[0].meanings[j].partOfSpeech;
        list.appendChild(pos);

        messageArray = data[0].meanings[j].definitions;
        for (let k = 0; k < messageArray.length; k++) {
            let defElement = document.createElement("div");
            defElement.classList.add('text-gray-700', 'pl-4');
            list.appendChild(defElement);
            await typewriter2(messageArray[k].definition, defElement);  // Pass the definition text and element
        }
    }
    srchbtn.addEventListener("click", valueFetch);
}

function Splay() {
    if (sound) sound.play();
}

// Fetch data from the API
async function getapi(url_api) {
    sound = "";
    const response = await fetch(url_api);
    const data = await response.json();
    console.log(data);
    show(data);
}

// Typewriter effect for definitions
async function typewriter2(text, element) {
    let currentPosition = 0;
    element.innerHTML = "";  // Clear previous content
    element.innerHTML += '*';
    while (currentPosition < text.length) {
        element.innerHTML += text.charAt(currentPosition);
        currentPosition++;
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}
