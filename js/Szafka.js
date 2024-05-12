class Szafka{
    constructor({onComplete}){
        this.onComplete = onComplete;
    }
    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Szafka")
        this.element.innerHTML = `<h2>Szafka</h2><table><tr><td id="s1"></td><td id="s2"></td><td id="s3"></td><td id="s4"></td></tr><tr><td id="s5"></td><td id="s6"></td><td id="s7"></td><td id="s8"></td></tr><tr><td id="s9"></td><td id="s10"></td><td id="s11"></td><td id="s12"></td></tr><tr><td id="s13"></td><td id="s14"></td><td id="s15"></td><td id="s16"></td></tr></table>`;
    }   
    check(){
        let this2 = this;
        this.element.innerHTML = `<h2>Szafka</h2><table><tr><td id="s1"></td><td id="s2"></td><td id="s3"></td><td id="s4"></td></tr><tr><td id="s5"></td><td id="s6"></td><td id="s7"></td><td id="s8"></td></tr><tr><td id="s9"></td><td id="s10"></td><td id="s11"></td><td id="s12"></td></tr><tr><td id="s13"></td><td id="s14"></td><td id="s15"></td><td id="s16"></td></tr></table>`;
        window.szafka.forEach(e =>{
            for(let i = 1; i <= 16; i++){
                if(e.deleted || e.amount == 0 || e.tile){
                    break;
                 }
                if(document.querySelector("#s"+i).innerHTML == ""){
                    document.querySelector("#s"+i).innerHTML = `<img src="${e.src}" width="20px" height="20px">`;
                    document.querySelector("#s"+i).dataset.itemName = e.id;
                    e.tile = i;
                    break;
                }
            }
            if(e.tile){
                document.querySelector("#s"+e.tile).innerHTML = `<img src="${e.src}" width="20px" height="20px">`;
                document.querySelector("#s"+e.tile).dataset.itemName = e.id;
            }
        });
        document.querySelectorAll(".Szafka td").forEach(el => {
           if(el.querySelector("img")){
               el.setAttribute("draggable", "true");
               el.addEventListener("dragstart", function(e){
                    e.dataTransfer.setData("item", e.target.dataset.itemName);
                    e.dataTransfer.setData("old_tile", parseInt(e.target.getAttribute("id").slice(1)));
                    e.dataTransfer.setData("parent", "szafka");
               })
           }else{
               el.addEventListener("dragover", function(e){
                   e.preventDefault();
               })
               el.addEventListener("drop", function(e){
                   let parent = e.dataTransfer.getData("parent");
                   if(parent == "szafka"){
                       let item = e.dataTransfer.getData("item");
                       let item2 = window.szafka.find(x=> x.id === item);
                       let new_tile_number = parseInt(e.target.getAttribute("id").slice(1));
                       let new_tile = document.querySelector("#s"+new_tile_number);
                       let old_tile = document.querySelector("#s"+e.dataTransfer.getData("old_tile"));
                       old_tile.innerHTML = "";
                       old_tile.removeAttribute("data-item-name");
                       if(document.querySelector(".Inventory h3")){
                          document.querySelector(".Inventory h3").innerText = "";
                       }
                       if(document.querySelector(".Inventory span")){
                          document.querySelector(".Inventory span").innerText = "";
                       }
                       item2.tile = new_tile_number;
                       new_tile.innerHTML = `<img src="${item2.src}" width="20px" height="20px">`;
                       new_tile.dataset.itemName = item2.id;
                       this2.check();
                   }
                  if(parent == "inventory" && e.dataTransfer.getData("item") != 'Klucz_Szafka'){
                       let item = e.dataTransfer.getData("item");
                       let item2 = window.heroInventory.find(x=> x.id === item);
                       let new_tile_number = parseInt(e.target.getAttribute("id").slice(1));
                       let new_tile = document.querySelector("#s"+new_tile_number);
                       let old_tile = document.querySelector("#t"+e.dataTransfer.getData("old_tile"));
                       old_tile.innerHTML = "";
                       old_tile.removeAttribute("data-item-name");
                       if(document.querySelector(".Inventory h3")){
                          document.querySelector(".Inventory h3").innerText = "";
                       }
                       if(document.querySelector(".Inventory span")){
                          document.querySelector(".Inventory span").innerText = "";
                       }
                       let obj_index = window.heroInventory.indexOf(item2);
                       window.heroInventory.splice(obj_index, 1);
                       window.szafka.push(item2);
                       let item3 = window.szafka.find(x=> x.id === item);
                       item3.tile = new_tile_number;
                       new_tile.innerHTML = `<img src="${item2.src}" width="20px" height="20px">`;
                       new_tile.dataset.itemName = item2.id;
                       this2.check();
                       window.current_inventory.check();
                  }
               })
           }
       })
    }
    close() {
        if(!document.querySelector("#audio_locker").paused){
            document.querySelector("#audio_locker").pause();
            document.querySelector("#audio_locker").currentTime = 0;
        }
        document.querySelector("canvas").style.filter = "none";
        utils.turn_hud_on();
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
        window.current_szafka = this;
        this.createElement();
        document.querySelector("canvas").style.filter = "blur(4px)";
        utils.turn_hud_off();
        const eventHandler2 = new OverworldEvent({type: "play_audio", audio: "locker", volume: 0.4});
        eventHandler2.init();
        container.appendChild(this.element);
        this.check();
        utils.wait(200);
        this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
        const eventHandler = new OverworldEvent({type: "inventory",szafka: true});
        eventHandler.init();
        function shift_click_listen(e){
           if(e.target.tagName == "TD" && e.target.dataset.nameBackup && e.target.parentElement.parentElement.parentElement.parentElement.classList == "Inventory szafka_inventory" && e.target.dataset.nameBackup != "Klucz_Szafka"){
                let obj = window.heroInventory.find(x=> x.id === e.target.dataset.nameBackup);
                obj.tile = 0;
                let obj_index = window.heroInventory.indexOf(obj);
                window.heroInventory.splice(obj_index, 1);
                window.szafka.push(obj);
                window.current_inventory.check();
                this2.check();
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
           if(e.target.tagName == "TD" && e.target.dataset.nameBackup && e.target.parentElement.parentElement.parentElement.parentElement.classList == "Szafka"){
                let obj = window.szafka.find(x=> x.id === e.target.dataset.nameBackup);
                obj.tile = 0;
                let obj_index = window.szafka.indexOf(obj);
                window.szafka.splice(obj_index, 1);
                window.heroInventory.push(obj);
                window.current_inventory.check();
                this2.check();
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
          document.querySelectorAll("td").forEach(el => {
              if(el.dataset.itemName){
                  el.dataset.nameBackup = el.dataset.itemName;
                  el.removeAttribute("data-item-name");
              }
          })
          if(e.repeat){
              return;
          }
          if(e.code == "ShiftLeft"){
             document.addEventListener("click", shift_click_listen)
          }
       })
       document.addEventListener("keyup", function shift_listen(e){
           document.querySelectorAll("td").forEach(el => {
              if(el.dataset.nameBackup){
                  el.dataset.itemName = el.dataset.nameBackup;
                  el.removeAttribute("data-name-backup");
              }
          })
          if(e.code == "ShiftLeft"){
                document.removeEventListener("click", shift_click_listen)
          }
       })
       this.element.addEventListener("mouseover", function(e){
           if(e.target.tagName == "TD" && e.target.dataset.itemName && !document.querySelector(".Inventory h3")){
               let eq_h3 = document.createElement("h3");
               eq_h3.innerText = event.target.dataset.itemName;
               if(window.GameObjects.find(x=> x.id === event.target.dataset.itemName).amount){
                    eq_h3.innerHTML = eq_h3.innerHTML +" (" +window.GameObjects.find(x=> x.id === event.target.dataset.itemName).amount+")";
               }
               document.querySelector(".Inventory").appendChild(eq_h3);
               let eq_span = document.createElement("span");
               eq_span.innerText = window.GameObjects.find(x=> x.id === event.target.dataset.itemName).desc;
               document.querySelector(".Inventory").appendChild(eq_span);
           }
       })
       this.element.addEventListener("mouseout", function(e){
           if(event.target.tagName == "TD" && event.target.dataset.itemName && document.querySelector(".Inventory h3")){
               document.querySelector(".Inventory h3").remove();
               document.querySelector(".Inventory span").remove();
           }
       })
    }
}