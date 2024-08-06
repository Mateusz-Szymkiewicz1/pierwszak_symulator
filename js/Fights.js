class Fights{

  constructor({onComplete}){
     this.onComplete = onComplete;
 }

 close() {
     document.querySelector("canvas").style.filter = "none";
     utils.turn_hud_on();
     this.esc.unbind();
     this.element.remove();
     this.onComplete();
 }  

 show_fights(){
    let this2 = this;
    window.fights.forEach(el => {
        const div = document.createElement('div');
        div.className = 'fight';
        div.innerHTML = `
            <h3>${el.name}</h3>
            <img src="images/characters/${el.name.toLowerCase()}.png">
            <span class="reward">${el.reward}<img src="images/Objects/gold.png"></span>
            <span class="exp">${el.exp}EXP</span>
            <p>${el.desc}</p>
            <div class="bar"><div class="fill" style="width: ${el.difficulty}%;"></div></div>
            <span class="difficulty">Bardzo łatwy</span><br/>
            <button>Walcz</button>
        `;
        div.querySelector("button").addEventListener("click", function(){
            this2.fight(el)
        })
        document.querySelector('.fights').appendChild(div);
        div.querySelector(".fill").style.background = "#00b894";
        if(el.difficulty > 80){
            div.querySelector(".fill").style.background = "#d63031";
            div.querySelector(".difficulty").innerText = 'Bardzo ciężki'
        }else if(el.difficulty > 60){
            div.querySelector(".fill").style.background = "#e17055";
            div.querySelector(".difficulty").innerText = 'Ciężki'
        }else if(el.difficulty > 40){
            div.querySelector(".fill").style.background = "#fdcb6e";
            div.querySelector(".difficulty").innerText = 'Średni'
        }else if(el.difficulty > 20){
            div.querySelector(".fill").style.background = "#ffeaa7";
            div.querySelector(".difficulty").innerText = 'Łatwy'
        }
    })
 } 

 fight(el){
    window.current_fight = el;
    const eventHandler = new OverworldEvent({type: "changeMap",map:"Schron",x:utils.withGrid(5),y:utils.withGrid(6),direction:"right"});
    eventHandler.init();
    this.close();
    window.OverworldMaps.Schron.gameObjects.opps = new Person({
        x: utils.withGrid(6),
        y: utils.withGrid(6),
        useShadow: true,
        counter: 0,
        direction: "left",
        src: `images/characters/people/${el.name.toLowerCase()}.png`
    })
    const opps = window.OverworldMaps.Schron.gameObjects.opps;
 }

async init() {
     document.querySelector("canvas").style.filter = "blur(4px)";
     utils.turn_hud_off();
     this.element = document.createElement("div");
     this.element.classList.add("fights");
     this.element.innerHTML = `<h2>Walki</h2>`;
     document.querySelector(".game-container").appendChild(this.element);
     this.element.setAttribute("tabindex", "0")
     this.element.focus();

    window.fights = [
        {
            name: "Manekin",
            reward: 0,
            exp: 0,
            difficulty: 0,
            desc: "Dosłownie manekin.",
            health: 100
        },
        {
            name: "Radziu",
            reward: 5,
            exp: 5,
            difficulty: 5,
            desc: "Waga kogucia. Zapędy pedofilskie.",
            health: 10
        }
    ]

     this.show_fights();
     utils.wait(200);
     this.esc = new KeyPressListener("Escape", () => {
         this.close();
     });
}
}

class End_fight{

    constructor({onComplete}){
       this.onComplete = onComplete;
    }

    close(){
        delete window.current_fight;
        document.querySelector("canvas").style.filter = "none";
        utils.turn_hud_on();
        this.esc.unbind();
        this.element.remove();
        this.onComplete();
        if(window.health > 0){
            delete window.OverworldMaps.Schron.gameObjects.opps;
            window.map.startCutscene([{type: "changeMap", map: 'Schron', x: utils.withGrid(6), y: utils.withGrid(2), direction: "right"},{type: 'textMessage', who: 'tyler',text: "Brawo..."},{type: 'textMessage', who: 'tyler',text: "oby tak dalej."}]);
        }else{
            delete window.OverworldMaps.Schron.gameObjects.opps;
            window.map.startCutscene([{type: "changeMap", map: 'Pielegniarka', x: utils.withGrid(2), y: utils.withGrid(4), direction: "up"},{type: 'textMessage', who: 'pielegniarka',text: "Następnym razem uważaj na siebie..."},{type: 'textMessage', who: 'pielegniarka',text: "już mam dość uczniów z kręgu."}]);  
            const gold = new Gold();
            gold.spend(window.gold);  
            window.health = 100;
            window.current_level -= 1;
            window.exp = 0;
            window.heroInventory.forEach(el => {
                if(el.can_delete){
                    el.deleted = true;
                }
            })
        }
    }
    
    async init() {
        document.querySelector("canvas").style.filter = "blur(4px)";
        utils.turn_hud_off();
        this.element = document.createElement("div");
        this.element.className = 'fights fight_end';
        this.element.innerHTML = `
            <h2>Koniec walki! <br/> <span class="fight_score">Przegrana :(</span></h2>
            <span class="fight_reward"><img src="images/Objects/gold.png"> Otrzymujesz: 0</span>
        `;
        document.querySelector(".game-container").appendChild(this.element);
        if(window.health > 0){
            document.querySelector('.fight_score').innerText = 'Wygrana :D';
            document.querySelector('.fight_reward').innerHTML = `Otrzymujesz:<br/><img src="images/Objects/gold.png"><span class="reward">${window.current_fight.reward}</span><span class="exp">${window.current_fight.exp}EXP</span>`;
            const gold = new Gold();
            gold.add(window.current_fight.reward);
            window.exp_bar.add(window.current_fight.exp)
        }
        this.element.setAttribute("tabindex", "0")
        this.element.focus();
        utils.wait(200);
        this.esc = new KeyPressListener("Escape", () => {
            this.close();
        });
    }   
}