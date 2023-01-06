class Inventory {
    constructor({
        onComplete
    }, szafka) {
        this.onComplete = onComplete;
        this.szafka = szafka;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Inventory")
        this.element.innerHTML = (`
      <h2>Ekwipunek</h2><table><tr><td id="t1"><td id="t2"><td id="t3"><td id="t4"></tr><tr><td id="t5"><td id="t6"><td id="t7"><td id="t8"></tr><tr><td id="t9"><td id="t10"><td id="t11"><td id="t12"></tr><tr><td id="t13"><td id="t14"><td id="t15"><td id="t16"></tr></table>
    `)
    }
    
    check(){
        let this2 = this;
        document.querySelector(".Inventory").innerHTML = (`
      <h2>Ekwipunek</h2><table><tr><td id="t1"><td id="t2"><td id="t3"><td id="t4"></tr><tr><td id="t5"><td id="t6"><td id="t7"><td id="t8"></tr><tr><td id="t9"><td id="t10"><td id="t11"><td id="t12"></tr><tr><td id="t13"><td id="t14"><td id="t15"><td id="t16"></tr></table>
        `)
        window.heroInventory.forEach(e =>{
            for(let i = 1; i <= 16; i++){
                if(e.deleted || e.amount == 0 || e.tile){
                    break;
                 }
                if(document.querySelector("#t"+i).innerHTML == ""){
                    document.querySelector("#t"+i).innerHTML = `<img src="${e.src}" width="20px" height="20px">`;
                    document.querySelector("#t"+i).dataset.itemName = e.id;
                    e.tile = i;
                    break;
                }
            }
            if(e.tile && !e.deleted && e.amount != 0){
                document.querySelector("#t"+e.tile).innerHTML = `<img src="${e.src}" width="20px" height="20px">`;
                document.querySelector("#t"+e.tile).dataset.itemName = e.id;
            }
        });
         document.querySelectorAll(".Inventory td").forEach(el => {
           if(el.querySelector("img")){
               el.setAttribute("draggable", "true");
               el.addEventListener("dragstart", function(e){
                    e.dataTransfer.setData("item", e.target.dataset.itemName);
                    e.dataTransfer.setData("old_tile", parseInt(e.target.getAttribute("id").slice(1)));
                    e.dataTransfer.setData("parent", "inventory");
                   if(document.querySelector(".option_box")){
                       document.querySelector(".option_box").remove();
                    }
               })
           }else{
               el.addEventListener("dragover", function(e){
                   e.preventDefault();
               })
               el.addEventListener("drop", function(e){
                   let parent = e.dataTransfer.getData("parent");
                   if(parent == "inventory"){
                       let item = e.dataTransfer.getData("item");
                       let item2 = window.heroInventory.find(x=> x.id === item);
                       let new_tile_number = parseInt(e.target.getAttribute("id").slice(1));
                       let new_tile = document.querySelector("#t"+new_tile_number);
                       let old_tile = document.querySelector("#t"+e.dataTransfer.getData("old_tile"));
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
                  if(parent == "szafka"){
                      let item = e.dataTransfer.getData("item");
                       let item2 = window.szafka.find(x=> x.id === item);
                       let new_tile_number = parseInt(e.target.getAttribute("id").slice(1));
                       let new_tile = document.querySelector("#t"+new_tile_number);
                       let old_tile = document.querySelector("#s"+e.dataTransfer.getData("old_tile"));
                       old_tile.innerHTML = "";
                      old_tile.removeAttribute("data-item-name");
                       if(document.querySelector(".Inventory h3")){
                       document.querySelector(".Inventory h3").innerText = "";
                       }
                       if(document.querySelector(".Inventory span")){
                       document.querySelector(".Inventory span").innerText = "";
                       }
                      let obj_index = window.szafka.indexOf(item2);
                      window.szafka.splice(obj_index, 1);
                    window.heroInventory.push(item2);
                      let item3 = window.heroInventory.find(x=> x.id === item);
                      item3.tile = new_tile_number;
                       new_tile.innerHTML = `<img src="${item2.src}" width="20px" height="20px">`;
                       new_tile.dataset.itemName = item2.id;
                       this2.check();
                       window.current_szafka.check();
                  }
               })
           }
       })
    }

    close() {
        document.querySelector("canvas").style.filter = "none";
        utils.turn_hud_on();
        this.esc.unbind();
        this.esc2.unbind();
        this.element.remove();
        this.onComplete();
    }
        
   async init(container) {
        let this2 = this;
        this.createElement();
       if(!this.szafka){
        document.querySelector("canvas").style.filter = "blur(4px)";
        utils.turn_hud_off();
       }else{
           this.element.classList.add("szafka_inventory");
           window.current_inventory = this;
       }
        container.appendChild(this.element);
        this.check();
        utils.wait(200);
       if(!this.szafka){
        this.esc = new KeyPressListener("KeyE", () => {
            if(document.querySelector(".option_box")){
                document.querySelector(".option_box").remove();
            }
            this.close();
        })
        this.esc2 = new KeyPressListener("Escape", () => {
            if(document.querySelector(".option_box")){
                document.querySelector(".option_box").remove();
            }
            this.close();
        })
       }
        this2.element.addEventListener("mouseover", function(event){
            if((event.target.tagName == "TD" || event.target.className == "option_box") && event.target.dataset.itemName && !document.querySelector("h3")){
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
        });
        this2.element.addEventListener("mouseout", function(event){
            if(event.target.tagName == "TD" && event.target.dataset.itemName && document.querySelector("h3")){
               document.querySelector("h3").remove();
                document.querySelector(".Inventory span").remove();
            }
        });
       document.addEventListener("click", function(e){
           if(document.querySelector(".option_box") && e.target.tagName != "TD" && e.target.className != "option_box"){
                    document.querySelector(".option_box").remove();
                document.querySelectorAll("td").forEach(td =>{
                    td.removeAttribute("class");
                })
            }
       })
        this2.element.addEventListener("mouseup", async function(event){
            if(document.querySelector(".option_box")){
                    document.querySelector(".option_box").remove();
                document.querySelectorAll("td").forEach(td =>{
                    td.removeAttribute("class");
                })
            }
            let option_box = null;
            if(event.target.tagName == "TD" && event.target.dataset.itemName && (window.GameObjects.find(x=> x.id === event.target.dataset.itemName).use || window.GameObjects.find(x=> x.id === event.target.dataset.itemName).can_delete)){
                document.querySelectorAll("td").forEach(td =>{
                    td.removeAttribute("class");
                })
                if(document.querySelector(".option_box")){
                    document.querySelector(".option_box").remove();
                }
                event.target.setAttribute("class", "td_focus");
                option_box = document.createElement("div");
                option_box.setAttribute("class", "option_box");
                option_box.dataset.itemName = event.target.dataset.itemName;
                option_box.style.cssText = `position: absolute; top: ${event.clientY}px;left: ${event.clientX}px;`;
                document.body.appendChild(option_box);
                if(window.GameObjects.find(x=> x.id === event.target.dataset.itemName).use){
                option_box.innerHTML = `<span class="span_uzyj">Użyj</span>`;
                }
                else{
                    option_box.style.height = "60px";
                }
                if(window.GameObjects.find(x=> x.id === event.target.dataset.itemName).can_delete){
                option_box.innerHTML = option_box.innerHTML + `<span class="span_usun">Usuń</span>`;
                }
                if(window.GameObjects.find(x=> x.id === event.target.dataset.itemName).amount > 1){
                option_box.style.height = "170px";
                option_box.innerHTML = option_box.innerHTML + `<span class="span_usun_all">Usuń wszystkie</span>`;
                }
            }
            if(option_box != null){
            option_box.addEventListener("click", async function(event){
            if(event.target.className == "span_uzyj"){  
                let obj = window.GameObjects.find(x=> x.id === event.target.parentElement.dataset.itemName);
                let map = window.map;
                let use_req = obj.use_req;
                if(eval(use_req)){
                window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).amount--;
                let eventConfig = obj.use;
                for await (const ev of eventConfig){
                    const eventHandler = new OverworldEvent({map, event: ev});
                    await eventHandler.init();
                }
                if(window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).amount == 0){
                    window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).deleted = true;
                    eventConfig.unshift({
                         type: "textMessage",
                         text: `Zużyłeś ${obj.id}!`
                     })
                    for await (const ev of eventConfig){
                        const eventHandler = new OverworldEvent({map, event: ev});
                        await eventHandler.init();
                    }  
                    if(document.querySelector(".Inventory")){
                        this2.check();
                    }
                }
                }
                else{
                    let use_req_text = obj.use_req_text;
                    const eventHandler = new OverworldEvent({map, event: {
                        type: "textMessage",
                        text: use_req_text
                    }});
                    eventHandler.init();
                }
            }
             if(event.target.className == "span_usun_all"){  
                 const eventHandler = new OverworldEvent({map, event:{
                        type: "decision",
                        handler: () => {
                            window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).deleted = true;
                            if(document.querySelector(".Inventory")){
                            this2.check();
                            }
                        }
                    }});
                eventHandler.init();
            }
             if(event.target.className == "span_usun"){  
                 window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).amount--;
                 if(window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).amount == 0){
                     window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).deleted = true;
                 }
                if(document.querySelector(".Inventory")){
                    this2.check();
                }
            }                   
            })
            }
        });
       window.addEventListener("resize", function(){
         if(document.querySelector(".option_box")){
             document.querySelector(".option_box").remove();
             document.querySelectorAll("td").forEach(td =>{
                    td.removeAttribute("class");
                })
         }  
       })
    }

}
