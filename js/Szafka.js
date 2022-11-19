class Szafka{
    constructor({onComplete}) {
        this.onComplete = onComplete;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Szafka")
        this.element.innerHTML = `<h2>Szafka</h2><table><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td></tr></table>`;
    }
    
    close() {
        document.querySelector("canvas").style.filter = "brightness(1)";
        document.querySelector(".health_bar").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".gold img").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".gold span").style = "filter: brightness(1);cursor:pointer;";
        document.querySelector(".quest_button").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".Inventory").remove();
        this.element.remove();
        this.esc.unbind();
        this.onComplete();
    }
        
   async init(container) {
        let this2 = this;
        this.createElement();
        document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelector(".health_bar").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold img").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold span").style = "filter: brightness(0.2);cursor:default;";
        document.querySelector(".quest_button").style = "filter: brightness(0.2);cursor:default;pointer-events:none;";
        container.appendChild(this.element);
       utils.wait(200);
       this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
       let map = window.map;
       const eventHandler = new OverworldEvent({map, event: {
           type: "inventory",
           szafka: true,
       }});
       eventHandler.init();
    }

}
