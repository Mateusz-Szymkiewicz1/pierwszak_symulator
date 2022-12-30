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
                    if(object.id == "hero"){
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
        }
        step();
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            this.map.checkForActionCutscene()
        })
        new KeyPressListener("Escape", () => {
            if (!this.map.isCutscenePlaying) {
                this.map.startCutscene([
                    {
                        type: "pause"
                    }
            ]);
            }
        })
        new KeyPressListener("KeyE", () => {
            if (!this.map.isCutscenePlaying) {
                this.map.startCutscene([
                    {
                        type: "inventory",
                    }
            ]);
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
        if (heroInitialState) {
            const {
                hero
            } = this.map.gameObjects;
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
        let this2 = this;
        document.querySelector(".game-container").addEventListener("contextmenu", function(event){
            event.preventDefault();
        });
        this.progress = new Progress();
        this.titleScreen = new TitleScreen({
            progress: this.progress
        });
        const useSaveFile = await this.titleScreen.init(document.querySelector(".game-container"));
        let initialHeroState = null;
        if (useSaveFile) {
            this.progress.load();
            initialHeroState = {
                x: this.progress.startingHeroX,
                y: this.progress.startingHeroY,
                direction: this.progress.startingHeroDirection,
            }
             window.heroInventory = this.progress.heroInventory;
            window.health = this.progress.health;
            window.quests = this.progress.quests;
            window.gold = this.progress.gold;
            window.szafka = this.progress.szafka;
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
            window.gold = 0;
            window.quests = [];
            var StartMapPromise = new Promise(function(resolve) {
                window.sceneTransition = new SceneTransition();
                sceneTransition.init(document.querySelector(".game-container"), () => {
                this2.startMap(window.OverworldMaps.School, initialHeroState);
                    resolve();
                })
            });
            StartMapPromise.then(async function(){
                await this2.map.startCutscene([
                {
                    who: "wozna",
                    type: "stand",
                    direction: "right",
                    time: 500
                },
                {
                    type: "textMessage",
                    text: "Nareszcie pierwszy dzień w nowej szkole..."
                },
                {
                    type: "textMessage",
                    text: "Może mnie nie będą bić jak w podstawówce!"
                },
                {
                    type: "do_code",
                    code: `window.sceneTransition.fadeOut();delete window.sceneTransition`
                },
                {
                    type: "textMessage",
                    text: "Użyj strzałek/AWSD aby się poruszać"
                },
                {
                    type: "textMessage",
                    text: "oraz Enter do interakcji"
                },
                ])
            }).then(function(){
                const quest = new QuestLog({
            onComplete: () => {}
            });
            quest.add_quest({
                id: "Znajdź_Klucz",
                desc: "Poszukaj klucza do twojej nowej szafki!",
            })
            })
        }
        StartMapPromise.then(function(value){
            this2.bindActionInput();
        this2.bindHeroPositionCheck();
        this2.directionInput = new DirectionInput();
        this2.directionInput.init();
        this2.startGameLoop();
        document.addEventListener('mouseleave', e=>{
            if(!this2.map.isPaused){
                if (!this2.map.isCutscenePlaying) {
                    this2.map.startCutscene([
                        {
                            type: "pause"
                        }
                ]);
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
        const gold = new Gold();
        gold.init();
      const quest_button = document.createElement("div");
        quest_button.classList.add("quest_button");
        quest_button.classList.add("hud");
        quest_button.innerText = "!";
        document.querySelector(".game-container").append(quest_button);
        quest_button.addEventListener("click", function(){
          if (!this2.map.isCutscenePlaying) {
                this2.map.startCutscene([
                    {
                        type: "questlog"
                    }
            ]);
            }
        })
        const quest_press = new KeyPressListener("KeyQ", () => {
            if (!this2.map.isCutscenePlaying && !document.querySelector(".QuestLog")) {
                this2.map.startCutscene([
                    {
                        type: "questlog"
                    }
            ]);
            }
        });
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
               document.querySelector(".desc").style = `position: absolute; top: ${event.clientY+15}px; left: ${event.clientX+15}px`;    
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
    }

}
