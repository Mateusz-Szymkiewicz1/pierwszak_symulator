class TextMessage{
    constructor({text,npc,onComplete}){
        this.text = text;
        this.npc = npc || null;
        this.portrait = null;
        this.title = null;
        if(window.NPCs.find(x=> x.id === this.npc)){
            this.portrait = window.NPCs.find(x=> x.id === this.npc).portrait;
            this.title = window.NPCs.find(x=> x.id === this.npc).title;
        }
        this.onComplete = onComplete;
        this.element = null;
    }
    
    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");
        if(this.portrait == null){
        this.element.innerHTML = `
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Dalej</button>
            `;
        }else{
            this.element.classList.add("TextMessage_big");
            this.element.innerHTML = `
            <img src="./images/portraits/${this.portrait}">
            <p class="TextMessage_p"></p><br/>
            <span class="npc_title">${this.title}</span>
            <button class="TextMessage_button">Dalej</button>
            `;
        }
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text          
        })
        
        this.element.querySelector("button").addEventListener("click", () => {
            this.done();
        });
        
        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
        })
    }
    
    done(){
        if(this.revealingText.isDone){
         this.element.remove();
        this.actionListener.unbind();
        this.onComplete();
        }
       else{
           this.revealingText.warpToDone();
       }
    }
    
    init(container){
        this.createElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }
}