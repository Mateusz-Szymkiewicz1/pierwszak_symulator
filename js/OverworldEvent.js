class OverworldEvent {
    constructor({
        map,
        event
    }) {
        this.map = map || null;
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonStandComplete", completeHandler)
    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonWalkingComplete", completeHandler);
    }

    textMessage(resolve) {
        if (this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
        }
        if(!this.event.who){
            this.event.who = null;
        }
        const message = new TextMessage({
            text: this.event.text,
            npc: this.event.who,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-container"));
        if (this.event.who) {
            const obj = this.map.gameObjects[this.event.who];
            if(obj.pickUp) {
                obj.talking = [];
                window.heroInventory.push(window.GameObjects.find(x=> x.id === obj.id));
            }
        }
    }

    question(resolve) {
        if (this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
        }
        if(!this.event.who){
            this.event.who = null;
        }
        const question = new Question({
            text: this.event.text,
            npc: this.event.who,
            options: this.event.options,
            onComplete: () => resolve()
        })
        question.init(document.querySelector(".game-container"));
    }
    
    changeMap(resolve) {
        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () => {
            this.map.overworld.startMap(window.OverworldMaps[this.event.map], {
                x: this.event.x,
                y: this.event.y,
                direction: this.event.direction
            });
            resolve();
            sceneTransition.fadeOut();
        })
    }

    open(resolve) {
        let who = this.map.gameObjects[this.event.who];
        who.src = this.event.src;
        if (who.x != this.map.gameObjects["hero"].x || who.y != this.map.gameObjects["hero"].y) {
            if (who.counter === 0) {
                delete this.map.walls[`${who.x},${who.y}`];
            }
            if (who.counter === 1) {
                this.map.walls[`${who.x},${who.y}`] = true;
            }
            who.sprite = new Sprite({
                gameObject: who,
                src: this.event.src,
            });
        }
        resolve();
    }
    do_code(resolve) {
        eval(this.event.code);
        resolve();
    }
    pause(resolve) {
        this.map.isPaused = true;
        window.Overworld.map.isPaused = true;
        const menu = new PauseMenu({
            progress: this.map.overworld.progress,
            onComplete: () => {
                resolve();
                this.map.isPaused = false;
                this.map.overworld.startGameLoop();
            }
        });
        menu.init(document.querySelector(".game-container"));
    }
    
    inventory(resolve){
        if(this.event.szafka){
            const inventory = new Inventory({
                onComplete: () => {
                    resolve();
                }
            }, true);
            inventory.init(document.querySelector(".game-container"));
        }
        else{
        this.map.isPaused = true;
        const inventory = new Inventory({
            onComplete: () => {
                resolve();
                this.map.isPaused = false;
                this.map.overworld.startGameLoop();
            }
        }, false);
        inventory.init(document.querySelector(".game-container"));
        }
    }
    
   questlog(resolve){
        this.map.isPaused = true;
        const questlog = new QuestLog({
            onComplete: () => {
                resolve();
                this.map.isPaused = false;
                this.map.overworld.startGameLoop();
            }
        });
        questlog.init(document.querySelector(".game-container"));
    }
    
    shop(resolve){
        this.map.isPaused = true;
        const shop = new Shop({
            onComplete: () => {
                resolve();
                this.map.isPaused = false;
                this.map.overworld.startGameLoop();
            }
        }, this.event.products);
        shop.init();
    }
    
    book(resolve){
        this.map.isPaused = true;
        const book = new Book({
            onComplete: () => {
                resolve();
                this.map.isPaused = false;
                this.map.overworld.startGameLoop();
            }
        }, this.event.book_id);
        book.init();
    }
    
     settings(resolve){
         if(this.map){
        this.map.isPaused = true;
         }
        const settings = new Settings({
            onComplete: () => {
                resolve();
            }
        });
        settings.init();
    }
    
    decision(resolve){
        const decision = new DecisionBox({
            onComplete: () => {
                resolve();
                this.event.handler();
            }
        });
        decision.init(document.querySelector(".game-container"));
    }

    szafka_open(resolve){
        if(window.quests.find(x=> x.id === "Znajdź_Szafkę") && window.quests.find(x=> x.id === "Znajdź_Szafkę").progress == 0){
           const quest = new QuestLog({onComplete: () => {}});
           quest.end_quest("Znajdź_Szafkę");
        }
        this.map.isPaused = true;
        const szafka = new Szafka({
            onComplete: () => {
                resolve();
                this.map.isPaused = false;
                this.map.overworld.startGameLoop();
            }
        });
        szafka.init(document.querySelector(".game-container"));
    }
    
    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}
