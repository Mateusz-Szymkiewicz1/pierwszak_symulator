window.OverworldMaps.Pielegniarka = {
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
    };