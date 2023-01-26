window.OverworldMaps.SalaG = {
        id: "SalaG",
        lowerSrc: "images/maps/SalaGLower.png",
        upperSrc: "images/maps/SalaGUpper.png",
        gameObjects: {
            placeholder: new Person({
               src: "images/maps/KitchenUpper.png"
            }),
            pilki_d: new Person({
                x: utils.withGrid(12),
                y: utils.withGrid(3),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_right.png",
                talking: [
                    {
                        events: [
                            {
                                type: "do_code",
                                code: `let audio_door = document.querySelector("#audio_door_open");
                                audio_door.playbackRate = 2;
                                audio_door.volume = 0.2*window.sfx_volume;
                                audio_door.play();`
                            },
                            {
                                type: "changeMap",
                                map: "Pilki",
                            },
                       ]
                   },
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(12),
                y: utils.withGrid(7),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
            [utils.asGridCoord(12, 7)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(2),
                            y: utils.withGrid(12),
                            direction: "up" 
                        }
                    ]
                }
            ],
            [utils.asGridCoord(12, 8)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(2),
                            y: utils.withGrid(12),
                            direction: "up" 
                        }
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(13, 7)]: true,
            [utils.asGridCoord(13, 8)]: true,
            [utils.asGridCoord(12, 6)]: true,
            [utils.asGridCoord(12, 5)]: true,
            [utils.asGridCoord(12, 4)]: true,
            [utils.asGridCoord(12, 9)]: true,
            [utils.asGridCoord(2, 9)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(4, 9)]: true,
            [utils.asGridCoord(5, 9)]: true,
            [utils.asGridCoord(6, 9)]: true,
            [utils.asGridCoord(7, 9)]: true,
            [utils.asGridCoord(8, 9)]: true,
            [utils.asGridCoord(9, 9)]: true,
            [utils.asGridCoord(10, 9)]: true,
            [utils.asGridCoord(11, 9)]: true,
            [utils.asGridCoord(0, 9)]: true,
            [utils.asGridCoord(0, 7)]: true,
            [utils.asGridCoord(0, 6)]: true,
            [utils.asGridCoord(0, 5)]: true,
            [utils.asGridCoord(0, 4)]: true,
            [utils.asGridCoord(0, 3)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(1, 10)]: true,
            [utils.asGridCoord(1, 2)]: true,
            [utils.asGridCoord(2, 2)]: true,
            [utils.asGridCoord(3, 2)]: true,
            [utils.asGridCoord(4, 2)]: true,
            [utils.asGridCoord(5, 2)]: true,
            [utils.asGridCoord(6, 2)]: true,
            [utils.asGridCoord(7, 2)]: true,
            [utils.asGridCoord(8, 2)]: true,
            [utils.asGridCoord(9, 2)]: true,
            [utils.asGridCoord(10, 2)]: true,
            [utils.asGridCoord(11, 2)]: true,
        },
    };