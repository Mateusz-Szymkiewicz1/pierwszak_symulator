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
                    if(window.localStorage.getItem("saveFile")){
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
                    let audio_start = document.querySelector("#audio_start");
                           audio_start.volume = 0.2;
                           audio_start.play();
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
                let audio_settings_close = document.querySelector("#audio_settings_close");
                   audio_settings_close.volume = 0.2;
                   audio_settings_close.play();
                document.querySelector(".settings").remove();
                 document.querySelector("canvas").style.filter = "none";
                 document.querySelector(".TitleScreen>*").setAttribute('style', 'filter: none');
             document.querySelector(".DescriptionBox").setAttribute('style', 'filter: none');
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
