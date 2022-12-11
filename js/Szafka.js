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
        if(!document.querySelector("#audio_locker").paused){
            document.querySelector("#audio_locker").pause();
            document.querySelector("#audio_locker").currentTime = 0;
        }
        document.querySelector("canvas").style.filter = "none";
        document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: none; cursor: pointer;pointer-events: auto;";
        })
        if(document.querySelector(".option_box")){
            document.querySelector(".option_box").remove();
        }
        document.querySelector(".Inventory").remove();
        this.element.remove();
        this.esc.unbind();
        this.onComplete();
    }
        
   async init(container) {
        let this2 = this;
        this.createElement();
        document.querySelector("canvas").style.filter = "blur(4px)";
        document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: blur(4px); cursor: default;pointer-events: none;";
        })
       let audio_locker = document.querySelector("#audio_locker");
        audio_locker.volume = 0.4;
        audio_locker.play();
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
       function shift_click_listen(e){
           if(e.target.tagName == "TD" && e.target.dataset.nameBackup){
            let obj = window.GameObjects.find(x=> x.id === e.target.dataset.nameBackup);
               window.heroInventory.find(x=> x.id === e.target.dataset.nameBackup).deleted = true;
            window.szafka.push(obj);
               console.log(window.szafka)
           e.target.innerHTML = "";
           e.target.removeAttribute("data-item-name");
           e.target.removeAttribute("data-name-backup");
           if(document.querySelector(".Inventory h3")){
               document.querySelector(".Inventory h3").remove();
           }
           if(document.querySelector(".Inventory span")){
               document.querySelector(".Inventory span").remove();
           }
           }
       }
      document.addEventListener("keydown", function shift_listen(e){
          document.querySelectorAll(".Inventory td").forEach(el => {
              if(el.dataset.itemName){
                  el.dataset.nameBackup = el.dataset.itemName;
                  el.removeAttribute("data-item-name");
              }
          })
          if(e.repeat){
              return;
          }
           if(e.code == "ShiftLeft"){
              document.querySelector(".Inventory").addEventListener("click", shift_click_listen)
           }
       })
       document.addEventListener("keyup", function shift_listen(e){
           document.querySelectorAll(".Inventory td").forEach(el => {
              if(el.dataset.nameBackup){
                  el.dataset.itemName = el.dataset.nameBackup;
                  el.removeAttribute("data-name-backup");
              }
          })
           if(e.code == "ShiftLeft"){
                document.querySelector(".Inventory").removeEventListener("click", shift_click_listen)
           }
       })
    }

}
