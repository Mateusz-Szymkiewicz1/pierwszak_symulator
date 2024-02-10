window.OverworldMaps.KorytarzPrawy = {
        id: "KorytarzPrawy",
        lowerSrc: "images/maps/KorytarzPrawyLower.png",
        upperSrc: "images/maps/KorytarzPrawyUpper.png",
        gameObjects: {
            s16Drzwi: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(7),
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
                                map: "S16",
                                x: utils.withGrid(4),
                                y: utils.withGrid(11),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            BibliotekaDrzwi: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(7),
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
                                map: "Biblioteka",
                                x: utils.withGrid(6),
                                y: utils.withGrid(10),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            BiuroGDrzwi: new Person({
                x: utils.withGrid(23),
                y: utils.withGrid(10),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_down.png",
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
                                map: "BiuroG",
                                x: utils.withGrid(2),
                                y: utils.withGrid(1),
                                direction: "down"
                            },
                       ]
                   },
               ],
            }),
            IndDrzwi: new Person({
                x: utils.withGrid(14),
                y: utils.withGrid(10),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_down.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"Nauczanie Indywidualne - Nie przeszkadzać!"'},
                       ]
                   },
               ],
            }),
            wc: new Person({
                x: utils.withGrid(12),
                y: utils.withGrid(10),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_down.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: 'Tylko dla personelu!'},
                       ]
                   },
               ],
            }),
            ksiegowosc: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(10),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_down.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: 'Zamknięte...'},
                       ]
                   },
               ],
            }),
            kier_gosp: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(10),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_down.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: 'Zamknięte...'},
                       ]
                   },
               ],
            }),
            s14Drzwi: new Person({
                x: utils.withGrid(15),
                y: utils.withGrid(7),
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
                                map: "S14",
                                x: utils.withGrid(14),
                                y: utils.withGrid(11),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            pielegniarkaDrzwi: new Person({
                x: utils.withGrid(18),
                y: utils.withGrid(7),
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
                                map: "Pielegniarka",
                                x: utils.withGrid(2),
                                y: utils.withGrid(9),
                                direction: "up"
                            },
                       ]
                   },
               ],
            }),
            s16: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"Sala 16"'},
                       ]
                   }
               ],
            }),
            biblioteka: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"Biblioteka"'},
                       ]
                   }
               ],
            }),
            s14: new Person({
                x: utils.withGrid(14),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"Sala 14"'},
                       ]
                   }
               ],
            }),
            pielegniarka: new Person({
                x: utils.withGrid(17),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"Pielegniarka (Czynne 11:00-11:30)"'},
                       ]
                   }
               ],
            }),
            kasjerka: new Person({
                x: utils.withGrid(22),
                y: utils.withGrid(4),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/npc1.png",
            }),
            kupowanie: new Person({
                x: utils.withGrid(22),
                y: utils.withGrid(5),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {
                                type: "shop",
                                products: [
                                    {id: "Rogal",price: "10"},
                                    {id: "Obwarzanek",price: "6"},
                                    {id: "Pizza",price: "15"},
                                    {id: "Monster",price: "20"},
                                    {id: "Woda",price: "4"}
                                ]
                            },
                       ]
                   }
               ],
            }),
            tyson: new Person({
                x: utils.withGrid(13),
                y: utils.withGrid(8),
                counter: 0,
                useShadow: true,
                src: "images/characters/people/ziomek4.png",
                talking: [
                    {
                        events: [
                            {who: "tyson",type: "textMessage",text: 'Errors (3000) method "talking" not found.'},
                       ]
                   }
               ],
            }),
            aleks: new Person({
                x: utils.withGrid(24),
                y: utils.withGrid(8),
                counter: 0,
                direction: "left",
                useShadow: true,
                src: "images/characters/people/npc5.png",
                talking: [
                    {
                        events: [
                            {who: "aleks",type: "textMessage",text: 'Lorem Ipsum?',faceHero: "aleks"},
                       ]
                   }
               ],
                behaviorLoop: [
                    {type: "stand",direction: "left",time: 2000},
                ]
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(1),
                y: utils.withGrid(8),
                useShadow: true
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(0, 8)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "School",
                            x: utils.withGrid(19),
                            y: utils.withGrid(7),
                            direction: "left"
                        },
                    ]
                }
            ],
            [utils.asGridCoord(0, 9)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "School",
                            x: utils.withGrid(19),
                            y: utils.withGrid(8),
                            direction: "left"
                        },
                    ]
                }
            ],
        },
        walls: {
           [utils.asGridCoord(0, 7)]: true,
            [utils.asGridCoord(-1, 8)]: true,
           [utils.asGridCoord(-1, 9)]: true,
           [utils.asGridCoord(1, 7)]: true,
           [utils.asGridCoord(4, 7)]: true,
           [utils.asGridCoord(5, 7)]: true,
           [utils.asGridCoord(6, 7)]: true,
           [utils.asGridCoord(9, 7)]: true,
           [utils.asGridCoord(10, 7)]: true,
           [utils.asGridCoord(11, 7)]: true,
           [utils.asGridCoord(12, 7)]: true,
           [utils.asGridCoord(13, 7)]: true,
           [utils.asGridCoord(16, 7)]: true,
           [utils.asGridCoord(19, 7)]: true,
           [utils.asGridCoord(20, 7)]: true,
           [utils.asGridCoord(20, 6)]: true,
           [utils.asGridCoord(21, 5)]: true,
           [utils.asGridCoord(22, 5)]: true,
           [utils.asGridCoord(23, 5)]: true,
           [utils.asGridCoord(24, 6)]: true,
           [utils.asGridCoord(24, 7)]: true,
           [utils.asGridCoord(25, 8)]: true,
           [utils.asGridCoord(25, 9)]: true,
           [utils.asGridCoord(24, 10)]: true,
           [utils.asGridCoord(22, 10)]: true,
           [utils.asGridCoord(23, 11)]: true,
           [utils.asGridCoord(21, 10)]: true,
           [utils.asGridCoord(20, 10)]: true,
           [utils.asGridCoord(20, 11)]: true,
           [utils.asGridCoord(20, 12)]: true,
           [utils.asGridCoord(20, 13)]: true,
           [utils.asGridCoord(19, 10)]: true,
           [utils.asGridCoord(17, 14)]: true,
           [utils.asGridCoord(18, 14)]: true,
           [utils.asGridCoord(19, 14)]: true,
           [utils.asGridCoord(16, 10)]: true,
           [utils.asGridCoord(16, 11)]: true,
           [utils.asGridCoord(16, 12)]: true,
           [utils.asGridCoord(16, 13)]: true,
           [utils.asGridCoord(0, 10)]: true,
           [utils.asGridCoord(1, 10)]: true,
           [utils.asGridCoord(2, 10)]: true,
           [utils.asGridCoord(3, 10)]: true,
           [utils.asGridCoord(4, 10)]: true,
           [utils.asGridCoord(5, 10)]: true,
           [utils.asGridCoord(6, 10)]: true,
           [utils.asGridCoord(7, 10)]: true,
           [utils.asGridCoord(8, 10)]: true,
           [utils.asGridCoord(9, 10)]: true,
           [utils.asGridCoord(10, 10)]: true,
           [utils.asGridCoord(11, 10)]: true,
           [utils.asGridCoord(12, 10)]: true,
           [utils.asGridCoord(13, 10)]: true,
           [utils.asGridCoord(14, 10)]: true,
           [utils.asGridCoord(15, 10)]: true,
        }
    };