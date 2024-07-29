window.OverworldMaps.Pilki = {
        id: "Pilki",
        lowerSrc: "images/maps/PilkiLower.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(3),
                y: utils.withGrid(5),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
               [utils.asGridCoord(3, 5)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "SalaG",
                            x: utils.withGrid(3),
                            y: utils.withGrid(2),
                            direction: "down"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(2, 5)]: true,
            [utils.asGridCoord(4, 5)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(5, 4)]: true,
            [utils.asGridCoord(2, 2)]: true,
            [utils.asGridCoord(3, 2)]: true,
            [utils.asGridCoord(4, 2)]: true,
        },
    };