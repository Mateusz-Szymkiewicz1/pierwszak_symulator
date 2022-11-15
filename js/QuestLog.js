class QuestLog{
    constructor({onComplete}) {
        this.onComplete = onComplete;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("QuestLog")
        this.element.innerHTML = `<h2>Questy</h2>`;
    }
    
    close() {
        document.querySelector("canvas").style.filter = "brightness(1)";
        document.querySelector(".health_bar").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".gold img").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".gold span").style = "filter: brightness(1);cursor:pointer;";
        document.querySelector(".quest_button").innerText = '!';
        document.querySelector(".quest_button").style.paddingTop = "1px";
       document.querySelector(".quest_button").style.height = "20px";
        this.element.remove();
        this.esc.unbind();
        this.onComplete();
    }
        
   async init(container) {
       document.querySelector(".quest_button").innerText = 'x';
       document.querySelector(".quest_button").style.paddingTop = "0px";
       document.querySelector(".quest_button").style.height = "21px";
       
        let this2 = this;
        this.createElement();
        document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelector(".health_bar").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold img").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold span").style = "filter: brightness(0.2);cursor:default;";
        container.appendChild(this.element);
       utils.wait(200)
       this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
    }

}
