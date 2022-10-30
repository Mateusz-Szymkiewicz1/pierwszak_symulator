class OverworldEvent {
    constructor({
        map,
        event
    }) {
        this.map = map;
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
        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    textMessage(resolve) {
        if (this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
        }
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-container"));
        if (this.event.who) {
            const obj = this.map.gameObjects[this.event.who];
            if (obj.pickUp) {
                obj.talking = [];
                const property = "ma" + this.event.who;
                this.map.gameObjects["hero"][property] = true;
            }
        }
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
    pause(resolve) {
        this.map.isPaused = true;
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

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}
