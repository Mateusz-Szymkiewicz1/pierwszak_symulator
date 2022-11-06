class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

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
                        type: "inventory"
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
        this.progress.startingHeroX = this.map.gameObjects.hero.x;
        this.progress.startingHeroY = this.map.gameObjects.hero.y;
        this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;
    }

    async init() {
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
            window.heroInventory.forEach(e =>{
                window.heroInventory[window.heroInventory.indexOf(e)] = window.GameObjects.find(x => x.id === e.id);
                if(e.deleted){
                window.GameObjects.find(x => x.id === e.id).deleted = true;
                }
                if(e.amount || e.amount == 0){
                window.GameObjects.find(x => x.id === e.id).amount = e.amount;
                }
            });
            toilet_check();
            biblioteka_check();
            this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState);
        } else {
            if(window.localStorage.getItem("rpg_savefile1") != null){
                window.localStorage.removeItem("rpg_savefile1");
            }
            window.heroInventory = [];
            toilet_check();
            biblioteka_check();
            this.startMap(window.OverworldMaps.School, initialHeroState);
            this.map.startCutscene([
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
                    type: "textMessage",
                    text: "Użyj strzałek/AWSD aby się poruszać"
                },
                {
                    type: "textMessage",
                    text: "oraz Enter do interakcji"
                },
        ])
        }
        this.bindActionInput();
        this.bindHeroPositionCheck();
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();
    }

}
