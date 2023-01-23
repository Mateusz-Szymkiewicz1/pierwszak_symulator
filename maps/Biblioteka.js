window.OverworldMaps.Biblioteka = {
        id: "Biblioteka",
        lowerSrc: "images/maps/BibliotekaLower.png",
        upperSrc: "images/maps/BibliotekaUpper.png",
        gameObjects: {
            bibliotekarka1: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(8),
                counter: 0,
                useShadow: true,
                src: "images/characters/people/npc1.png",
                behaviorLoop: [
                    {type: "stand",direction: "left",time: 100000},
                ]
            }),
            bibliotekarka1_talking: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(8),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {who: "bibliotekarka1",type: "textMessage",text: 'Lorem Ipsum dolor sit amet'},
                       ]
                   }
               ],
            }),
            sztuka_wojny: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(2),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {type: "book",book_id: "art_of_war"},
                       ]
                   }
               ],
            }),
            bibliotekarka2: new Person({
                x: utils.withGrid(4),
                y: utils.withGrid(2),
                counter: 0,
                src: "images/characters/people/npc6.png",
                talking: [
                    {
                        events: [
                            {who: "bibliotekarka2",type: "textMessage",text: 'Lorem Ipsum dolor sit amet'},
                       ]
                   }
               ],
                behaviorLoop: [
                    {type: "stand",direction: "right",time: 100000},
                ]
            }),
            bibliotekarka2_talking: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(2),
                counter: 0,
                src: "images/maps/KitchenUpper.png",
                talking: [
                    {
                        events: [
                            {who: "bibliotekarka2",type: "textMessage",text: 'Lorem Ipsum dolor sit amet'},
                       ]
                   }
               ],
            }),
            Podrecznik_access: new Person({
                id: "Podrecznik_access",
                x: utils.withGrid(2),
                y: utils.withGrid(9),
                walkable: true,
                pickUp: true,
                counter: 0,
                movePixels: true,
                src: "images/objects/podrecznik.png",
                talking: [
                    {
                        events: [
                            {who: "Podrecznik_access",type: "textMessage",text: 'Znalazłeś "Podręcznik Access"!!'},
                            {who: "Podrecznik_access",type: "stand",direction: "left",time: 200},
                       ]
                   }
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(6),
                y: utils.withGrid(10),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(6, 10)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(8),
                            y: utils.withGrid(8),
                            direction: "down"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(2, 10)]: true,
            [utils.asGridCoord(5, 10)]: true,
            [utils.asGridCoord(7, 10)]: true,
            [utils.asGridCoord(7, 9)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(8, 6)]: true,
            [utils.asGridCoord(8, 5)]: true,
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(8, 2)]: true,
            [utils.asGridCoord(7, 2)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(6, 1)]: true,
            [utils.asGridCoord(5, 2)]: true,
            [utils.asGridCoord(3, 2)]: true,
            [utils.asGridCoord(2, 2)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(1, 8)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(4, 9)]: true,
            [utils.asGridCoord(5, 9)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(3, 5)]: true,
            [utils.asGridCoord(3, 6)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(4, 5)]: true,
            [utils.asGridCoord(4, 6)]: true,
            [utils.asGridCoord(4, 7)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(6, 5)]: true,
            [utils.asGridCoord(6, 6)]: true,
            [utils.asGridCoord(6, 11)]: true,
        },
    start_func: function(){
        const progress = new Progress();
        progress.load();
        progress.heroInventory.forEach(e =>{
            if(e.id == "Podrecznik_access"){
                delete window.OverworldMaps.Biblioteka.gameObjects.Podrecznik_access;
            }
        })
    }
    };