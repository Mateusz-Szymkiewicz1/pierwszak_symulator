window.OverworldMaps.Szafki2 = {
        id: "Szafki2",
        lowerSrc: "images/maps/Szafki2Lower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(7),
                y: utils.withGrid(1),
                useShadow: true
            })
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
                        }
                    ]
                }
            ]
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
        }
    };