window.OverworldMaps.Pielegniarka = {
        id: "Pielegniarka",
        lowerSrc: "images/maps/PielegniarkaLower.png",
        upperSrc: "images/maps/PielegniarkaUpper.png",
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
                                type: "shop",
                                products: [
                                    {
                                        id: "Apteczka",
                                        price: "50"
                                    },
                                    {
                                        id: "Bandaż",
                                        price: "30"
                                    },
                                    {
                                        id: "Miks.Regeneracji",
                                        price: "20"
                                    },
                                    {
                                        id: "Krople Żołądkowe",
                                        price: "40"
                                    },
                                    {
                                        id: "Miks.Szybkości",
                                        price: "30"
                                    }
                                ]
                            },
                       ]
                   }
               ],
            }),
             Apteczka: new Person({
                id: "Apteczka",
                x: utils.withGrid(3),
                y: utils.withGrid(6),
                walkable: true,
                pickUp: true,
                counter: 0,
                movePixels: true,
                src: "images/objects/medkit.png",
                talking: [
                    {
                        events: [
                            {
                                who: "Apteczka",
                                type: "textMessage",
                                text: 'Znalazłeś "Apteczka"!!'
                            },
                            {
                                who: "Apteczka",
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
    start_func: function(){
        const progress = new Progress();
        progress.load();
        progress.heroInventory.forEach(e =>{
            if(e.id == "Apteczka"){
                delete window.OverworldMaps.Pielegniarka.gameObjects.Apteczka;
            }
        })
    }
    };