class TitleScreen {
    constructor({
        progress
    }) {
        this.progress = progress;
    }

    getOptions(resolve) {
        const safeFile = this.progress.getSaveFile();
        return [
            {
                label: "Nowa gra",
                description: "Rozpocznij przygodę",
                handler: () => {
                    this.close();
                    resolve();
                }
      },
      safeFile ? {
                label: "Kontynuuj grę",
                description: "Wróć do ostaniego zapisu",
                handler: () => {
                    this.close();
                    resolve(safeFile);
                }
      } : null
    ].filter(v => v);
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TitleScreen");
        this.element.innerHTML = (`
      <h1>Pierwszak Symulator</h1>
    `)

    }

    close() {
        this.keyboardMenu.end();
        this.element.remove();
    }

    init(container) {
        return new Promise(resolve => {
            this.createElement();
            container.appendChild(this.element);
            this.keyboardMenu = new KeyboardMenu();
            this.keyboardMenu.init(this.element);
            this.keyboardMenu.setOptions(this.getOptions(resolve))
        })
    }

}
