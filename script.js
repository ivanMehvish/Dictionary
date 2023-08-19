let b1=document.getElementById("b1")
b1.style.opacity=0;
var srchbtn=document.getElementById("srchbtn");
srchbtn.addEventListener("click",valueFetch);
var wd=document.getElementById("word");
var audi=document.getElementById("audio");
var meaning=document.getElementById("meaning");
var error=document.getElementById("err");
var sound;
var s_url;
var list= document.getElementById("mean");
var phonetic=document.getElementById("phonetic");
//typewriting
var x = 0;
var txt = 'For all your Language doubts';
var speed = 5;
var divel=document.getElementById("demo");
var messageArray;
//
//fetches from input box and resets divs, calls getapi()

function valueFetch(){
srchbtn.removeEventListener("click",valueFetch);
b1.style.opacity=100;
list.innerText="";
phonetic.innerText="";
error.innerText="";
 var word=f1.v.value;
 wd.innerText=word;
 var url_api=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
 getapi(url_api);
 
}

//
async function show(data){
 
   if(data.message!="" && data.message!=undefined)
   {

        txt=data.message;
        divel=error;
        typeWriter();
        srchbtn.addEventListener("click",valueFetch);
        return;
   }
  
    // meaning.innerText=data[0].meanings[0].definitions[0].definition;
    // document.getElementById("pos").innerText=data[0].meanings[0].partOfSpeech;
    // var s_url=data[0].phonetics[0].audio;
    // sound=new Audio(s_url); 
    let phon=data[0].phonetics.length;
    for(g=0; g<phon; ++g)
    {
        if(data[0].phonetics[g].text!=undefined)
        {
            let p1=document.createElement("div");
            p1.innerText=data[0].phonetics[g].text;
            // console.log(data[0].phonetics[g].text);
            phonetic.appendChild(p1);
            break;
        }
    }
    for(g=0; g<phon; ++g)
    {
        if(data[0].phonetics[g].audio!=undefined && data[0].phonetics[g].audio!="")
        {
            s_url=data[0].phonetics[g].audio;
            sound=new Audio(s_url);
            break;
        }
    }
    audi.addEventListener("click",Splay);
    let m=data[0].meanings.length;
  for(j=0; j<m; ++j){

     
    let n=data[0].meanings[j].definitions.length;
    let p=document.createElement("div");
    p.classList.add('font-bold');
    p.innerText=data[0].meanings[j].partOfSpeech;
    list.appendChild(p);

    messageArray=data[0].meanings[j].definitions;
    
        for(v=0; v<messageArray.length; v++)
        {
          let li=document.createElement("div")
        //   li.setAttribute("id",`${v}`);
          list.appendChild(li);
        //   op=document.getElementById(`${v}`);
          // console.log(li);
         textposition=0;
        await typewriter2(v,messageArray,li);
        }  
 
 }


srchbtn.addEventListener("click",valueFetch);
}

function Splay(){
    sound.play();
    
}


//function to fetch from api.
async function getapi(url_api){
    sound="";
     // Storing response
    const response = await fetch(url_api);

    // Storing data in form of JSON
    var data = await response.json();

    console.log(data);
    
    show(data);
    
 
   
}

function typeWriter() {
    if (x < txt.length) {
      divel.innerHTML += txt.charAt(x);
      x++;
      setTimeout(typeWriter, speed);
    }
    if(x==txt.length) return;
}

async function typewriter2(i,messageArray,k) {
    let count=0;
    var def=`• `+ messageArray[i].definition;
    k.innerHTML=def.substring(0,textposition)+" ";
    let currentPosition=0;

  while (currentPosition <= def.length) {
  k.innerHTML = def.substring(0, currentPosition) + " ";
  await new Promise(resolve => setTimeout(resolve, speed));
  currentPosition++;
}
}



// typeWriter();


// fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

//API


