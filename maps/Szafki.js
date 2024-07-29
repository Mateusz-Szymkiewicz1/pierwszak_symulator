window.OverworldMaps.Szafki = {
        id: "Szafki",
        lowerSrc: "images/maps/SzafkiLower.png",
        gameObjects: {
        hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(1),
                useShadow: true
            })
        },
        cutsceneSpaces: {
                [utils.asGridCoord(5, 1)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(18),
                            y: utils.withGrid(6),
                            direction: "up"
                        }
                    ]
                }
            ]
        },
        walls: {
            [utils.asGridCoord(5,0)]: true,
            [utils.asGridCoord(4,1)]: true,
            [utils.asGridCoord(4,2)]: true,
            [utils.asGridCoord(4,3)]: true,
            [utils.asGridCoord(4,5)]: true,
            [utils.asGridCoord(4,6)]: true,
            [utils.asGridCoord(6,1)]: true,
            [utils.asGridCoord(6,2)]: true,
            [utils.asGridCoord(6,3)]: true,
            [utils.asGridCoord(6,5)]: true,
            [utils.asGridCoord(6,6)]: true,
            [utils.asGridCoord(7,5)]: true,
            [utils.asGridCoord(7,3)]: true,
            [utils.asGridCoord(8,2)]: true,
            [utils.asGridCoord(8,3)]: true,
            [utils.asGridCoord(8,5)]: true,
            [utils.asGridCoord(8,6)]: true,
            [utils.asGridCoord(9,1)]: true,
            [utils.asGridCoord(9,7)]: true,
            [utils.asGridCoord(3,2)]: true,
            [utils.asGridCoord(3,3)]: true,
            [utils.asGridCoord(3,6)]: true,
            [utils.asGridCoord(3,5)]: true,
            [utils.asGridCoord(2,1)]: true,
            [utils.asGridCoord(1,2)]: true,
            [utils.asGridCoord(1,3)]: true,
            [utils.asGridCoord(1,4)]: true,
            [utils.asGridCoord(1,5)]: true,
            [utils.asGridCoord(1,6)]: true,
            [utils.asGridCoord(2,7)]: true,
            [utils.asGridCoord(10,2)]: true,
            [utils.asGridCoord(10,3)]: true,
            [utils.asGridCoord(10,5)]: true,
            [utils.asGridCoord(10,6)]: true,
            [utils.asGridCoord(11,3)]: true,
            [utils.asGridCoord(11,2)]: true,
            [utils.asGridCoord(11,5)]: true,
            [utils.asGridCoord(11,6)]: true,
            [utils.asGridCoord(12,1)]: true,
            [utils.asGridCoord(12,7)]: true,
            [utils.asGridCoord(13,1)]: true,
            [utils.asGridCoord(13,7)]: true,
            [utils.asGridCoord(14,2)]: true,
            [utils.asGridCoord(14,3)]: true,
            [utils.asGridCoord(14,4)]: true,
            [utils.asGridCoord(14,5)]: true,
            [utils.asGridCoord(14,6)]: true,
            [utils.asGridCoord(5,7)]: true,
        },
    };