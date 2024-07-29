window.OverworldMaps.SalaG = {
        id: "SalaG",
        lowerSrc: "images/maps/SalaGLower.png",
        upperSrc: "images/maps/SalaGUpper.png",
        gameObjects: {
            pilki_d: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(1),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_up.png",
                talking: [
                    {
                        events: [
                            {
                                type: "play_audio",
                                audio: "door_open",
                                speed: 2,
                                volume: 0.2
                            },
                            {
                                type: "changeMap",
                                map: "Pilki",
                                x: utils.withGrid(3),
                                y: utils.withGrid(5),
                                direction: "up" 
                            },
                       ]
                   },
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(7),
                y: utils.withGrid(1),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
            [utils.asGridCoord(7, 1)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(6),
                            y: utils.withGrid(12),
                            direction: "up" 
                        }
                    ]
                }
            ],
            [utils.asGridCoord(8, 1)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(7),
                            y: utils.withGrid(12),
                            direction: "up" 
                        }
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(7, 0)]: true,
            [utils.asGridCoord(8, 0)]: true,
            [utils.asGridCoord(9, 1)]: true,
            [utils.asGridCoord(9, 2)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(9, 4)]: true,
            [utils.asGridCoord(9, 5)]: true,
            [utils.asGridCoord(9, 6)]: true,
            [utils.asGridCoord(9, 7)]: true,
            [utils.asGridCoord(9, 8)]: true,
            [utils.asGridCoord(9, 9)]: true,
            [utils.asGridCoord(9, 10)]: true,
            [utils.asGridCoord(9, 11)]: true,
            [utils.asGridCoord(10, 12)]: true,
            [utils.asGridCoord(3, 13)]: true,
            [utils.asGridCoord(4, 13)]: true,
            [utils.asGridCoord(5, 13)]: true,
            [utils.asGridCoord(6, 13)]: true,
            [utils.asGridCoord(7, 13)]: true,
            [utils.asGridCoord(8, 13)]: true,
            [utils.asGridCoord(9, 13)]: true,
            [utils.asGridCoord(2, 2)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(2, 4)]: true,
            [utils.asGridCoord(2, 5)]: true,
            [utils.asGridCoord(2, 6)]: true,
            [utils.asGridCoord(2, 7)]: true,
            [utils.asGridCoord(2, 8)]: true,
            [utils.asGridCoord(2, 9)]: true,
            [utils.asGridCoord(2, 10)]: true,
            [utils.asGridCoord(2, 11)]: true,
            [utils.asGridCoord(2, 12)]: true,
            [utils.asGridCoord(4, 1)]: true,
            [utils.asGridCoord(5, 1)]: true,
            [utils.asGridCoord(6, 1)]: true,
        },
    };