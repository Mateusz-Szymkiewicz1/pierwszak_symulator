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
       this.element.innerHTML = `<h2>Ustawienia</h2><h3>Rozmiar okna</h3><label>min</label><input type="range" list="dl" value="25" max="40" min="10"><label>max</label><datalist id="dl"><option>0</option><option>10</option><option>20</option><option>30</option><option>40</option></datalist>`;
        document.querySelector(".game-container").appendChild(this.element);
       utils.wait(200);
       this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
       document.querySelector(".settings > input[type=range]").addEventListener("change", function(){
           let skala = document.querySelector(".settings > input[type=range]").value/10;
           console.log(skala)
           document.querySelector(".game-container").style.transform = `scale(${skala}) translateY(39%)`;
       })
   }

}
