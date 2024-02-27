class RevealingText {
    constructor(config){
        this.element = config.element;
        this.text = config.text;
        this.speed = config.speed || 50;
        this.timeout = null;
        this.isDone = false;
    }
    revealOneCharacter(list){
        const next = list.splice(0,1)[0];
         if(next.span.innerText == " " || next.span.innerText == "," || next.span.innerText == "."){
             document.querySelector("#audio_talking").pause();
         }else{
            if(document.querySelector("#audio_talking").src.slice(-18) == "audio/talking2.mp3"){
                const audio = document.querySelector("#audio_talking").cloneNode(true);
                audio.play();
                audio.volume = 0.5*window.sfx_volume;
             }else{
                const eventHandler = new OverworldEvent({type: "play_audio", audio: "talking", volume: 0.5});
                eventHandler.init();
             }
         }
        next.span.classList.add("revealed");
        if(list.length > 0){
            this.timeout = setTimeout(() => {
                this.revealOneCharacter(list)
            }, next.delayAfter)
        }
        else{
            this.isDone = true;
            document.querySelector("#audio_talking").pause();
        }
    }
    warpToDone(){
        document.querySelector("#audio_talking").pause();
        clearTimeout(this.timeout);
        this.isDone = true;
        this.element.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed");
        })
    }  
    init(){
        let characters = [];
        this.text.split("").forEach(character => {
            let span = document.createElement("span");
            span.textContent = character;
            this.element.appendChild(span);
            characters.push({span,delayAfter: character === " " ? 0 : this.speed});
        })   
        this.revealOneCharacter(characters);
    }
}