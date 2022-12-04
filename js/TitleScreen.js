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
                    if(window.localStorage.getItem("rpg_savefile1")){
                     const eventHandler = new OverworldEvent({event:{
                        type: "decision",
                        handler: () => {
                            this.close();
                            resolve();
                        }
                    }});
                    eventHandler.init();
                    }
                    else{
                        this.close();
                            resolve();
                    }
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
      <div class="settings_icon"><img src="./images/settings.png" height="12px" width="12px"></div>
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
            document.querySelector(".settings_icon").addEventListener("click", function(){
            if(document.querySelector(".settings")){
                document.querySelector(".settings").remove();
                 document.querySelector("canvas").style.filter = "brightness(1)";
                 document.querySelector(".TitleScreen>*").setAttribute('style', 'filter: brightness(1)');
             document.querySelector(".DescriptionBox").setAttribute('style', 'filter: brightness(1)');
            }else{
            let map = window.map;
            const eventHandler = new OverworldEvent({map, event: {
                type: "settings"
            }});
            eventHandler.init();
             document.querySelector(".TitleScreen>*").setAttribute('style', 'filter: brightness(0.5)');
             document.querySelector(".DescriptionBox").setAttribute('style', 'filter: brightness(0.5)');
            }
            })
            this.keyboardMenu.setOptions(this.getOptions(resolve))
        })
    }

}
