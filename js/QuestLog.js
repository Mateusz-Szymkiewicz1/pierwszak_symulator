class QuestLog{
    constructor({onComplete}) {
        this.onComplete = onComplete;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("QuestLog")
        this.element.innerHTML = `<h2>Questy</h2>`;
    }
    
    add_quest(quest){
        quest.progress = 0;
        if(!quest.reward){
            quest.reward = "";
        }
        window.quests.push(quest);
        const popup = document.createElement("div");
        popup.classList.add("QuestPopup");
        popup.classList.add("quest_added");
        popup.innerHTML = `<h2>Nowy Quest!</h2><span>${quest.desc}</span>`;
        if(document.querySelector(".QuestPopup")){
            popup.style.bottom = "60px";
        }
        document.querySelector(".game-container").appendChild(popup);
        const timeout = setTimeout(function(){
            popup.style.opacity = "0";
            popup.style.pointerEvents = "none";
        }, 5000)
        const timeout2 = setTimeout(function(){
            popup.remove();
            if(document.querySelector(".QuestPopup")){
                document.querySelector(".QuestPopup").style.bottom = "6px";
            }
        }, 5100);
        popup.addEventListener("click", function(){
            clearTimeout(timeout);
            clearTimeout(timeout2);
            popup.style.opacity = "0";
            popup.style.pointerEvents = "none";
            setTimeout(function(){
                popup.remove();
                if(document.querySelector(".QuestPopup")){
                document.querySelector(".QuestPopup").style.bottom = "6px";
                }
            }, 200)
        })
    }
    
    end_quest(id){
        let quest = {};
        window.quests.forEach(e => {
            if(e.id == id){
                quest = e;
                e.progress = 1;
                if(e.reward){
                let gold = new Gold();
                gold.add(e.reward);
                }
            }
        })
        const popup = document.createElement("div");
        popup.classList.add("QuestPopup");
        popup.classList.add("quest_ended");
        if(quest.reward){
            popup.innerHTML = `<h2>Wykonano Questa!</h2><span>${quest.desc}<br />Nagroda : ${quest.reward}</span>`;
        }else{
        popup.innerHTML = `<h2>Wykonano Questa!</h2><span>${quest.desc}</span>`;
        }
        if(document.querySelector(".QuestPopup")){
            popup.style.bottom = "60px";
        }
        document.querySelector(".game-container").appendChild(popup);
        const timeout = setTimeout(function(){
            popup.style.opacity = "0";
            popup.style.pointerEvents = "none";
        }, 5000)
        const timeout2 = setTimeout(function(){
            popup.remove();
            if(document.querySelector(".QuestPopup")){
                document.querySelector(".QuestPopup").style.bottom = "6px";
            }
        }, 5100);
        popup.addEventListener("click", function(){
            clearTimeout(timeout);
            clearTimeout(timeout2);
            popup.style.opacity = "0";
            popup.style.pointerEvents = "none";
            setTimeout(function(){
                popup.remove();
                if(document.querySelector(".QuestPopup")){
                document.querySelector(".QuestPopup").style.bottom = "6px";
            }
            }, 200)
        })
    }
    
    check(){
        this.element = document.querySelector(".QuestLog");
        this.element.innerHTML = `<h2>Questy</h2>`;
        let counter = 0;
        window.quests.forEach(e => {
            if(e.progress == 0){
                counter++;
            if(e.deletable){
                this.element.innerHTML = this.element.innerHTML+`<h3>${e.id}<p data-questid="${e.id}">X</p><p>${e.reward}G</p></h3><br><br/><span>${e.desc}</span>`;
            }else{
            this.element.innerHTML = this.element.innerHTML+`<h3>${e.id}</h3><br/><br/><span>${e.desc}</span>`;
            }
            }
        })
        if(counter == 0){
            this.element.innerHTML = this.element.innerHTML+`<h4>Pusto ;(</h4>`;
        }
    }
    
    close() {
        document.querySelector("canvas").style.filter = "brightness(1)";
        document.querySelector(".health_bar").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".gold img").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".gold span").style = "filter: brightness(1);cursor:pointer;";
        let quest_popups = document.querySelectorAll(".QuestPopup");
        quest_popups.forEach(el => {
            el.style.filter = "brightness(1)";
            el.style.cursor = "pointer";
            el.style.pointerEvents = "auto";
        })
        document.querySelector(".quest_button").innerText = '!';
        document.querySelector(".quest_button").style.paddingTop = "1px";
       document.querySelector(".quest_button").style.height = "20px";
        var old_element = document.querySelector(".quest_button");
var new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element);
       document.querySelector(".quest_button").addEventListener("click", function(){
           if (!window.Overworld.map.isCutscenePlaying) {
                window.Overworld.map.startCutscene([
                    {
                        type: "questlog"
                    }
            ]);
            }
       })
        setTimeout(function(){
            document.querySelector(".quest_button").addEventListener("mouseenter", function(event){
            if(!document.querySelector(".QuestLog")){
                let desc = document.createElement("div");
           desc.classList.add("desc");
           desc.style = `position: absolute; top: ${event.clientY}px; left: ${event.clientX}px`;
            desc.innerText = "Quests";
           document.querySelector("body").appendChild(desc);
            }
        })
        document.querySelector(".quest_button").addEventListener("mousemove", function(event){
            if(!document.querySelector(".QuestLog")){
                if(document.querySelector(".desc")){
               document.querySelector(".desc").style = `position: absolute; top: ${event.clientY+15}px; left: ${event.clientX+15}px`;     
                }
            }
            else{
                if(document.querySelector(".desc")){
                document.querySelector(".desc").remove();
                }
            }
       })
       document.querySelector(".quest_button").addEventListener("mouseleave", function(){
           if(document.querySelector(".desc")){
           document.querySelector(".desc").remove();
           }
       })
        },500)
        this.element.remove();
        this.esc.unbind();
        this.onComplete();
    }
        
   async init(container) {
       if(document.querySelector(".desc")){
                document.querySelector(".desc").remove();
                }
       document.querySelector(".quest_button").innerText = 'x';
       document.querySelector(".quest_button").style.paddingTop = "0px";
       document.querySelector(".quest_button").style.height = "21px";
        let this2 = this;
        this.createElement();
        document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelector(".health_bar").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold img").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold span").style = "filter: brightness(0.2);cursor:default;";
       let quest_popups = document.querySelectorAll(".QuestPopup");
        quest_popups.forEach(el => {
            el.style.filter = "brightness(0.2)";
            el.style.cursor = "default";
            el.style.pointerEvents = "none";
        })
        container.appendChild(this.element);
       this.check();
       utils.wait(200);
       this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
       var old_element = document.querySelector(".quest_button");
var new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element);
       document.querySelector(".quest_button").addEventListener("click", function quest_close(){
           this2.close();
       })
       document.querySelector(".QuestLog").addEventListener("click", function(event){
           const eventHandler = new OverworldEvent({event:{
                        type: "decision",
                        handler: () => {
                                let counter = 0;
                                window.quests.forEach(e =>{
                                if(e.id == event.target.dataset.questid){
                                    window.quests.splice(counter,1);
                                    this2.check();
                                }
                                counter++;
                            })
                        }
            }});
           eventHandler.init();
       })
    }

}
