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
                            {
                                who: "wozna",
                                type: "textMessage",
                                text: "Trzymaj, przyda ci się",
                                faceHero: "wozna"
                            },
                            {
                                who: "Klucz_Szafka",
                                type: "textMessage",
                                text: 'Otrzymałeś "Klucz do Szafki"!',
                            },
                            {
                                code: "window.OverworldMaps.School.gameObjects.wozna.talking.splice(0,1);",
                                type: "do_code",
                            },
                             {
                                code: 'const quest = new QuestLog({onComplete: () => {}});quest.end_quest("Znajdź_Klucz");',
                                type: "do_code",
                            },
                            {
                                code: 'const quest = new QuestLog({onComplete: () => {}});quest.add_quest({id: "Znajdź_Szafkę",desc: "Znajdź szafkę numer 213",})',
                                type: "do_code",
                            },
                       ]
                   },
                    {
                        events: [
                            {
                                who: "wozna",
                                type: "textMessage",
                                text: "Zmień buty debilu",
                                faceHero: "wozna"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "right",
                        time: 2000
                    },
                ]
            }),
            ziomek: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(2),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/npc3.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: "Kazali mi zapłacić za winkiel",
                                faceHero: "ziomek"
                            },
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: "Teraz dzwonią po moich rodziców",
                                faceHero: "ziomek"
                            },
                            {
                                who: "ziomek",
                                type: "textMessage",
                                text: "Dwulicowe szmaty",
                                faceHero: "ziomek"
                            },
                       ]
                   }
               ],
                behaviorLoop: [
                    {
                        type: "stand",
                        direction: "down",
                        time: 2000
                    },
                ]
            }),
            dezynfekcja: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(7),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "dezynfekcja",
                                type: "textMessage",
                                text: "*mmmm dezynfekcja*"
                            },
                       ]
                   }
               ],
            }),
            Klucz_Szafka: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                pickUp: true,
                counter: 0,
                src: "images/maps/KitchenUpper.png",
            }),
            ksiazka: new Person({
                x: utils.withGrid(16),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                who: "ksiazka",
                                type: "textMessage",
                                text: '"MaTeMemAtyka rozszerzona dla klasy 3"'
                            },
                            {
                                who: "ksiazka",
                                type: "textMessage",
                                text: "*ten widok sprawia ci ból*"
                            },
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
                            {
                                who: "sekretariatDrzwi",
                                type: "textMessage",
                                text: '"Zaraz wracam"'
                            },
                       ]
                   }
               ],
            }),
            automat: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(6),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {
                                type: "shop",
                                products: [
                                    {
                                        id: "Woda",
                                        desc: "W sumie to nic nie robi",
                                        src: "images/Objects/water.png",
                                        price: "4"
                                    },
                                    {
                                        id: "Cola",
                                        desc: "Oryginalna receptura",
                                        src: "images/Objects/cola.png",
                                        price: "6"
                                    },
                                    {
                                        id: "Baton",
                                        desc: "500kcal + cukrzyca",
                                        src: "images/Objects/baton.png",
                                        price: "8"
                                    },
                                    {
                                        id: "Kanapka",
                                        desc: "Uzdrawia 25HP",
                                        src: "images/Objects/sandwich.png",
                                        price: "15"
                                    },
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
                            x: utils.withGrid(24),
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
                            x: utils.withGrid(24),
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
        },
    start_func: function(){
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