window.OverworldMaps.Bilard = {
        id: "Bilard",
        lowerSrc: "images/maps/BilardLower.png",
        gameObjects: {
            placeholder: new Person({
               src: "images/maps/blank.png"
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(1),
                y: utils.withGrid(9),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
               [utils.asGridCoord(1, 9)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "OZE",
                            x: utils.withGrid(6),
                            y: utils.withGrid(20),
                            direction: "left"
                        },
                    ]
                }
            ],
        },
        walls: {
        [utils.asGridCoord(4, 8)]: true,
        [utils.asGridCoord(5, 8)]: true,
        [utils.asGridCoord(6, 8)]: true,
        [utils.asGridCoord(4, 9)]: true,
        [utils.asGridCoord(5, 9)]: true,
        [utils.asGridCoord(6, 9)]: true,
        [utils.asGridCoord(4, 6)]: true,
        [utils.asGridCoord(5, 6)]: true,
        [utils.asGridCoord(6, 6)]: true,
        [utils.asGridCoord(4, 5)]: true,
        [utils.asGridCoord(5, 5)]: true,
        [utils.asGridCoord(6, 5)]: true,
        [utils.asGridCoord(2, 4)]: true,
        [utils.asGridCoord(2, 3)]: true,
        [utils.asGridCoord(4, 3)]: true,
        [utils.asGridCoord(5, 3)]: true,
        [utils.asGridCoord(6, 3)]: true,
        [utils.asGridCoord(7, 3)]: true,
        [utils.asGridCoord(3, 2)]: true,
        [utils.asGridCoord(8,4)]: true,
        [utils.asGridCoord(8,5)]: true,
        [utils.asGridCoord(0,9)]: true,
        [utils.asGridCoord(1,10)]: true,
        [utils.asGridCoord(1,8)]: true,
        [utils.asGridCoord(1,7)]: true,
        [utils.asGridCoord(1,6)]: true,
        [utils.asGridCoord(1,5)]: true,
        [utils.asGridCoord(9,6)]: true,
        [utils.asGridCoord(9,7)]: true,
        [utils.asGridCoord(9,8)]: true,
        [utils.asGridCoord(9,9)]: true,
        [utils.asGridCoord(9,10)]: true,
        [utils.asGridCoord(2,11)]: true,
        [utils.asGridCoord(3,11)]: true,
        [utils.asGridCoord(4,11)]: true,
        [utils.asGridCoord(5,11)]: true,
        [utils.asGridCoord(6,11)]: true,
        [utils.asGridCoord(7,11)]: true,
        [utils.asGridCoord(8,11)]: true,
        },
    };