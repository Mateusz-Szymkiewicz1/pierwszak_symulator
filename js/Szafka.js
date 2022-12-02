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
        document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: brightness(1); cursor: pointer;pointer-events: auto;";
        })
        document.querySelector(".Inventory").remove();
        this.element.remove();
        this.esc.unbind();
        this.onComplete();
    }
        
   async init(container) {
        let this2 = this;
        this.createElement();
        document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: brightness(0.2); cursor: default;pointer-events: none;";
        })
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
