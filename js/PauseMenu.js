class PauseMenu {
    constructor({
        progress,
        onComplete
    }) {
        this.progress = progress;
        this.onComplete = onComplete;
    }

    getOptions(pageKey) {
        return [
                        {
                label: "Wznów",
                description: "Wróć do gry",
                handler: () => {
                    this.close();
                }
        },
            {
                label: "Zapisz",
                description: "Zapisz swój postęp",
                handler: () => {
                    this.progress.save();
                    this.close();
                }
        },
        {
                label: "Ustawienia",
                description: "Dostosuj grę pod siebie",
                handler: async () => {
                    let map = window.map;
                    await this.close();
                    const eventHandler = new OverworldEvent({map, event: {
                        type: "settings"
                    }});
                    await eventHandler.init();
                }
        },
        {
                label: "Wyjdź",
                description: "Opuść grę",
                handler: async () => {
                    window.map.startCutscene([
                        {
                        type: "decision",
                        handler: () => {document.location.reload(true);}
                        }
                    ]);
                }
        }
      ]
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("PauseMenu")
        this.element.innerHTML = (`
      <h2>Pauza</h2>
    `)
    }

   async close() {
        document.querySelector("canvas").style.filter = "none";
        document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: none; cursor: pointer;pointer-events: auto;";
        })
        this.esc.unbind();
        this.keyboardMenu.end();
        this.element.remove();
        this.onComplete();
    }

    async init(container) {
        this.createElement();
        this.keyboardMenu = new KeyboardMenu({
            descriptionContainer: container
        })
        this.keyboardMenu.init(this.element);
        this.keyboardMenu.setOptions(this.getOptions("root"));
        document.querySelector("canvas").style.filter = "blur(4px)";
        document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: blur(4px); cursor: default;pointer-events: none;";
        })
        container.appendChild(this.element);
        utils.wait(200);
        this.esc = new KeyPressListener("Escape", () => {
            if(window.page_hover){
            this.close();
            }
        });
    }

}
