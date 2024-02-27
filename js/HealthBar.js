class HealthBar{
   async add(value, text = true){
       window.health = window.health+value;
       if(window.health > 100){
           window.health = 100;
        }
       document.querySelector(".health_fill").style.width = window.health+"px";
       if(text){
           const eventHandler = new OverworldEvent({type: "textMessage",text: `Odzyskałeś ${value} HP ;)`});
           eventHandler.init();
       }
       if(document.querySelector(".desc") && document.querySelector(".desc").dataset.div == "health_bar"){
            document.querySelector(".desc").innerText = `Health ${window.health}/100`;
       }
   }
    substract(value, text = true){
        window.health = window.health-value;
           if(window.health <= 0){
               window.health = 100;
               window.map.startCutscene([{type: "changeMap", map: 'Pielegniarka', x: utils.withGrid(2), y: utils.withGrid(4), direction: "up"},{type: 'textMessage', who: 'pielegniarka',text: "Następnym razem uważaj na siebie..."}]);  
                const gold = new Gold();
                gold.spend(window.gold);
                window.heroInventory.forEach(el => {
                    if(el.can_delete){
                        el.deleted = true;
                    }
                })
           }
        document.querySelector(".health_fill").style.width = window.health+"px";
        if(text){
            const eventHandler = new OverworldEvent({type: "textMessage",text: `Straciłeś ${value} HP ;(`});
            eventHandler.init();
        }
   }
   async init() {
       this.element = document.createElement("div");
       this.element.className = 'hud health_bar';
       this.fill = document.createElement("div");
       this.fill.classList.add("health_fill");
       this.fill.style.width = window.health+"px";
       document.querySelector(".game-container").appendChild(this.element);
       this.element.append(this.fill);
       this.element.innerHTML = `<span>HP</span>`+this.element.innerHTML;
       this.element.addEventListener("mouseenter", function(event){
           let desc = document.createElement("div");
           desc.classList.add("desc");
           desc.dataset.div = "health_bar";
           desc.style = `position: absolute; top: ${event.clientY}px; left: ${event.clientX}px`;
           desc.innerText = `Health ${window.health}/100`;
           document.querySelector("body").appendChild(desc);
       })
       this.element.addEventListener("mousemove", function(event){
            document.querySelector(".desc").style = `position: absolute; top: ${event.clientY+15}px; left: ${event.clientX+15}px`;
       })
       this.element.addEventListener("mouseleave", function(){
           document.querySelector(".desc").remove();
       })
   }
}