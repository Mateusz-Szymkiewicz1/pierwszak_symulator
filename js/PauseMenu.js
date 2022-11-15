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

    close() {
        document.querySelector("canvas").style.filter = "brightness(1)";
        document.querySelector(".health_bar").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".quest_button").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".gold span").style = "filter: brightness(1);cursor:pointer;";
        document.querySelector(".gold img").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
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
        document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelector(".health_bar").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".quest_button").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold img").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold span").style = "filter: brightness(0.2);cursor:default;";
        container.appendChild(this.element);
        utils.wait(200);
        this.esc = new KeyPressListener("Escape", () => {
            this.close();
        });
    }

}
