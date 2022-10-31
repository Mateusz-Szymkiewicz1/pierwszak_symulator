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
                label: "Zapisz",
                description: "Zapisz swój postęp",
                handler: () => {
                    this.progress.save();
                    this.close();
                }
        },
            {
                label: "Wznów",
                description: "Wróć do gry",
                handler: () => {
                    this.close();
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
        this.esc?.unbind();
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

        container.appendChild(this.element);
        utils.wait(200);
        this.esc = new KeyPressListener("Escape", () => {
            this.close();
        });
    }

}
