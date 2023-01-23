window.OverworldMaps.Toilet = {
        id: "Toilet",
        lowerSrc: "images/maps/ToiletLower.png",
        upperSrc: "images/maps/ToiletUpper.png",
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
                            {who: "ziomek",type: "talk",},
                       ]
                   }
               ],
                behaviorLoop: [
                    {type: "stand",direction: "down",time: 800},
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
                    {type: "stand",direction: "left",time: 800},
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
                            {who: "wcDrzwi",map: "Toilet",type: "open",src: 'images/Objects/toilet_door_opened.png'},
                       ]
                   },
                    {
                        events: [
                            {who: "wcDrzwi",map: "Toilet",type: "open",src: 'images/Objects/toilet_door.png'},
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
                            {who: "wcDrzwi2",map: "Toilet",type: "open",src: 'images/Objects/toilet_door_opened.png'},
                       ]
                   },
                    {
                        events: [
                            {who: "wcDrzwi2",map: "Toilet",type: "open",src: 'images/Objects/toilet_door.png'},
                       ]
                   }
               ],
            }),
            Kiepy: new Person({
                id: "Kiepy",
                x: utils.withGrid(5),
                y: utils.withGrid(7),
                walkable: true,
                pickUp: true,
                counter: 0,
                movePixels: true,
                src: "images/objects/cigs.png",
                talking: [
                    {
                        events: [
                            {who: "Kiepy",type: "textMessage",text: 'Znalazłeś "kiepy"!!'},
                            {who: "Kiepy",type: "stand",direction: "left",time: 200},
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
                            direction: "down"
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
        },
        start_func: function(){
            const progress = new Progress();
            progress.load();
            progress.heroInventory.forEach(e =>{
                if(e.id == "Kiepy"){
                    delete window.OverworldMaps.Toilet.gameObjects.Kiepy;
                }
            })
        }
    };