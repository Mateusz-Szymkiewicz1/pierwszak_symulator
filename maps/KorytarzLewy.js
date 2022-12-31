window.OverworldMaps.KorytarzLewy = {
        id: "KorytarzLewy",
        lowerSrc: "images/maps/KorytarzLewyLower.png",
        upperSrc: "images/maps/KorytarzLewyUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                useShadow: true,
                x: utils.withGrid(24),
                y: utils.withGrid(5),
            }),
            marek: new Person({
                x: utils.withGrid(21),
                y: utils.withGrid(9),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/ziomek2.png",
                talking: [
                    {
                        events: [
                            {
                                who: "marek",
                                type: "textMessage",
                                text: "Czy znasz historię o niemym Michałku, który żuł gumę tak długo, aż oślepł?",
                                faceHero: "marek"
                            },
                            {
                                who: "marek",
                                type: "stand",
                                direction: "left",
                                time: 500
                            },
                            {
                                type: "textMessage",
                                text: "*Ziomek nie kontaktuje*"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "left",
                        time: 800
                    },
                ]
            }),
            lysy: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(6),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/ziomek3.png",
                talking: [
                    {
                        events: [
                            {
                                who: "lysy",
                                type: "textMessage",
                                text: "Zapytaj się czy dzisiaj bilard",
                                faceHero: "lysy"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "left",
                        time: 2000
                    },
                ]
            }),
            s25: new Person({
                x: utils.withGrid(12),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                type: "textMessage",
                                text: '"Sala 25"'
                            },
                       ]
                   }
               ],
            }),
            s26: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                type: "textMessage",
                                text: '"Sala 26"'
                            },
                       ]
                   }
               ],
            }),
            wc: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                type: "textMessage",
                                text: '"Toaleta"'
                            },
                       ]
                   }
               ],
            }),
            dezynfekcja: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                type: "textMessage",
                                text: '*mmmm dezynkfekcja*'
                            },
                       ]
                   }
               ],
            }),
            s26Drzwi: new Person({
                x: utils.withGrid(13),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/Objects/door.png",
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
                                map: "S26",
                                x: utils.withGrid(4),
                                y: utils.withGrid(11),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            s25Drzwi: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/Objects/door.png",
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
                                map: "S25",
                                x: utils.withGrid(4),
                                y: utils.withGrid(11),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            wcDrzwi: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/Objects/door.png",
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
                                map: "Toilet",
                                x: utils.withGrid(3),
                                y: utils.withGrid(12),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            szatniaMDrzwi: new Person({
                x: utils.withGrid(0),
                y: utils.withGrid(7),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_left.png",
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
                                map: "SzatniaM",
                                x: utils.withGrid(11),
                                y: utils.withGrid(4),
                                direction: "left"
                            },
                       ]
                   },
               ],
            }),
            szatniaDDrzwi: new Person({
                x: utils.withGrid(0),
                y: utils.withGrid(9),
                movePixels: true,
                counter: 0,
                src: "images/Objects/door_left.png",
                talking: [
                    {
                        events: [
                            {
                                type: "textMessage",
                                text: 'Zamknięte...'
                            },
                       ]
                   },
               ],
            }),
            kantorekDrzwi: new Person({
                x: utils.withGrid(0),
                y: utils.withGrid(11),
                movePixels: true,
                counter: 0,
                src: "images/Objects/door_left.png",
                talking: [
                    {
                        events: [
                            {
                                type: "textMessage",
                                text: 'Zamknięte...'
                            },
                       ]
                   },
               ],
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(24, 4)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "School",
                            x: utils.withGrid(1),
                            y: utils.withGrid(3),
                            direction: "right"
                        },
                    ]
                }
            ],
                [utils.asGridCoord(24, 5)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "School",
                            x: utils.withGrid(1),
                            y: utils.withGrid(4),
                            direction: "right"
                        },
                    ]
                }
            ],
             [utils.asGridCoord(10, 6)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "Szafki2",
                            x: utils.withGrid(7),
                            y: utils.withGrid(1),
                            direction: "down"
                        },
                    ]
                }
            ],
             [utils.asGridCoord(14, 6)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "Szafki",
                            x: utils.withGrid(5),
                            y: utils.withGrid(1),
                            direction: "down" 
                        }
                    ]
                }
            ],

        },
        walls: {
           [utils.asGridCoord(23, 3)]: true,
           [utils.asGridCoord(14, 7)]: true,
           [utils.asGridCoord(10, 7)]: true,
           [utils.asGridCoord(24, 3)]: true,
           [utils.asGridCoord(25, 4)]: true,
           [utils.asGridCoord(25, 5)]: true,
           [utils.asGridCoord(20, 3)]: true,
           [utils.asGridCoord(19, 3)]: true,
           [utils.asGridCoord(18, 3)]: true,
           [utils.asGridCoord(15, 3)]: true,
           [utils.asGridCoord(14, 3)]: true,
           [utils.asGridCoord(12, 3)]: true,
           [utils.asGridCoord(11, 3)]: true,
           [utils.asGridCoord(9, 3)]: true,
           [utils.asGridCoord(7, 3)]: true,
           [utils.asGridCoord(6, 3)]: true,
           [utils.asGridCoord(5, 3)]: true,
           [utils.asGridCoord(4, 3)]: true,
           [utils.asGridCoord(3, 3)]: true,
           [utils.asGridCoord(0, 4)]: true,
           [utils.asGridCoord(0, 5)]: true,
           [utils.asGridCoord(1, 3)]: true,
           [utils.asGridCoord(0, 6)]: true,
           [utils.asGridCoord(0, 8)]: true,
           [utils.asGridCoord(0, 10)]: true,
           [utils.asGridCoord(0, 12)]: true,
           [utils.asGridCoord(15, 2)]: true,
           [utils.asGridCoord(18, 2)]: true,
           [utils.asGridCoord(4, 12)]: true,
           [utils.asGridCoord(5, 11)]: true,
           [utils.asGridCoord(5, 10)]: true,
           [utils.asGridCoord(4, 9)]: true,
           [utils.asGridCoord(4, 8)]: true,
           [utils.asGridCoord(4, 7)]: true,
           [utils.asGridCoord(4, 6)]: true,
           [utils.asGridCoord(5, 6)]: true,
           [utils.asGridCoord(6, 6)]: true,
           [utils.asGridCoord(7, 6)]: true,
           [utils.asGridCoord(8, 6)]: true,
           [utils.asGridCoord(9, 6)]: true,
           [utils.asGridCoord(11, 6)]: true,
           [utils.asGridCoord(12, 6)]: true,
           [utils.asGridCoord(13, 6)]: true,
           [utils.asGridCoord(15, 6)]: true,
           [utils.asGridCoord(16, 6)]: true,
           [utils.asGridCoord(17, 6)]: true,
           [utils.asGridCoord(17, 7)]: true,
           [utils.asGridCoord(17, 8)]: true,
           [utils.asGridCoord(17, 9)]: true,
           [utils.asGridCoord(17, 10)]: true,
           [utils.asGridCoord(18, 11)]: true,
           [utils.asGridCoord(21, 11)]: true,
           [utils.asGridCoord(23, 6)]: true,
           [utils.asGridCoord(24, 6)]: true,
           [utils.asGridCoord(22, 6)]: true,
           [utils.asGridCoord(22, 7)]: true,
           [utils.asGridCoord(22, 8)]: true,
           [utils.asGridCoord(22, 9)]: true,
           [utils.asGridCoord(22, 10)]: true,
          [utils.asGridCoord(19, 6)]: true,
           [utils.asGridCoord(19, 7)]: true,
           [utils.asGridCoord(19, 8)]: true,
           [utils.asGridCoord(19, 9)]: true,
           [utils.asGridCoord(19, 10)]: true,
            [utils.asGridCoord(20, 6)]: true,
           [utils.asGridCoord(20, 7)]: true,
           [utils.asGridCoord(20, 8)]: true,
           [utils.asGridCoord(20, 9)]: true,
           [utils.asGridCoord(20, 10)]: true,
           [utils.asGridCoord(3, 7)]: true,
           [utils.asGridCoord(3, 8)]: true,
           [utils.asGridCoord(3, 9)]: true,
           [utils.asGridCoord(2, 2)]: true,
           [utils.asGridCoord(8, 2)]: true,
           [utils.asGridCoord(13, 2)]: true,
           [utils.asGridCoord(0, 7)]: true,
        },
    };