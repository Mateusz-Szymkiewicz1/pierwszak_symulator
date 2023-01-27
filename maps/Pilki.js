window.OverworldMaps.Pilki = {
        id: "Pilki",
        lowerSrc: "images/maps/PilkiLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            placeholder: new Person({
               src: "images/maps/KitchenUpper.png"
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(1),
                y: utils.withGrid(4),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
               [utils.asGridCoord(1, 4)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "SalaG",
                            x: utils.withGrid(11),
                            y: utils.withGrid(3),
                            direction: "left"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(0, 4)]: true,
            [utils.asGridCoord(2, 6)]: true,
            [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(4, 5)]: true,
            [utils.asGridCoord(2, 2)]: true,
            [utils.asGridCoord(3, 2)]: true,
        },
    };