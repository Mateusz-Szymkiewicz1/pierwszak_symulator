class OverworldEvent{
    constructor(config){
        for(let el in config){
            this[el] = config[el];
        }
    }
    stand(resolve){
        const who = window.map.gameObjects[this.who];
        if(who){
            who.startBehavior({}, {
                type: "stand",
                direction: this.direction,
                time: this.time
            })
            const completeHandler = e => {
                if (e.detail.whoId === this.who) {
                    document.removeEventListener("PersonStandComplete", completeHandler);
                    resolve();
                }
            }
            document.addEventListener("PersonStandComplete", completeHandler)
        }
    }
    walk(resolve){
        const who = window.map.gameObjects[this.who];
        who.startBehavior({}, {
            type: "walk",
            direction: this.direction,
            retry: true
        })
        const completeHandler = e => {
            if(e.detail.whoId === this.who){
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonWalkingComplete", completeHandler);
    }
    punch(resolve){
        const who = window.map.gameObjects[this.who];
        who.hand = this.hand;
        if(window.timeout && who.id == 'hero'){
            return;
        }
        const target = utils.nextPosition(who.x, who.y, who.direction);
        const match = Object.values(window.map.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${target.x},${target.y}`
        });
        if(window.current_fight){
            if(match.id == 'hero'){
                window.health_bar.add(-5, false)
            }else{
                window.current_fight.health -= 5;
            }
        }
        who.startBehavior({}, {
            type: "punch",
            direction: this.direction,
            hand: this.hand
        })
        const completeHandler = e => {
            if(e.detail.whoId === this.who){
                document.removeEventListener("PersonPunchingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonPunchingComplete", completeHandler);
        window.timeout = setTimeout(function(){
            utils.emitEvent("PersonPunchingComplete", {whoId: this.id});
            delete window.timeout;
        }, 500)
        if(window.health < 1 || window.current_fight.health < 1){
            window.map.startCutscene([{type: "end_fight"}]);
        }
    }
    duck(resolve){
        const who = window.map.gameObjects[this.who];
        who.startBehavior({}, {
            type: "duck",
            direction: this.direction,
        })
        const completeHandler = e => {
            if(e.detail.whoId === this.who){
                document.removeEventListener("PersonDuckingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonDuckingComplete", completeHandler);
    }
    textMessage(resolve){
        if (this.faceHero) {
            const obj = window.map.gameObjects[this.faceHero];
            obj.direction = utils.oppositeDirection(window.map.gameObjects["hero"].direction);
        }
        if(!this.who){
            this.who = null;
        }
        const message = new TextMessage({
            text: this.text,
            npc: this.who,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-container"));
        if (this.who) {
            const obj = window.map.gameObjects[this.who];
            if(obj.pickUp) {
                obj.talking = [];
                window.heroInventory.push(window.GameObjects.find(x=> x.id === obj.id));
            }
        }
    }
    question(resolve) {
        if(this.faceHero){
            const obj = window.map.gameObjects[this.faceHero];
            obj.direction = utils.oppositeDirection(window.map.gameObjects["hero"].direction);
        }
        if(!this.who){
            this.who = null;
        }
        const question = new Question({
            text: this.text,
            npc: this.who,
            options: this.options,
            onComplete: async () => resolve()
        })
        question.init(document.querySelector(".game-container"));
    } 
    talk(resolve){
        let this2 = this;
        let has_events = false;
        let randomElement;
        let array = window.NPCs.find(x=> x.id === this.who).talking;
        randomElement = array[Math.floor(Math.random() * array.length)];
        (async function(){
            for await(const ev of randomElement){
                if(ev.once){
                    let index = window.NPCs.find(x=> x.id === this2.who).talking.indexOf(randomElement);
                    window.relations.add_said(this2.who, index)
                }
                const eventHandler = new OverworldEvent(ev);
                await eventHandler.init();
            }})().then(function(){
                resolve();
            });
    } 
    changeMap(resolve) {
        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () => {
            window.map.overworld.startMap(window.OverworldMaps[this.map], {
                x: this.x,
                y: this.y,
                direction: this.direction
            });
            resolve();
            sceneTransition.fadeOut();
        })
    }
    open(resolve) {
        let who = window.map.gameObjects[this.who];
        who.src = this.src;
        if (who.x != window.map.gameObjects["hero"].x || who.y != window.map.gameObjects["hero"].y) {
            if (who.counter === 0) {
                delete window.map.walls[`${who.x},${who.y}`];
            }
            if (who.counter === 1) {
                window.map.walls[`${who.x},${who.y}`] = true;
            }
            who.sprite = new Sprite({
                gameObject: who,
                src: this.src,
            });
        }
        resolve();
    }
    do_code(resolve) {
        eval(this.code);
        resolve();
    }
    pause(resolve) {
        window.map.isPaused = true;
        const menu = new PauseMenu({
            progress: window.map.overworld.progress,
            onComplete: () => {
                resolve();
                window.map.isPaused = false;
                window.map.overworld.startGameLoop();
            }
        });
        menu.init(document.querySelector(".game-container"));
    }
    inventory(resolve){
        if(this.szafka){
            const inventory = new Inventory({
                onComplete: () => {
                    resolve();
                }
            }, true);
            inventory.init(document.querySelector(".game-container"));
        }
        else{
            window.map.isPaused = true;
            const inventory = new Inventory({
                onComplete: () => {
                    resolve();
                    window.map.isPaused = false;
                    window.map.overworld.startGameLoop();
                }
            }, false);
            inventory.init(document.querySelector(".game-container"));
        }
    } 
    end_fight(resolve){
        window.map.isPaused = true;
        const end_fight = new End_fight({
            onComplete: () => {
                resolve();
                window.map.isPaused = false;
                window.map.overworld.startGameLoop();
            }
        }, false);
        end_fight.init(document.querySelector(".game-container"));
    } 
   questlog(resolve){
        window.map.isPaused = true;
        const questlog = new QuestLog({
            onComplete: () => {
                resolve();
                window.map.isPaused = false;
                window.map.overworld.startGameLoop();
            }
        });
        questlog.init(document.querySelector(".game-container"));
    }  
    shop(resolve){
        window.map.isPaused = true;
        const shop = new Shop({
            onComplete: () => {
                resolve();
                window.map.isPaused = false;
                window.map.overworld.startGameLoop();
            }
        }, this.products);
        shop.init();
    }  
    book(resolve){
        window.map.isPaused = true;
        const book = new Book({
            onComplete: () => {
                resolve();
                window.map.isPaused = false;
                window.map.overworld.startGameLoop();
            }
        }, this.book_id);
        book.init();
    }
    fights(resolve){
        window.map.isPaused = true;
        const fights = new Fights({
            onComplete: () => {
                resolve();
                window.map.isPaused = false;
                window.map.overworld.startGameLoop();
            }
        });
        fights.init();
    }  
    play_audio(resolve){
        const audio = document.querySelector("#audio_"+this.audio);
        if(this.speed){
            audio.playbackRate = this.speed;
        } 
        audio.volume = this.volume*window.sfx_volume;
        audio.play();
        resolve();
    } 
     settings(resolve){
        if(window.map){
            window.map.isPaused = true;
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
                this.handler();
            }
        });
        decision.init(document.querySelector(".game-container"));
    }
    szafka_open(resolve){
        if(window.quests.find(x=> x.id === "Znajdź_Szafkę") && window.quests.find(x=> x.id === "Znajdź_Szafkę").progress == 0){
           const quest = new QuestLog({onComplete: () => {}});
           quest.end_quest("Znajdź_Szafkę");
        }
        window.map.isPaused = true;
        const szafka = new Szafka({
            onComplete: () => {
                resolve();
                window.map.isPaused = false;
                window.map.overworld.startGameLoop();
            }
        });
        szafka.init(document.querySelector(".game-container"));
    }
    init() {
        return new Promise(resolve => {
            this[this.type](resolve)
        })
    }
}
