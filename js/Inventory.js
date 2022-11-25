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
        window.heroInventory.forEach(e =>{
            for(let i = 1; i <= 16; i++){
                if(e.deleted || e.amount == 0){
                    continue;
                 }
                if(document.querySelector("#t"+i).innerHTML == ""){
                    document.querySelector("#t"+i).innerHTML = `<img src="${e.src}" width="20px" height="20px">`;
                    document.querySelector("#t"+i).dataset.itemName = e.id;
                    break;
                }
            }
        });
    }

    close() {
        document.querySelector("canvas").style.filter = "brightness(1)";
        document.querySelector(".health_bar").style = "filter: brightness(1);cursor:pointer;pointer-events:auto;";
        document.querySelector(".quest_button").style= "filter: brightness(1);cursor:pointer;pointer-events:auto;";
        document.querySelector(".gold img").style= "filter: brightness(1);cursor:pointer;pointer-events:auto;";
        document.querySelector(".gold span").style= "filter: brightness(1);cursor:pointer;";
        this.esc.unbind();
        this.esc2.unbind();
        this.element.remove();
        this.onComplete();
    }
        
   async init(container) {
        let this2 = this;
        this.createElement();
       if(!this.szafka){
        document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelector(".health_bar").style = "filter: brightness(0.2); cursor: default;pointer-events: none;";
        document.querySelector(".quest_button").style = "filter: brightness(0.2);cursor:default; pointer-events:none;";
        document.querySelector(".gold span").style = "filter: brightness(0.2);cursor:default;";
        document.querySelector(".gold img").style = "filter: brightness(0.2);cursor:default;pointer-events:none;";
       }else{
           this.element.classList.add("szafka_inventory");
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
        document.addEventListener("mouseover", function(event){
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
        document.addEventListener("mouseout", function(event){
            if(event.target.tagName == "TD" && event.target.dataset.itemName && document.querySelector("h3")){
               document.querySelector("h3").remove();
                document.querySelector(".Inventory span").remove();
            }
        });
        document.addEventListener("mouseup", async function(event){
            if(event.target.tagName == "TD" && event.target.dataset.itemName && (window.GameObjects.find(x=> x.id === event.target.dataset.itemName).use || window.GameObjects.find(x=> x.id === event.target.dataset.itemName).can_delete)){
                let td = document.querySelectorAll("td");
                td.forEach(td =>{
                    td.removeAttribute("class");
                })
                if(document.querySelector(".option_box")){
                    document.querySelector(".option_box").remove();
                }
                event.target.setAttribute("class", "td_focus");
                let option_box = document.createElement("div");
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
            }
            else if(event.target.tagName != "TD" && event.target.className != "option_box"){
                let td = document.querySelectorAll("td");
                td.forEach(td =>{
                    td.removeAttribute("class");
                })
                if(document.querySelector(".option_box")){
                    document.querySelector(".option_box").remove();
                }
            }
            if(event.target.className == "span_uzyj"){  
                let obj = window.GameObjects.find(x=> x.id === event.target.parentElement.dataset.itemName);
                let map = window.map;
                let use_req = obj.use_req;
                if(eval(use_req)){
                window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).amount--;
                let eventConfig = obj.use;
                await eventConfig.forEach(async (e) => {
                    const eventHandler = new OverworldEvent({map, event: e});
                    await eventHandler.init();
                })
                if(window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).amount == 0){
                     const eventHandler2 = new OverworldEvent({map, event: {
                         type: "textMessage",
                         text: `Zużyłeś ${obj.id}!`
                     }});
                    await eventHandler2.init();
                    let eventConfig = obj.use;
                    await eventConfig.forEach(async (e) => {
                    const eventHandler = new OverworldEvent({map, event: e});
                    await eventHandler.init();
                })
                    document.querySelector(".Inventory").remove();
                    this2.createElement();
                    document.querySelector(".game-container").appendChild(this2.element);
                    this2.check();
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
             if(event.target.className == "span_usun"){  
                 const eventHandler = new OverworldEvent({map, event:{
                        type: "decision",
                        handler: () => {
                            window.heroInventory.find(x=> x.id === event.target.parentElement.dataset.itemName).deleted = true;
                            document.querySelector(".Inventory").remove();
                            this2.createElement();
                            document.querySelector(".game-container").appendChild(this2.element);
                            this2.check();
                        }
                    }});
                eventHandler.init();
            }
        });
    }

}
