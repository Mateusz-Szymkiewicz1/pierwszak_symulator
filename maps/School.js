window.OverworldMaps.School = {
        id: "School",
        lowerSrc: "images/maps/SchoolLower.png",
        upperSrc: "images/maps/SchoolUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                useShadow: true,
                direction: "up",
                x: utils.withGrid(6),
                y: utils.withGrid(7),
            }),
            wozna: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(7),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/npc1.png",
                talking: [
                     {
                        events: [
                            {who: "wozna",type: "textMessage",text: "Trzymaj, przyda ci się",faceHero: "wozna"},
                            {who: "Klucz_Szafka",type: "textMessage",text: 'Otrzymałeś "Klucz do Szafki"!',},
                            {
                                code: "window.OverworldMaps.School.gameObjects.wozna.talking.splice(0,1);",
                                type: "do_code",
                            },
                             {
                                code: 'const quest = new QuestLog({onComplete: () => {}});quest.end_quest("Znajdź_Klucz");',
                                type: "do_code",
                            },
                            {
                                code: 'const quest = new QuestLog({onComplete: () => {}});quest.add_quest({id: "Znajdź_Szafkę",desc: "Znajdź szafkę numer 213", exp: 10})',
                                type: "do_code",
                            },
                       ]
                   },
                    {
                        events: [
                            {type: "talk",who: "wozna"}
                       ]
                   }
               ],
                behaviorLoop: [
                    {type: "stand",direction: "right",time: 2000},
                ]
            }),
            dariusz: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(2),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/npc3.png",
                talking: [
                    {
                        events: [
                            {type: "talk",who: "dariusz"}
                        ]
                   }
               ],
                behaviorLoop: [
                    {type: "stand",direction: "down",time: 2000},
                ]
            }),
            dezynfekcja: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: "*mmmm dezynfekcja*"},
                       ]
                   }
               ],
            }),
            Klucz_Szafka: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                pickUp: true,
                counter: 0,
                src: "images/maps/blank.png",
            }),
            ksiazka: new Person({
                x: utils.withGrid(16),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"MATeMemAtyka rozszerzona dla klasy 3"'},
                            {type: "textMessage",text: "*ten widok sprawia ci ból*"},
                       ]
                   }
               ],
            }),
            sekretariatDrzwi: new Person({
                x: utils.withGrid(11),
                y: utils.withGrid(9),
                counter: 0,
                movePixels: true,
                src: "images/Objects/door_down.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage",text: '"Zaraz wracam"'},
                       ]
                   }
               ],
            }),
            automat: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(6),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {
                                type: "shop",
                                products: [
                                    {id: "Woda",price: "4"},
                                    {id: "Cola",price: "6"},
                                    {id: "Baton",price: "8"},
                                    {id: "Kanapka",price: "15"},
                                ]
                            },
                       ]
                   }
               ],
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(1, 3)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(28),
                            y: utils.withGrid(4),
                            direction: "left"
                        },
                    ]
                }
            ],
                [utils.asGridCoord(1, 4)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(28),
                            y: utils.withGrid(5),
                            direction: "left"
                        },
                    ]
                }
            ],
            [utils.asGridCoord(19, 7)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(0),
                            y: utils.withGrid(8),
                            direction: "right"
                        },
                    ]
                }
            ],
                [utils.asGridCoord(19, 8)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(0),
                            y: utils.withGrid(9),
                            direction: "right"
                        },
                    ]
                }
            ],
        },
        walls: {
           [utils.asGridCoord(4, 6)]: true,
           [utils.asGridCoord(0, 3)]: true,
           [utils.asGridCoord(0, 4)]: true,
           [utils.asGridCoord(2, 2)]: true,
           [utils.asGridCoord(9, 7)]: true,
           [utils.asGridCoord(4, 7)]: true,
           [utils.asGridCoord(4, 8)]: true,
           [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(2, 6)]: true,
           [utils.asGridCoord(5, 9)]: true,
           [utils.asGridCoord(6, 10)]: true,
           [utils.asGridCoord(7, 9)]: true,
           [utils.asGridCoord(8, 9)]: true,
           [utils.asGridCoord(8, 7)]: true,
           [utils.asGridCoord(9, 8)]: true,
           [utils.asGridCoord(9, 6)]: true,
           [utils.asGridCoord(9, 5)]: true,
           [utils.asGridCoord(9, 2)]: true,
           [utils.asGridCoord(7, 1)]: true,
           [utils.asGridCoord(1, 5)]: true,
           [utils.asGridCoord(1, 2)]: true,
           [utils.asGridCoord(3, 1)]: true,
           [utils.asGridCoord(11, 3)]: true,
           [utils.asGridCoord(19, 2)]: true,
           [utils.asGridCoord(19, 3)]: true,
           [utils.asGridCoord(19, 4)]: true,
           [utils.asGridCoord(19, 5)]: true,
           [utils.asGridCoord(19, 6)]: true,
           [utils.asGridCoord(12, 9)]: true,
           [utils.asGridCoord(13, 9)]: true,
           [utils.asGridCoord(14, 9)]: true,
           [utils.asGridCoord(15, 9)]: true,
           [utils.asGridCoord(16, 9)]: true,
           [utils.asGridCoord(17, 9)]: true,
           [utils.asGridCoord(18, 9)]: true,
           [utils.asGridCoord(19, 9)]: true,
           [utils.asGridCoord(17, 2)]: true,
           [utils.asGridCoord(10, 8)]: true,
           [utils.asGridCoord(10, 2)]: true,
           [utils.asGridCoord(15, 3)]: true,
           [utils.asGridCoord(14, 3)]: true,
           [utils.asGridCoord(13, 3)]: true,
           [utils.asGridCoord(12, 2)]: true,
           [utils.asGridCoord(18, 3)]: true,
           [utils.asGridCoord(20, 7)]: true,
           [utils.asGridCoord(20, 8)]: true,
           [utils.asGridCoord(4, 1)]: true,
           [utils.asGridCoord(5, 1)]: true,
           [utils.asGridCoord(6, 1)]: true,
        },
    start_func: function(){
        let wozna_talking = window.OverworldMaps.School.gameObjects.wozna.talking;
        window.heroInventory.forEach(e =>{
            if(e.id == "Klucz_Szafka"){
                delete window.OverworldMaps.School.gameObjects.Klucz_Szafka;
                window.OverworldMaps.School.gameObjects.wozna.talking.forEach(e=>{
                    if(e.events[1] && e.events[1].who == "Klucz_Szafka"){
                       window.OverworldMaps.School.gameObjects.wozna.talking.splice(0,1);
                    }
                })
            }
        })
    }
    };