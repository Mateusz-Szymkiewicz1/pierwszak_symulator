class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }
    startGameLoop() {
        const step = () => {
            window.Overworld = this;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            const cameraPerson = this.map.gameObjects.hero;
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })
            if(window.speed && window.speed == 2){
                Object.values(this.map.gameObjects).forEach(object => {
                    if(object.id == "hero" && object.sprite.currentAnimation.slice(0, 4) == 'walk'){
                        object.update({
                            arrow: this.directionInput.direction,
                            map: this.map,
                        })
                    }
                })
            }
            this.map.drawLowerImage(this.ctx, cameraPerson);
            Object.values(this.map.gameObjects).sort((a, b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })
            this.map.drawUpperImage(this.ctx, cameraPerson);
            if (!this.map.isPaused) {
                requestAnimationFrame(() => {
                    step();
                })
            }
            if(window.current_fight && window.current_fight.original_health){
                const ctx = window.Overworld.ctx;

                ctx.beginPath();
                ctx.strokeStyle = "#000"
                ctx.moveTo(utils.withGrid(11.6), utils.withGrid(5.5));
                ctx.lineTo(utils.withGrid(11.6)+12, utils.withGrid(5.5));
                ctx.stroke();

                const ratio = window.current_fight.health/window.current_fight.original_health
                if(ratio > 0.6){
                    ctx.strokeStyle = "#0f0"
                }else if(ratio > 0.3){
                    ctx.strokeStyle = "#f1c40f"
                }else{
                    ctx.strokeStyle = "#f00"
                }
                ctx.moveTo(utils.withGrid(11.6), utils.withGrid(5.5));
                ctx.lineTo(utils.withGrid(11.6)+(12*ratio), utils.withGrid(5.5));
                ctx.stroke();
            }
        }
        step();
    }
    bindActionInput() {
        new KeyPressListener("Enter", () => {
            this.map.checkForActionCutscene()
        })
        new KeyPressListener("Escape", () => {
            if (!this.map.isCutscenePlaying) {
                this.map.startCutscene([{type: "pause"}]);
            }
        })
        new KeyPressListener("KeyE", () => {
            if (!this.map.isCutscenePlaying) {
                this.map.startCutscene([{type: "inventory",}]);
            }
        })
        new KeyPressListener("KeyJ", () => {
            if (!this.map.isCutscenePlaying) {
                const eventHandler = new OverworldEvent({type: "punch", hand: "right", who: "hero", direction: window.map.gameObjects["hero"].direction});
                eventHandler.init();
            }
        })
        new KeyPressListener("KeyH", () => {
            if (!this.map.isCutscenePlaying) {
                const eventHandler = new OverworldEvent({type: "punch", hand: "left", who: "hero", direction: window.map.gameObjects["hero"].direction});
                eventHandler.init();
            }
        })
        new KeyPressListener("KeyB", () => {
            if (!this.map.isCutscenePlaying) {
                const eventHandler = new OverworldEvent({type: "duck", who: "hero", direction: window.map.gameObjects["hero"].direction});
                eventHandler.init();
            }
        })
    }
    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "hero") {
                this.map.checkForFootstepCutscene();
            }
        })
    }
    startMap(mapConfig, heroInitialState = null) {
        this.map = new OverworldMap(mapConfig);
        window.map = this.map;
        this.map.overworld = this;
        this.map.mountObjects();
        if(heroInitialState){
            const {hero} = this.map.gameObjects;
            this.map.removeWall(hero.x, hero.y);
            hero.x = heroInitialState.x;
            hero.y = heroInitialState.y;
            hero.direction = heroInitialState.direction;
            this.map.addWall(hero.x, hero.y);
        }
        this.progress.mapId = mapConfig.id;
        if(window.OverworldMaps[this.progress.mapId].start_func){
            window.OverworldMaps[this.progress.mapId].start_func();
        }
        this.progress.startingHeroX = this.map.gameObjects.hero.x;
        this.progress.startingHeroY = this.map.gameObjects.hero.y;
        this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;
    }
    async init() {
        window.page_hover = true;
        const this2 = this;
        document.querySelector(".game-container").addEventListener("contextmenu", function(event){
            event.preventDefault();
        });
        this.progress = new Progress();
        this.titleScreen = new TitleScreen({
            progress: this.progress
        });
        const useSaveFile = await this.titleScreen.init(document.querySelector(".game-container"));
        let initialHeroState = null;
        if(useSaveFile){
            this.progress.load();
            initialHeroState = {
                x: this.progress.startingHeroX,
                y: this.progress.startingHeroY,
                direction: this.progress.startingHeroDirection,
            }
            window.heroInventory = this.progress.heroInventory;
            window.health = this.progress.health;
            window.exp = this.progress.exp;
            window.current_level = this.progress.current_level;
            window.quests = this.progress.quests;
            window.gold = this.progress.gold;
            window.szafka = this.progress.szafka;
            window.relations = new Relations();
            this.progress.load_relations();
            window.relations.load_relations();
            window.heroInventory.forEach(e =>{
                window.heroInventory[window.heroInventory.indexOf(e)] = window.GameObjects.find(x => x.id === e.id);
                if(e.deleted){
                    window.GameObjects.find(x => x.id === e.id).deleted = true;
                }
                if(e.amount || e.amount == 0){
                    window.GameObjects.find(x => x.id === e.id).amount = e.amount;
                }
                if(e.tile){
                    window.GameObjects.find(x => x.id === e.id).tile = e.tile;
                }
            });
            this.progress.buffs.forEach(buff => {
                let progress_buff = new Buff(buff.type, buff.time);
                progress_buff.init();
                if(buff.type == "Speed"){
                    window.speed = 2;
                    setTimeout(function() {
                        window.speed = 1;
                    }, parseInt(buff.time)+1300)
                }
                if(buff.type == "Regeneration"){
                    const interval = setInterval(function(){
                        window.health_bar.add(1, false)
                    }, 1000);
                    setTimeout(function(){
                        clearInterval(interval)
                    }, parseInt(buff.time)+1300);
                }
            })
            this.progress.fights.forEach((f, index) => {
                if(!f.minutes) return
                let fight = window.fights[index];
                fight.minutes = f.minutes;
                const interval = setInterval(() => {
                    if(fight.minutes > 0){
                        fight.minutes--;
                        let minutes = fight.minutes;
                        if(minutes < 10){
                            minutes = "0"+minutes
                        }
                        if(document.querySelector(`.fight_${fight.name}`)){
                            document.querySelector(`.fight_${fight.name} .minutes`).innerHTML = `Poczekaj! Jeszcze nie doszedł do siebie.<br/>00:${minutes}`
                        }
                    }else{
                        if(document.querySelector(`.fight_${fight.name}`)){
                            document.querySelector(`.fight_${fight.name} .minutes`).remove();
                            document.querySelector(`.fight_${fight.name} button`).style = "";
                        }
                        clearInterval(interval)
                        delete fight.minutes;
                    }
                }, 1000*60)
            })
            var StartMapPromise = new Promise(function(resolve) {
                const sceneTransition = new SceneTransition();
                sceneTransition.init(document.querySelector(".game-container"), () => {
                    this2.startMap(window.OverworldMaps[this2.progress.mapId], initialHeroState);
                    sceneTransition.fadeOut();
                    resolve();
                })
            });
        } else {
            if(window.localStorage.getItem("saveFile") != null){
                window.localStorage.removeItem("saveFile");
            }
            window.heroInventory = [];
            window.szafka = [];
            window.health = 100;
            window.exp = 0;
            window.current_level = 0;
            window.gold = 0;
            window.quests = [];
            window.relations = new Relations();
            relations.init();
            var StartMapPromise = new Promise(function(resolve) {
                window.sceneTransition = new SceneTransition();
                sceneTransition.init(document.querySelector(".game-container"), () => {
                    this2.startMap(window.OverworldMaps.School, initialHeroState);
                    resolve();
                })
            });
            StartMapPromise.then(async function(){
                await this2.map.startCutscene([
                    {who: "wozna",type: "stand",direction: "right",time: 500},
                    {type: "textMessage",text: "Nareszcie pierwszy dzień w nowej szkole..."},
                    {type: "textMessage",text: "Może mnie nie będą bić jak w podstawówce!"},
                    {type: "do_code",code: `window.sceneTransition.fadeOut();delete window.sceneTransition`},
                    {type: "textMessage",text: "Użyj strzałek/AWSD aby się poruszać"},
                    {type: "textMessage",text: "oraz Enter do interakcji"},
                ])
            }).then(function(){
                const quest = new QuestLog({onComplete: () => {}});
                quest.add_quest({id: "Znajdź_Klucz",desc: "Poszukaj klucza do twojej nowej szafki!",});
            })
        }
        StartMapPromise.then(function(value){
            this2.bindActionInput();
            this2.bindHeroPositionCheck();
            this2.directionInput = new DirectionInput();
            this2.directionInput.init();
            this2.startGameLoop();
            document.addEventListener('mouseleave', e=>{
                if(!window.map.isPaused){
                    if (!window.map.isCutscenePlaying) {
                        window.map.startCutscene([{type: "pause"}]);
                    }
                    window.page_hover = false;
                }
            })
            document.addEventListener('mouseenter', e=>{
                window.page_hover = true;
            })
        })
        window.health_bar = new HealthBar();
        window.health_bar.init();
        window.exp_bar = new ExpBar();
        window.exp_bar.init();
        const gold = new Gold();
        gold.init();
        const quest_button = document.createElement("div");
        quest_button.className = 'hud quest_button';
        quest_button.innerText = "!";
        document.querySelector(".game-container").append(quest_button);
        quest_button.addEventListener("click", function(){
            if(!window.map.isCutscenePlaying){
                window.map.startCutscene([{type: "questlog"}]);
            }
        })
        const quest_press = new KeyPressListener("KeyQ", () => {
            if(!window.map.isCutscenePlaying && !document.querySelector(".QuestLog")){
                window.map.startCutscene([{type: "questlog"}]);
            }
        });
        document.querySelector(".quest_button").addEventListener("mouseenter", function(event){
            if(!document.querySelector(".QuestLog")){
                const desc = document.createElement("div");
                desc.classList.add("desc");
                desc.style = `position: absolute; top: ${event.clientY}px; left: ${event.clientX}px`;
                desc.innerText = "Quests";
                document.querySelector("body").appendChild(desc);
            }
        })
        document.querySelector(".quest_button").addEventListener("mousemove", function(event){
            if(!document.querySelector(".QuestLog")){
               document.querySelector(".desc").style = `position: absolute; top: ${event.clientY+15}px; left: ${event.clientX+15}px`;    
            }else if(document.querySelector(".desc")){
                document.querySelector(".desc").remove();
            }
       })
       document.querySelector(".quest_button").addEventListener("mouseleave", function(){
           if(document.querySelector(".desc")){
              document.querySelector(".desc").remove();
           }
       })
    }
}