window.OverworldMaps.OZE = {
        id: "OZE",
        lowerSrc: "images/maps/OZELower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            placeholder: new Person({
               src: "images/maps/KitchenUpper.png"
            }),
            schronD: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(22),
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
                                map: "Schron",
                            },
                       ]
                   },
               ],
            }),
            bilardD: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(20),
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
                                map: "Bilard",
                            },
                       ]
                   },
               ],
            }),
             s19: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(18),
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
                                map: "S19",
                            },
                       ]
                   },
               ],
            }),
            s20: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(16),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_right.png",
                talking: [
                    {
                        events: [
                            {
                                type: "textMessage",
                                text: 'Na OZE lepiej nie wchodzić...'
                            }
                       ]
                   },
               ],
            }),
            s21: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(14),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_right.png",
                talking: [
                    {
                        events: [
                            {
                                type: "textMessage",
                                text: 'Na OZE lepiej nie wchodzić...'
                            }
                       ]
                   },
               ],
            }),
            s22: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(12),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_right.png",
                talking: [
                    {
                        events: [
                            {
                                type: "textMessage",
                                text: 'Na OZE lepiej nie wchodzić...'
                            }
                       ]
                   },
               ],
            }),
            s23: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(8),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_right.png",
                talking: [
                    {
                        events: [
                           {
                                type: "textMessage",
                                text: 'Na OZE lepiej nie wchodzić...'
                            }
                       ]
                   },
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(23),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
               [utils.asGridCoord(5, 23)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(16),
                            y: utils.withGrid(2),
                            direction: "down"
                        },
                    ]
                }
            ],
            [utils.asGridCoord(6, 23)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(17),
                            y: utils.withGrid(2),
                            direction: "down"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(5, 24)]: true,
            [utils.asGridCoord(6, 24)]: true,
            [utils.asGridCoord(4, 23)]: true,
            [utils.asGridCoord(4, 22)]: true,
            [utils.asGridCoord(4, 21)]: true,
            [utils.asGridCoord(7, 23)]: true,
            [utils.asGridCoord(7, 21)]: true,
            [utils.asGridCoord(6, 19)]: true,
            [utils.asGridCoord(6, 17)]: true,
            [utils.asGridCoord(6, 15)]: true,
            [utils.asGridCoord(6, 13)]: true,
            [utils.asGridCoord(6, 11)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(6, 9)]: true,
            [utils.asGridCoord(6, 7)]: true,
            [utils.asGridCoord(3, 20)]: true,
            [utils.asGridCoord(3, 19)]: true,
            [utils.asGridCoord(4, 18)]: true,
            [utils.asGridCoord(4, 17)]: true,
            [utils.asGridCoord(4, 16)]: true,
            [utils.asGridCoord(4, 13)]: true,
            [utils.asGridCoord(4, 11)]: true,
            [utils.asGridCoord(4, 8)]: true,
            [utils.asGridCoord(4, 7)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(3,10)]: true,
            [utils.asGridCoord(3,12)]: true,
            [utils.asGridCoord(3,14)]: true,
            [utils.asGridCoord(3,15)]: true,
            [utils.asGridCoord(3,6)]: true,
            [utils.asGridCoord(7,6)]: true,
            [utils.asGridCoord(7,5)]: true,
            [utils.asGridCoord(7,4)]: true,
            [utils.asGridCoord(7,3)]: true,
            [utils.asGridCoord(4,2)]: true,
            [utils.asGridCoord(6,2)]: true,
            [utils.asGridCoord(1,4)]: true,
            [utils.asGridCoord(1,5)]: true,
            [utils.asGridCoord(2,3)]: true,
            [utils.asGridCoord(3,3)]: true,
        },
    };