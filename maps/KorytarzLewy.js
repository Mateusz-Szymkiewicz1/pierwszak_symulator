window.OverworldMaps.KorytarzLewy = {
        id: "KorytarzLewy",
        lowerSrc: "images/maps/KorytarzLewyLower.png",
        upperSrc: "images/maps/KorytarzLewyUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                useShadow: true,
                x: utils.withGrid(28),
                y: utils.withGrid(5),
            }),
            marek: new Person({
                x: utils.withGrid(25),
                y: utils.withGrid(9),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/ziomek2.png",
                talking: [
                    {
                        events: [
                            {
                                who: "marek",type: "textMessage",
                                text: "Czy znasz historię o niemym Michałku, który żuł gumę tak długo, aż oślepł?",
                                faceHero: "marek"
                            },
                            {who: "marek",type: "stand",direction: "left",time: 500},
                            {type: "textMessage",text: "*Ziomek nie kontaktuje*"},
                       ]
                   }
               ],
                behaviorLoop: [
                    {type: "stand",direction: "left",time: 800},
                ]
            }),
            lysy: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(6),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/ziomek3.png",
                talking: [
                    {
                        events: [
                            {who: "lysy",type: "talk"},
                       ]
                   }
               ],
                behaviorLoop: [
                    {type: "stand",direction: "left",time: 2000},
                ]
            }),
            oze: new Person({
                x: utils.withGrid(20),
                y: utils.withGrid(1),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "OZE",
                                x: utils.withGrid(5),
                                y: utils.withGrid(23),
                                direction: "up"
                            },
                       ]
                   }
               ],
            }),
            oze2: new Person({
                x: utils.withGrid(21),
                y: utils.withGrid(1),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {
                                type: "changeMap",
                                map: "OZE",
                                x: utils.withGrid(6),
                                y: utils.withGrid(23),
                                direction: "up"
                            },
                       ]
                   }
               ],
            }),
            s25: new Person({
                x: utils.withGrid(16),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"Sala 25"'},
                       ]
                   }
               ],
            }),
            s26: new Person({
                x: utils.withGrid(11),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"Sala 26"'},
                       ]
                   }
               ],
            }),
            wc: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"Toaleta"'},
                       ]
                   }
               ],
            }),
            dezynfekcja: new Person({
                x: utils.withGrid(14),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '*mmmm dezynkfekcja*'},
                       ]
                   }
               ],
            }),
            s26Drzwi: new Person({
                x: utils.withGrid(17),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/Objects/door.png",
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
                x: utils.withGrid(12),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/Objects/door.png",
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
                                type: "play_audio",
                                audio: "door_open",
                                speed: 2,
                                volume: 0.2
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
                x: utils.withGrid(4),
                y: utils.withGrid(7),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_left.png",
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
                x: utils.withGrid(4),
                y: utils.withGrid(9),
                movePixels: true,
                counter: 0,
                src: "images/Objects/door_left.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: 'Zamknięte...'},
                       ]
                   },
               ],
            }),
            kantorekDrzwi: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(11),
                movePixels: true,
                counter: 0,
                src: "images/Objects/door_left.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: 'Zamknięte...'},
                       ]
                   },
               ],
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(28, 4)]: [
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
                [utils.asGridCoord(28, 5)]: [
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
             [utils.asGridCoord(14, 6)]: [
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
             [utils.asGridCoord(18, 6)]: [
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
            [utils.asGridCoord(5, 12)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "SalaG",
                            x: utils.withGrid(7),
                            y: utils.withGrid(1),
                            direction: "down" 
                        }
                    ]
                }
            ],
             [utils.asGridCoord(6, 12)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "SalaG",
                            x: utils.withGrid(7),
                            y: utils.withGrid(1),
                            direction: "down" 
                        }
                    ]
                }
            ],
             [utils.asGridCoord(7, 12)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "SalaG",
                            x: utils.withGrid(8),
                            y: utils.withGrid(1),
                            direction: "down" 
                        }
                    ]
                }
            ],
            [utils.asGridCoord(25, 3)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "Hol",
                            x: utils.withGrid(7),
                            y: utils.withGrid(4),
                            direction: "down" 
                        }
                    ]
                }
            ],
            [utils.asGridCoord(26, 3)]: [
                {
                    events: [
                        {
                           type: "changeMap",
                            map: "Hol",
                            x: utils.withGrid(7),
                            y: utils.withGrid(4),
                            direction: "down" 
                        }
                    ]
                }
            ],
        },
        walls: {
           [utils.asGridCoord(27, 3)]: true,
           [utils.asGridCoord(18, 7)]: true,
           [utils.asGridCoord(14, 7)]: true,
           [utils.asGridCoord(28, 3)]: true,
           [utils.asGridCoord(29, 4)]: true,
           [utils.asGridCoord(29, 5)]: true,
           [utils.asGridCoord(24, 3)]: true,
           [utils.asGridCoord(23, 3)]: true,
           [utils.asGridCoord(22, 3)]: true,
           [utils.asGridCoord(19, 3)]: true,
           [utils.asGridCoord(18, 3)]: true,
           [utils.asGridCoord(16, 3)]: true,
           [utils.asGridCoord(15, 3)]: true,
           [utils.asGridCoord(13, 3)]: true,
           [utils.asGridCoord(11, 3)]: true,
           [utils.asGridCoord(10, 3)]: true,
           [utils.asGridCoord(9, 3)]: true,
           [utils.asGridCoord(8, 3)]: true,
           [utils.asGridCoord(7, 3)]: true,
           [utils.asGridCoord(5, 3)]: true,
           [utils.asGridCoord(4, 6)]: true,
           [utils.asGridCoord(4, 8)]: true,
           [utils.asGridCoord(4, 10)]: true,
           [utils.asGridCoord(4, 12)]: true,
           [utils.asGridCoord(19, 2)]: true,
           [utils.asGridCoord(22, 2)]: true,
           [utils.asGridCoord(8, 12)]: true,
           [utils.asGridCoord(9, 11)]: true,
           [utils.asGridCoord(9, 10)]: true,
           [utils.asGridCoord(8, 9)]: true,
           [utils.asGridCoord(8, 8)]: true,
           [utils.asGridCoord(8, 7)]: true,
           [utils.asGridCoord(8, 6)]: true,
           [utils.asGridCoord(9, 6)]: true,
           [utils.asGridCoord(10, 6)]: true,
           [utils.asGridCoord(11, 6)]: true,
           [utils.asGridCoord(12, 6)]: true,
           [utils.asGridCoord(13, 6)]: true,
           [utils.asGridCoord(15, 6)]: true,
           [utils.asGridCoord(16, 6)]: true,
           [utils.asGridCoord(17, 6)]: true,
           [utils.asGridCoord(19, 6)]: true,
           [utils.asGridCoord(20, 6)]: true,
           [utils.asGridCoord(21, 6)]: true,
           [utils.asGridCoord(21, 7)]: true,
           [utils.asGridCoord(21, 8)]: true,
           [utils.asGridCoord(21, 9)]: true,
           [utils.asGridCoord(21, 10)]: true,
           [utils.asGridCoord(22, 11)]: true,
           [utils.asGridCoord(25, 11)]: true,
           [utils.asGridCoord(27, 6)]: true,
           [utils.asGridCoord(28, 6)]: true,
           [utils.asGridCoord(26, 6)]: true,
           [utils.asGridCoord(26, 7)]: true,
           [utils.asGridCoord(26, 8)]: true,
           [utils.asGridCoord(26, 9)]: true,
           [utils.asGridCoord(26, 10)]: true,
          [utils.asGridCoord(23, 6)]: true,
           [utils.asGridCoord(23, 7)]: true,
           [utils.asGridCoord(23, 8)]: true,
           [utils.asGridCoord(23, 9)]: true,
           [utils.asGridCoord(23, 10)]: true,
            [utils.asGridCoord(24, 6)]: true,
           [utils.asGridCoord(24, 7)]: true,
           [utils.asGridCoord(24, 8)]: true,
           [utils.asGridCoord(24, 9)]: true,
           [utils.asGridCoord(24, 10)]: true,
           [utils.asGridCoord(7, 7)]: true,
           [utils.asGridCoord(7, 8)]: true,
           [utils.asGridCoord(7, 9)]: true,
           [utils.asGridCoord(6, 3)]: true,
           [utils.asGridCoord(12, 2)]: true,
           [utils.asGridCoord(17, 2)]: true,
           [utils.asGridCoord(4, 7)]: true,
           [utils.asGridCoord(5, 13)]: true,
           [utils.asGridCoord(6, 13)]: true,
           [utils.asGridCoord(7, 13)]: true,
           [utils.asGridCoord(25, 2)]: true,
           [utils.asGridCoord(26, 2)]: true,
           [utils.asGridCoord(1, 5)]: true,
           [utils.asGridCoord(2, 5)]: true,
           [utils.asGridCoord(3, 5)]: true,
           [utils.asGridCoord(0, 4)]: true,
           [utils.asGridCoord(1, 3)]: true,
           [utils.asGridCoord(4, 3)]: true,
        },
    };