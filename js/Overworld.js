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
            window.heroInventory.forEach(e =>{
                window.heroInventory[window.heroInventory.indexOf(e)] = window.GameObjects.find(x => x.id === e.id);
                if(e.deleted){
                window.GameObjects.find(x => x.id === e.id).deleted = true;
                }
                if(e.amount || e.amount == 0){
                window.GameObjects.find(x => x.id === e.id).amount = e.amount;
                }
            });
            this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState);
        } else {
            if(window.localStorage.getItem("rpg_savefile1") != null){
                window.localStorage.removeItem("rpg_savefile1");
            }
            window.heroInventory = [];
            window.health = 100;
            window.gold = 0;
            window.quests = [];
            const quest = new QuestLog({
            onComplete: () => {}
            });
            quest.add_quest({
                id: "Znajdź_Klucz",
                desc: "Poszukaj klucza do twojej nowej szafki!",
            })
            this.startMap(window.OverworldMaps.School, initialHeroState);
//            this.map.startCutscene([
//                {
//                    who: "wozna",
//                    type: "stand",
//                    direction: "right",
//                    time: 500
//                },
//                {
//                    type: "textMessage",
//                    text: "Nareszcie pierwszy dzień w nowej szkole..."
//                },
//                {
//                    type: "textMessage",
//                    text: "Może mnie nie będą bić jak w podstawówce!"
//                },
//                {
//                    type: "textMessage",
//                    text: "Użyj strzałek/AWSD aby się poruszać"
//                },
//                {
//                    type: "textMessage",
//                    text: "oraz Enter do interakcji"
//                },
//        ])
        }
        window.health_bar = new HealthBar();
        window.health_bar.init();
        const gold = new Gold();
        gold.init();
        this.bindActionInput();
        this.bindHeroPositionCheck();
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();
        const quest_button = document.createElement("div");
        quest_button.classList.add("quest_button");
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
