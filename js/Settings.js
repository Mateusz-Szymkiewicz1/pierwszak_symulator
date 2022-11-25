class Settings{
    constructor({
        onComplete
    }) {
        this.onComplete = onComplete;
    }
    
    close() {
        this.esc.unbind();
        this.element.remove();
        this.onComplete();
    }
    
   async init() {
       document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelector(".health_bar").style = "filter: brightness(0.2); cursor: default;pointer-events: none;";
        document.querySelector(".quest_button").style = "filter: brightness(0.2);cursor:default; pointer-events:none;";
        document.querySelector(".gold span").style = "filter: brightness(0.2);cursor:default;";
        document.querySelector(".gold img").style = "filter: brightness(0.2);cursor:default;pointer-events:none;";
           let quest_popups = document.querySelectorAll(".QuestPopup");
        quest_popups.forEach(el => {
            el.style.filter = "brightness(0.2)";
            el.style.cursor = "default";
            el.style.pointerEvents = "none";
        })
        let this2 = this;
        this.element = document.createElement("div");
        this.element.classList.add("settings");
       this.element.innerHTML = `<h2>Ustawienia</h2>`;
        document.querySelector(".game-container").appendChild(this.element);
       utils.wait(200);
       this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
   }

}
