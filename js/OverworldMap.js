class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
        this.isCutscenePlaying = false;
        this.isPaused = false;
    }
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, utils.withGrid(10.5) - cameraPerson.x, utils.withGrid(6) - cameraPerson.y);
    }
    isSpaceTaken(currentX, currentY, direction) {
        const {
            x,
            y
        } = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }
    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];
            object.id = key;
            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;

        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    }

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        const match2 = Object.values(this.gameObjects).find(object => {
            if (object.id != "hero") {
                return `${object.x},${object.y}` === `${hero.x},${hero.y}`
            }
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
            if (match.counter === match.talking.length) {
                match.counter = 0;
            }
            this.startCutscene(match.talking[match.counter].events);
            match.counter += 1;
        }
        if (!this.isCutscenePlaying && match2 && match2.talking.length) {
            if (match2.counter === match2.talking.length) {
                match2.counter = 0;
            }
            this.startCutscene(match2.talking[match2.counter].events);
            match2.counter += 1;
        }
    }
    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
        if (!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events)
        }
    }
    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x, y) {
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {
            x,
            y
        } = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x, y);
    }
}

window.OverworldMaps = {
    School: {
        id: "School",
        lowerSrc: "images/maps/SchoolLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                useShadow: true,
                direction: "up",
                x: utils.withGrid(6),
                y: utils.withGrid(7),
            }),
            wozna: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/npc1.png",
                talking: [
                    {
                        events: [
                            {
                                who: "wozna",
                                type: "textMessage",
                                text: "Zmień buty debilu",
                                faceHero: "wozna"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "right",
                        time: 2000
                    },
                ]
            }),
            ziomek: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(2),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/npc3.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: "Kazali mi zapłacić za winkiel",
                                faceHero: "ziomek"
                            },
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: "Teraz dzwonią po moich rodziców",
                                faceHero: "ziomek"
                            },
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: "Dwulicowe szmaty",
                                faceHero: "ziomek"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "down",
                        time: 800
                    },
                ]
            }),
            dezynfekcja: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "dezynfekcja",
                                type: "textMessage",
                                text: "*mmmm dezynfekcja*"
                            },
                       ]
                   }
               ],
            }),
            ksiazka: new Person({
                x: utils.withGrid(16),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ksiazka",
                                type: "textMessage",
                                text: '"MaTeMemAtyka rozszerzona dla klasy 3"'
                            },
                            {
                                who: "ksiazka",
                                type: "textMessage",
                                text: "*ten widok sprawia ci ból*"
                            },
                       ]
                   }
               ],
            }),
            sekretariatDrzwi: new Person({
                x: utils.withGrid(11),
                y: utils.withGrid(9),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_down.png",
                talking: [
                    {
                        events: [
                            {
                                who: "sekretariatDrzwi",
                                type: "textMessage",
                                text: '"Zaraz wracam"'
                            },
                       ]
                   }
               ],
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(1, 3)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(23),
                            y: utils.withGrid(4),
                            direction: "left"
                        },
                    ]
                }
            ],
                [utils.asGridCoord(1, 4)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(23),
                            y: utils.withGrid(5),
                            direction: "left"
                        },
                    ]
                }
            ],
            [utils.asGridCoord(19, 7)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(1),
                            y: utils.withGrid(8),
                            direction: "right"
                        },
                    ]
                }
            ],
                [utils.asGridCoord(19, 8)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(1),
                            y: utils.withGrid(9),
                            direction: "right"
                        },
                    ]
                }
            ],
        },
        walls: {
           [utils.asGridCoord(4, 6)]: true,
           [utils.asGridCoord(0, 3)]: true,
           [utils.asGridCoord(0, 4)]: true,
           [utils.asGridCoord(2, 2)]: true,
           [utils.asGridCoord(9, 7)]: true,
           [utils.asGridCoord(4, 7)]: true,
           [utils.asGridCoord(4, 8)]: true,
           [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(2, 6)]: true,
           [utils.asGridCoord(5, 9)]: true,
           [utils.asGridCoord(6, 10)]: true,
           [utils.asGridCoord(7, 9)]: true,
           [utils.asGridCoord(8, 9)]: true,
           [utils.asGridCoord(8, 7)]: true,
           [utils.asGridCoord(9, 8)]: true,
           [utils.asGridCoord(9, 6)]: true,
           [utils.asGridCoord(9, 5)]: true,
           [utils.asGridCoord(9, 2)]: true,
           [utils.asGridCoord(7, 1)]: true,
           [utils.asGridCoord(1, 5)]: true,
           [utils.asGridCoord(1, 2)]: true,
           [utils.asGridCoord(3, 1)]: true,
           [utils.asGridCoord(11, 3)]: true,
           [utils.asGridCoord(19, 2)]: true,
           [utils.asGridCoord(19, 3)]: true,
           [utils.asGridCoord(19, 4)]: true,
           [utils.asGridCoord(19, 5)]: true,
           [utils.asGridCoord(19, 6)]: true,
           [utils.asGridCoord(12, 9)]: true,
           [utils.asGridCoord(13, 9)]: true,
           [utils.asGridCoord(14, 9)]: true,
           [utils.asGridCoord(15, 9)]: true,
           [utils.asGridCoord(16, 9)]: true,
           [utils.asGridCoord(17, 9)]: true,
           [utils.asGridCoord(18, 9)]: true,
           [utils.asGridCoord(19, 9)]: true,
           [utils.asGridCoord(17, 2)]: true,
           [utils.asGridCoord(10, 8)]: true,
           [utils.asGridCoord(10, 6)]: true,
           [utils.asGridCoord(10, 2)]: true,
           [utils.asGridCoord(15, 3)]: true,
           [utils.asGridCoord(14, 3)]: true,
           [utils.asGridCoord(13, 3)]: true,
           [utils.asGridCoord(12, 2)]: true,
           [utils.asGridCoord(18, 3)]: true,
           [utils.asGridCoord(20, 7)]: true,
           [utils.asGridCoord(20, 8)]: true,
        },
    },
    KorytarzLewy: {
        id: "KorytarzLewy",
        lowerSrc: "images/maps/KorytarzLewyLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                useShadow: true,
                x: utils.withGrid(24),
                y: utils.withGrid(5),
            }),
            ziomek: new Person({
                x: utils.withGrid(21),
                y: utils.withGrid(9),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/ziomek2.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: "Czy znasz historię o niemym Michałku, który żuł gumę tak długo, aż oślepł?",
                                faceHero: "ziomek"
                            },
                            {
                                who: "ziomek",
                                type: "stand",
                                direction: "left",
                                time: 500
                            },
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: "*Ziomek nie kontaktuje*"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "left",
                        time: 800
                    },
                ]
            }),
            ziomek2: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(6),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/ziomek3.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ziomek2",
                                type: "textMessage",
                                text: "Zapytaj się czy dzisiaj bilard",
                                faceHero: "ziomek2"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "left",
                        time: 2000
                    },
                ]
            }),
            s29: new Person({
                x: utils.withGrid(12),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "s29",
                                type: "textMessage",
                                text: '"Sala 29"'
                            },
                       ]
                   }
               ],
            }),
            s30: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "s30",
                                type: "textMessage",
                                text: '"Sala 30"'
                            },
                       ]
                   }
               ],
            }),
            wc: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "wc",
                                type: "textMessage",
                                text: '"Toaleta"'
                            },
                       ]
                   }
               ],
            }),
            dezynfekcja: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "dezynfekcja",
                                type: "textMessage",
                                text: '*mmmm dezynkfekcja*'
                            },
                       ]
                   }
               ],
            }),
            s30Drzwi: new Person({
                x: utils.withGrid(13),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/Objects/door.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "S30",
                                x: utils.withGrid(4),
                                y: utils.withGrid(11),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            s29Drzwi: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/Objects/door.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "S29",
                                x: utils.withGrid(4),
                                y: utils.withGrid(11),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            wcDrzwi: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/Objects/door.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "Toilet",
                                x: utils.withGrid(3),
                                y: utils.withGrid(12),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            szatniaMDrzwi: new Person({
                x: utils.withGrid(1),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/Objects/door_left.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "SzatniaM",
                                x: utils.withGrid(11),
                                y: utils.withGrid(4),
                                direction: "left"
                            },
                       ]
                   },
               ],
            }),
            szatniaDDrzwi: new Person({
                x: utils.withGrid(1),
                y: utils.withGrid(9),
                counter: 0,
                src: "images/Objects/door_left.png",
                talking: [
                    {
                        events: [
                            {
                                who: "szatniaDDrzwi",
                                type: "textMessage",
                                text: 'Zamknięte...'
                            },
                       ]
                   },
               ],
            }),
            kantorekDrzwi: new Person({
                x: utils.withGrid(1),
                y: utils.withGrid(11),
                counter: 0,
                src: "images/Objects/door_left.png",
                talking: [
                    {
                        events: [
                            {
                                who: "kantorekDrzwi",
                                type: "textMessage",
                                text: 'Zamknięte...'
                            },
                       ]
                   },
               ],
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(24, 4)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "School",
                            x: utils.withGrid(1),
                            y: utils.withGrid(3),
                            direction: "right"
                        },
                    ]
                }
            ],
                [utils.asGridCoord(24, 5)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "School",
                            x: utils.withGrid(1),
                            y: utils.withGrid(4),
                            direction: "right"
                        },
                    ]
                }
            ],
             [utils.asGridCoord(10, 6)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Szafki2",
                            x: utils.withGrid(7),
                            y: utils.withGrid(0),
                            direction: "down"
                        },
                    ]
                }
            ],
             [utils.asGridCoord(14, 6)]: [
                {
                    events: [
                        {
                            type: "textMessage",
                            text: 'Zamknięte...'
                        },
                        {
                            who: "hero",
                            type: "walk",
                            direction: "up"
                        }
                    ]
                }
            ],

        },
        walls: {
           [utils.asGridCoord(23, 3)]: true,
           [utils.asGridCoord(10, 7)]: true,
           [utils.asGridCoord(25, 4)]: true,
           [utils.asGridCoord(25, 5)]: true,
           [utils.asGridCoord(24, 3)]: true,
           [utils.asGridCoord(20, 3)]: true,
           [utils.asGridCoord(19, 3)]: true,
           [utils.asGridCoord(18, 3)]: true,
           [utils.asGridCoord(15, 3)]: true,
           [utils.asGridCoord(14, 3)]: true,
           [utils.asGridCoord(12, 3)]: true,
           [utils.asGridCoord(11, 3)]: true,
           [utils.asGridCoord(9, 3)]: true,
           [utils.asGridCoord(7, 3)]: true,
           [utils.asGridCoord(6, 3)]: true,
           [utils.asGridCoord(5, 3)]: true,
           [utils.asGridCoord(4, 3)]: true,
           [utils.asGridCoord(3, 3)]: true,
           [utils.asGridCoord(0, 4)]: true,
           [utils.asGridCoord(0, 5)]: true,
           [utils.asGridCoord(1, 3)]: true,
           [utils.asGridCoord(1, 6)]: true,
           [utils.asGridCoord(1, 8)]: true,
           [utils.asGridCoord(1, 10)]: true,
           [utils.asGridCoord(1, 12)]: true,
           [utils.asGridCoord(15, 2)]: true,
           [utils.asGridCoord(18, 2)]: true,
           [utils.asGridCoord(4, 12)]: true,
           [utils.asGridCoord(5, 11)]: true,
           [utils.asGridCoord(5, 10)]: true,
           [utils.asGridCoord(4, 9)]: true,
           [utils.asGridCoord(4, 8)]: true,
           [utils.asGridCoord(4, 7)]: true,
           [utils.asGridCoord(4, 6)]: true,
           [utils.asGridCoord(5, 6)]: true,
           [utils.asGridCoord(6, 6)]: true,
           [utils.asGridCoord(7, 6)]: true,
           [utils.asGridCoord(8, 6)]: true,
           [utils.asGridCoord(9, 6)]: true,
           [utils.asGridCoord(11, 6)]: true,
           [utils.asGridCoord(12, 6)]: true,
           [utils.asGridCoord(13, 6)]: true,
           [utils.asGridCoord(15, 6)]: true,
           [utils.asGridCoord(16, 6)]: true,
           [utils.asGridCoord(17, 6)]: true,
           [utils.asGridCoord(17, 7)]: true,
           [utils.asGridCoord(17, 8)]: true,
           [utils.asGridCoord(17, 9)]: true,
           [utils.asGridCoord(17, 10)]: true,
           [utils.asGridCoord(18, 11)]: true,
           [utils.asGridCoord(21, 11)]: true,
           [utils.asGridCoord(23, 6)]: true,
           [utils.asGridCoord(24, 6)]: true,
           [utils.asGridCoord(22, 6)]: true,
           [utils.asGridCoord(22, 7)]: true,
           [utils.asGridCoord(22, 8)]: true,
           [utils.asGridCoord(22, 9)]: true,
           [utils.asGridCoord(22, 10)]: true,
          [utils.asGridCoord(19, 6)]: true,
           [utils.asGridCoord(19, 7)]: true,
           [utils.asGridCoord(19, 8)]: true,
           [utils.asGridCoord(19, 9)]: true,
           [utils.asGridCoord(19, 10)]: true,
            [utils.asGridCoord(20, 6)]: true,
           [utils.asGridCoord(20, 7)]: true,
           [utils.asGridCoord(20, 8)]: true,
           [utils.asGridCoord(20, 9)]: true,
           [utils.asGridCoord(20, 10)]: true,
           [utils.asGridCoord(3, 7)]: true,
           [utils.asGridCoord(3, 8)]: true,
           [utils.asGridCoord(3, 9)]: true,
           [utils.asGridCoord(2, 2)]: true,
           [utils.asGridCoord(8, 2)]: true,
           [utils.asGridCoord(13, 2)]: true,
           [utils.asGridCoord(0, 7)]: true,
        },
    },
    Toilet: {
        id: "Toilet",
        lowerSrc: "images/maps/ToiletLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            ziomek: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(2),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/ziomek3.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: "Masz ognia?",
                                faceHero: "ziomek"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "down",
                        time: 800
                    },
                ]
            }),
            ziomek2: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(3),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/ziomek2.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ziomek2",
                                type: "textMessage",
                                text: "Kto jara ciasteczkowego ten gej",
                                faceHero: "ziomek2"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "left",
                        time: 800
                    },
                ]
            }),
            wcDrzwi: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(7),
                counter: 0,
                movePixels: true,
                src: "images/Objects/toilet_door.png",
                talking: [
                    {
                        events: [
                            {
                                who: "wcDrzwi",
                                map: "Toilet",
                                type: "open",
                                src: 'images/Objects/toilet_door_opened.png'
                            },
                       ]
                   },
                    {
                        events: [
                            {
                                who: "wcDrzwi",
                                map: "Toilet",
                                type: "open",
                                src: 'images/Objects/toilet_door.png'
                            },
                       ]
                   }
               ],
            }),
            wcDrzwi2: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(5),
                counter: 0,
                movePixels: true,
                src: "images/Objects/toilet_door.png",
                talking: [
                    {
                        events: [
                            {
                                who: "wcDrzwi2",
                                map: "Toilet",
                                type: "open",
                                src: 'images/Objects/toilet_door_opened.png'
                            },
                       ]
                   },
                    {
                        events: [
                            {
                                who: "wcDrzwi2",
                                map: "Toilet",
                                type: "open",
                                src: 'images/Objects/toilet_door.png'
                            },
                       ]
                   }
               ],
            }),
            cigs: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(7),
                walkable: true,
                pickUp: true,
                counter: 0,
                src: "images/objects/cigs.png",
                talking: [
                    {
                        events: [
                            {
                                who: "cigs",
                                type: "textMessage",
                                text: 'Znalazłeś "kiepy"!!'
                            },
                            {
                                who: "cigs",
                                type: "stand",
                                direction: "left",
                                time: 200
                            },
                       ]
                   }
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(3),
                y: utils.withGrid(11),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(3, 12)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(2),
                            y: utils.withGrid(4),
                            direction: "left"
                        },
                    ]
                }
            ],
        },
        walls: {
           [utils.asGridCoord(3, 13)]: true,
           [utils.asGridCoord(2, 12)]: true,
           [utils.asGridCoord(4, 12)]: true,
           [utils.asGridCoord(1, 11)]: true,
           [utils.asGridCoord(1, 10)]: true,
           [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(5, 11)]: true,
           [utils.asGridCoord(5, 10)]: true,
           [utils.asGridCoord(5, 9)]: true,
           [utils.asGridCoord(2, 8)]: true,
           [utils.asGridCoord(4, 8)]: true,
           [utils.asGridCoord(1, 7)]: true,
           [utils.asGridCoord(1, 6)]: true,
           [utils.asGridCoord(1, 5)]: true,
           [utils.asGridCoord(1, 4)]: true,
           [utils.asGridCoord(1, 3)]: true,
           [utils.asGridCoord(1, 2)]: true,
           [utils.asGridCoord(2, 1)]: true,
           [utils.asGridCoord(3, 1)]: true,
           [utils.asGridCoord(4, 1)]: true,
           [utils.asGridCoord(5, 1)]: true,
           [utils.asGridCoord(6, 1)]: true,
           [utils.asGridCoord(7, 2)]: true,
           [utils.asGridCoord(7, 3)]: true,
           [utils.asGridCoord(7, 4)]: true,
           [utils.asGridCoord(7, 5)]: true,
           [utils.asGridCoord(7, 6)]: true,
           [utils.asGridCoord(7, 7)]: true,
           [utils.asGridCoord(5, 8)]: true,
           [utils.asGridCoord(6, 8)]: true,
           [utils.asGridCoord(2, 11)]: true,
           [utils.asGridCoord(4, 9)]: true,
           [utils.asGridCoord(4, 10)]: true,
           [utils.asGridCoord(4, 11)]: true,
           [utils.asGridCoord(6, 5)]: true,
           [utils.asGridCoord(6, 7)]: true,
           [utils.asGridCoord(4, 6)]: true,
           [utils.asGridCoord(5, 6)]: true,
           [utils.asGridCoord(6, 6)]: true,
           [utils.asGridCoord(4, 4)]: true,
           [utils.asGridCoord(5, 4)]: true,
           [utils.asGridCoord(6, 4)]: true,
        }
    },
    S30: {
        id: "S30",
        lowerSrc: "images/maps/S30Lower.png",
        upperSrc: "images/maps/S30Upper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(10),
                useShadow: true
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(4, 11)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(13),
                            y: utils.withGrid(4),
                            direction: "down"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(3, 11)]: true,
            [utils.asGridCoord(5, 11)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(2, 9)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(3, 10)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(6, 9)]: true,
            [utils.asGridCoord(7, 9)]: true,
            [utils.asGridCoord(8, 9)]: true,
            [utils.asGridCoord(9, 9)]: true,
            [utils.asGridCoord(10, 9)]: true,
            [utils.asGridCoord(11, 9)]: true,
            [utils.asGridCoord(12, 9)]: true,
            [utils.asGridCoord(13, 9)]: true,
            [utils.asGridCoord(13, 10)]: true,
            [utils.asGridCoord(14, 10)]: true,
            [utils.asGridCoord(15, 10)]: true,
            [utils.asGridCoord(15, 8)]: true,
            [utils.asGridCoord(15, 7)]: true,
            [utils.asGridCoord(15, 6)]: true,
            [utils.asGridCoord(15, 5)]: true,
            [utils.asGridCoord(14, 4)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(2, 4)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(5, 4)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(7, 4)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(9, 4)]: true,
            [utils.asGridCoord(10, 4)]: true,
            [utils.asGridCoord(11, 4)]: true,
            [utils.asGridCoord(12, 4)]: true,
            [utils.asGridCoord(13, 4)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(2, 6)]: true,
            [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(4, 6)]: true,
            [utils.asGridCoord(5, 6)]: true,
            [utils.asGridCoord(6, 6)]: true,
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(9, 6)]: true,
            [utils.asGridCoord(10, 6)]: true,
            [utils.asGridCoord(11, 6)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(2, 7)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(4, 7)]: true,
            [utils.asGridCoord(5, 7)]: true,
            [utils.asGridCoord(6, 7)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(9, 7)]: true,
            [utils.asGridCoord(10, 7)]: true,
            [utils.asGridCoord(11, 7)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 5)]: true,
            [utils.asGridCoord(16, 9)]: true,
            [utils.asGridCoord(4, 12)]: true,
        }
    },
    S29: {
        id: "S29",
        lowerSrc: "images/maps/S30Lower.png",
        upperSrc: "images/maps/S30Upper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(10),
                useShadow: true
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(4, 11)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(8),
                            y: utils.withGrid(4),
                            direction: "down"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(3, 11)]: true,
            [utils.asGridCoord(5, 11)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(2, 9)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(3, 10)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(6, 9)]: true,
            [utils.asGridCoord(7, 9)]: true,
            [utils.asGridCoord(8, 9)]: true,
            [utils.asGridCoord(9, 9)]: true,
            [utils.asGridCoord(10, 9)]: true,
            [utils.asGridCoord(11, 9)]: true,
            [utils.asGridCoord(12, 9)]: true,
            [utils.asGridCoord(13, 9)]: true,
            [utils.asGridCoord(13, 10)]: true,
            [utils.asGridCoord(14, 10)]: true,
            [utils.asGridCoord(15, 10)]: true,
            [utils.asGridCoord(15, 8)]: true,
            [utils.asGridCoord(15, 7)]: true,
            [utils.asGridCoord(15, 6)]: true,
            [utils.asGridCoord(15, 5)]: true,
            [utils.asGridCoord(14, 4)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(2, 4)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(5, 4)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(7, 4)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(9, 4)]: true,
            [utils.asGridCoord(10, 4)]: true,
            [utils.asGridCoord(11, 4)]: true,
            [utils.asGridCoord(12, 4)]: true,
            [utils.asGridCoord(13, 4)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(2, 6)]: true,
            [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(4, 6)]: true,
            [utils.asGridCoord(5, 6)]: true,
            [utils.asGridCoord(6, 6)]: true,
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(9, 6)]: true,
            [utils.asGridCoord(10, 6)]: true,
            [utils.asGridCoord(11, 6)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(2, 7)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(4, 7)]: true,
            [utils.asGridCoord(5, 7)]: true,
            [utils.asGridCoord(6, 7)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(9, 7)]: true,
            [utils.asGridCoord(10, 7)]: true,
            [utils.asGridCoord(11, 7)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 5)]: true,
            [utils.asGridCoord(16, 9)]: true,
            [utils.asGridCoord(4, 12)]: true,
        }
    },
    SzatniaM: {
        id: "SzatniaM",
        lowerSrc: "images/maps/SzatniaMLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            wcDrzwi: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(8),
                counter: 0,
                movePixels: true,
                src: "images/Objects/toilet_door.png",
                talking: [
                    {
                        events: [
                            {
                                who: "wcDrzwi",
                                map: "SzatniaM",
                                type: "open",
                                src: 'images/Objects/toilet_door_opened.png'
                            },
                       ]
                   },
                    {
                        events: [
                            {
                                who: "wcDrzwi",
                                map: "SzatniaM",
                                type: "open",
                                src: 'images/Objects/toilet_door.png'
                            },
                       ]
                   }
               ],
            }),
            wcDrzwi2: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(10),
                counter: 0,
                movePixels: true,
                src: "images/Objects/toilet_door.png",
                talking: [
                    {
                        events: [
                            {
                                who: "wcDrzwi2",
                                map: "SzatniaM",
                                type: "open",
                                src: 'images/Objects/toilet_door_opened.png'
                            },
                       ]
                   },
                    {
                        events: [
                            {
                                who: "wcDrzwi2",
                                map: "SzatniaM",
                                type: "open",
                                src: 'images/Objects/toilet_door.png'
                            },
                       ]
                   }
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(10),
                y: utils.withGrid(4),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(11, 4)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(2),
                            y: utils.withGrid(7),
                            direction: "right"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(10, 6)]: true,
            [utils.asGridCoord(11, 5)]: true,
            [utils.asGridCoord(11, 3)]: true,
            [utils.asGridCoord(12, 4)]: true,
            [utils.asGridCoord(3, 3)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(6, 3)]: true,
            [utils.asGridCoord(7, 3)]: true,
            [utils.asGridCoord(8, 3)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(10, 3)]: true,
            [utils.asGridCoord(2, 2)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(0, 6)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(4, 7)]: true,
            [utils.asGridCoord(5, 7)]: true,
            [utils.asGridCoord(6, 7)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(9, 7)]: true,
            [utils.asGridCoord(5, 8)]: true,
            [utils.asGridCoord(5, 10)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(1, 10)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 11)]: true,
            [utils.asGridCoord(0, 12)]: true,
            [utils.asGridCoord(1, 13)]: true,
            [utils.asGridCoord(2, 13)]: true,
            [utils.asGridCoord(3, 13)]: true,
            [utils.asGridCoord(4, 13)]: true,
            [utils.asGridCoord(5, 13)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(4, 9)]: true,
            [utils.asGridCoord(3, 11)]: true,
            [utils.asGridCoord(4, 11)]: true,
            [utils.asGridCoord(5, 11)]: true,
            [utils.asGridCoord(6, 12)]: true,
            [utils.asGridCoord(5, 13)]: true,
        }
    },
    Szafki2: {
        id: "Szafki2",
        lowerSrc: "images/maps/Szafki2Lower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(7),
                y: utils.withGrid(1),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(7, 0)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(10),
                            y: utils.withGrid(6),
                            direction: "up"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(9, 2)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(8, 1)]: true,
            [utils.asGridCoord(8, 0)]: true,
            [utils.asGridCoord(7, -1)]: true,
            [utils.asGridCoord(6, 0)]: true,
            [utils.asGridCoord(6, 1)]: true,
            [utils.asGridCoord(6, 2)]: true,
            [utils.asGridCoord(5, 2)]: true,
            [utils.asGridCoord(4, 2)]: true,
            [utils.asGridCoord(3, 2)]: true,
            [utils.asGridCoord(2, 2)]: true,
            [utils.asGridCoord(1, 2)]: true,
            [utils.asGridCoord(0, 3)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(1, 8)]: true,
            [utils.asGridCoord(2, 9)]: true,
            [utils.asGridCoord(4, 9)]: true,
            [utils.asGridCoord(6, 9)]: true,
            [utils.asGridCoord(7, 9)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(3, 5)]: true,
            [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(3, 8)]: true,
            [utils.asGridCoord(5, 4)]: true,
            [utils.asGridCoord(5, 5)]: true,
            [utils.asGridCoord(5, 6)]: true,
            [utils.asGridCoord(5, 7)]: true,
            [utils.asGridCoord(5, 8)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(8, 5)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(8, 8)]: true,
        },
    },
    KorytarzPrawy: {
        id: "KorytarzPrawy",
        lowerSrc: "images/maps/KorytarzPrawyLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            s16Drzwi: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/Objects/door.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "S16",
                                x: utils.withGrid(4),
                                y: utils.withGrid(11),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            BibliotekaDrzwi: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/Objects/door.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "Biblioteka",
                                x: utils.withGrid(6),
                                y: utils.withGrid(10),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            BiuroGDrzwi: new Person({
                x: utils.withGrid(23),
                y: utils.withGrid(10),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_down.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "BiuroG",
                                x: utils.withGrid(2),
                                y: utils.withGrid(1),
                                direction: "down"
                            },
                       ]
                   },
               ],
            }),
            IndDrzwi: new Person({
                x: utils.withGrid(14),
                y: utils.withGrid(10),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_down.png",
                talking: [
                    {
                        events: [
                            {
                                who: "s16",
                                type: "textMessage",
                                text: '"Nauczanie Indywidualne - Nie przeszkadzać!"'
                            },
                       ]
                   },
               ],
            }),
            s14Drzwi: new Person({
                x: utils.withGrid(15),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/Objects/door.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "S14"
                            },
                       ]
                   },
               ],
            }),
            pielegniarkaDrzwi: new Person({
                x: utils.withGrid(18),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/Objects/door.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "Pielegniarka",
                                x: utils.withGrid(2),
                                y: utils.withGrid(9),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            s16: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "s16",
                                type: "textMessage",
                                text: '"Sala 16"'
                            },
                       ]
                   }
               ],
            }),
            biblioteka: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "biblioteka",
                                type: "textMessage",
                                text: '"Biblioteka"'
                            },
                       ]
                   }
               ],
            }),
            s14: new Person({
                x: utils.withGrid(14),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "s14",
                                type: "textMessage",
                                text: '"Sala 14"'
                            },
                       ]
                   }
               ],
            }),
            pielegniarka: new Person({
                x: utils.withGrid(17),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "pielegniarka",
                                type: "textMessage",
                                text: '"Pielegniarka (Czynne 11:00-11:30)"'
                            },
                       ]
                   }
               ],
            }),
            kasjerka: new Person({
                x: utils.withGrid(22),
                y: utils.withGrid(4),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/npc1.png",
            }),
            kupowanie: new Person({
                x: utils.withGrid(22),
                y: utils.withGrid(5),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "kasjerka",
                                type: "textMessage",
                                text: 'Może jakiegoś rogala?'
                            },
                       ]
                   }
               ],
            }),
            ziomek: new Person({
                x: utils.withGrid(13),
                y: utils.withGrid(8),
                counter: 0,
                useShadow: true,
                src: "images/characters/people/ziomek4.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: 'Errors (3000) method "talking" not found.'
                            },
                       ]
                   }
               ],
            }),
            ziomek2: new Person({
                x: utils.withGrid(24),
                y: utils.withGrid(8),
                counter: 0,
                direction: "left",
                useShadow: true,
                src: "images/characters/people/npc5.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ziomek2",
                                type: "textMessage",
                                text: 'Lorem Ipsum?',
                                faceHero: "ziomek2"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "left",
                        time: 2000
                    },
                ]
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(0),
                y: utils.withGrid(8),
                useShadow: true
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(0, 8)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "School",
                            x: utils.withGrid(19),
                            y: utils.withGrid(7),
                            direction: "left"
                        },
                    ]
                }
            ],
            [utils.asGridCoord(0, 9)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "School",
                            x: utils.withGrid(19),
                            y: utils.withGrid(8),
                            direction: "left"
                        },
                    ]
                }
            ],
        },
        walls: {
           [utils.asGridCoord(0, 7)]: true,
           [utils.asGridCoord(1, 7)]: true,
           [utils.asGridCoord(4, 7)]: true,
           [utils.asGridCoord(5, 7)]: true,
           [utils.asGridCoord(6, 7)]: true,
           [utils.asGridCoord(9, 7)]: true,
           [utils.asGridCoord(10, 7)]: true,
           [utils.asGridCoord(11, 7)]: true,
           [utils.asGridCoord(12, 7)]: true,
           [utils.asGridCoord(13, 7)]: true,
           [utils.asGridCoord(16, 7)]: true,
           [utils.asGridCoord(19, 7)]: true,
           [utils.asGridCoord(20, 7)]: true,
           [utils.asGridCoord(20, 6)]: true,
           [utils.asGridCoord(21, 5)]: true,
           [utils.asGridCoord(22, 5)]: true,
           [utils.asGridCoord(23, 5)]: true,
           [utils.asGridCoord(24, 6)]: true,
           [utils.asGridCoord(24, 7)]: true,
           [utils.asGridCoord(25, 8)]: true,
           [utils.asGridCoord(25, 9)]: true,
           [utils.asGridCoord(24, 10)]: true,
           [utils.asGridCoord(22, 10)]: true,
           [utils.asGridCoord(23, 11)]: true,
           [utils.asGridCoord(21, 10)]: true,
           [utils.asGridCoord(20, 10)]: true,
           [utils.asGridCoord(20, 11)]: true,
           [utils.asGridCoord(20, 12)]: true,
           [utils.asGridCoord(20, 13)]: true,
           [utils.asGridCoord(19, 10)]: true,
           [utils.asGridCoord(17, 14)]: true,
           [utils.asGridCoord(18, 14)]: true,
           [utils.asGridCoord(19, 14)]: true,
           [utils.asGridCoord(16, 10)]: true,
           [utils.asGridCoord(16, 11)]: true,
           [utils.asGridCoord(16, 12)]: true,
           [utils.asGridCoord(16, 13)]: true,
           [utils.asGridCoord(0, 10)]: true,
           [utils.asGridCoord(1, 10)]: true,
           [utils.asGridCoord(2, 10)]: true,
           [utils.asGridCoord(3, 10)]: true,
           [utils.asGridCoord(4, 10)]: true,
           [utils.asGridCoord(5, 10)]: true,
           [utils.asGridCoord(6, 10)]: true,
           [utils.asGridCoord(7, 10)]: true,
           [utils.asGridCoord(8, 10)]: true,
           [utils.asGridCoord(9, 10)]: true,
           [utils.asGridCoord(10, 10)]: true,
           [utils.asGridCoord(11, 10)]: true,
           [utils.asGridCoord(12, 10)]: true,
           [utils.asGridCoord(13, 10)]: true,
           [utils.asGridCoord(14, 10)]: true,
           [utils.asGridCoord(15, 10)]: true,
           [utils.asGridCoord(-1, 8)]: true,
           [utils.asGridCoord(-1, 9)]: true,
        }
    },
    Biblioteka: {
        id: "Biblioteka",
        lowerSrc: "images/maps/BibliotekaLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            bibliotekarka1: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(8),
                counter: 0,
                useShadow: true,
                src: "images/characters/people/npc1.png",
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "left",
                        time: 100000
                    },
                ]
            }),
            bibliotekarka1_talking: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(8),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "bibliotekarka1",
                                type: "textMessage",
                                text: 'Lorem Ipsum dolor sit amet'
                            },
                       ]
                   }
               ],
            }),
            bibliotekarka2: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(2),
                counter: 0,
                src: "images/characters/people/npc6.png",
                talking: [
                    {
                        events: [
                            {
                                who: "bibliotekarka2",
                                type: "textMessage",
                                text: 'Lorem Ipsum dolor sit amet'
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "right",
                        time: 100000
                    },
                ]
            }),
            bibliotekarka2_talking: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(2),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "bibliotekarka2",
                                type: "textMessage",
                                text: 'Lorem Ipsum dolor sit amet'
                            },
                       ]
                   }
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(6),
                y: utils.withGrid(10),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(6, 10)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(8),
                            y: utils.withGrid(8),
                            direction: "down"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(2, 10)]: true,
            [utils.asGridCoord(5, 10)]: true,
            [utils.asGridCoord(7, 10)]: true,
            [utils.asGridCoord(7, 9)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(8, 5)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(8, 2)]: true,
            [utils.asGridCoord(7, 2)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(6, 1)]: true,
            [utils.asGridCoord(5, 2)]: true,
            [utils.asGridCoord(3, 2)]: true,
            [utils.asGridCoord(2, 2)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(1, 8)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(4, 9)]: true,
            [utils.asGridCoord(5, 9)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(3, 5)]: true,
            [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(4, 5)]: true,
            [utils.asGridCoord(4, 6)]: true,
            [utils.asGridCoord(4, 7)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(6, 5)]: true,
            [utils.asGridCoord(6, 6)]: true,
            [utils.asGridCoord(6, 11)]: true,
        },
    },
    Pielegniarka: {
        id: "Pielegniarka",
        lowerSrc: "images/maps/PielegniarkaLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            pielegniarka: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                counter: 0,
                useShadow: true,
                src: "images/characters/people/npc6.png",
                talking: [
                    {
                        events: [
                            {
                                who: "pielegniarka",
                                type: "textMessage",
                                text: 'Lorem Ipsum dolor sit amet'
                            },
                       ]
                   }
               ],
            }),
            pielegniarka_talking: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "pielegniarka",
                                type: "textMessage",
                                text: 'Lorem Ipsum dolor sit amet'
                            },
                       ]
                   }
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(9),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(2, 9)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(18),
                            y: utils.withGrid(8),
                            direction: "down"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(2, 10)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(3, 5)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(1, 1)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 2)]: true,
            [utils.asGridCoord(0, 3)]: true,
            [utils.asGridCoord(0, 4)]: true,
            [utils.asGridCoord(4, 6)]: true,
            [utils.asGridCoord(4, 8)]: true,
        },
    },
    S16: {
        id: "S16",
        lowerSrc: "images/maps/S16Lower.png",
        upperSrc: "images/maps/S30Upper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(4),
                y: utils.withGrid(10),
                useShadow: true
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(4, 11)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(2),
                            y: utils.withGrid(8),
                            direction: "down"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(3, 11)]: true,
            [utils.asGridCoord(5, 11)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(2, 9)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(3, 10)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(6, 9)]: true,
            [utils.asGridCoord(7, 9)]: true,
            [utils.asGridCoord(8, 9)]: true,
            [utils.asGridCoord(9, 9)]: true,
            [utils.asGridCoord(10, 9)]: true,
            [utils.asGridCoord(11, 9)]: true,
            [utils.asGridCoord(12, 9)]: true,
            [utils.asGridCoord(13, 9)]: true,
            [utils.asGridCoord(13, 10)]: true,
            [utils.asGridCoord(14, 10)]: true,
            [utils.asGridCoord(15, 10)]: true,
            [utils.asGridCoord(15, 8)]: true,
            [utils.asGridCoord(15, 7)]: true,
            [utils.asGridCoord(15, 6)]: true,
            [utils.asGridCoord(15, 5)]: true,
            [utils.asGridCoord(14, 4)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(2, 4)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(5, 4)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(7, 4)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(9, 4)]: true,
            [utils.asGridCoord(10, 4)]: true,
            [utils.asGridCoord(11, 4)]: true,
            [utils.asGridCoord(12, 4)]: true,
            [utils.asGridCoord(13, 4)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(2, 6)]: true,
            [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(4, 6)]: true,
            [utils.asGridCoord(5, 6)]: true,
            [utils.asGridCoord(6, 6)]: true,
            [utils.asGridCoord(7, 6)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(9, 6)]: true,
            [utils.asGridCoord(10, 6)]: true,
            [utils.asGridCoord(11, 6)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(2, 7)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(4, 7)]: true,
            [utils.asGridCoord(5, 7)]: true,
            [utils.asGridCoord(6, 7)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(9, 7)]: true,
            [utils.asGridCoord(10, 7)]: true,
            [utils.asGridCoord(11, 7)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 5)]: true,
            [utils.asGridCoord(16, 9)]: true,
            [utils.asGridCoord(4, 12)]: true,
        }
    },
    BiuroG: {
        id: "BiuroG",
        lowerSrc: "images/maps/BiuroGLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            g: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(6),
                counter: 0,
                useShadow: true,
                src: "images/characters/people/npc1.png",
                talking: [
                    {
                        events: [
                            {
                                who: "g",
                                type: "textMessage",
                                text: 'Lorem Ipsum dolor sit amet',
                                faceHero: "g"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "right",
                        time: 2000
                    },
                ]
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(1),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(2, 1)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(23),
                            y: utils.withGrid(9),
                            direction: "up"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(1, 2)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(3, 2)]: true,
            [utils.asGridCoord(3, 1)]: true,
            [utils.asGridCoord(1, 1)]: true,
            [utils.asGridCoord(2, 0)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(3, 5)]: true,
        },
    },
}
