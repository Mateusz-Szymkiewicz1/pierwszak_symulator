window.OverworldMaps.Schron = {
        id: "Schron",
        lowerSrc: "images/maps/SchronLower.png",
        upperSrc: "images/maps/SchronUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(1),
                y: utils.withGrid(2),
                useShadow: true,
            }),
            tutorial: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(2),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {who: "fight_tutorial", type: "talk"}
                       ]
                   }
               ],
            }),
            tyler: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(2),
                useShadow: true,
                counter: 0,
                src: "images/characters/people/tyler.png",
                talking: [
                    {
                        events: [
                            {who: "tyler",type: "talk"},
                       ]
                   }
               ],
                behaviorLoop: [
                    {type: "stand",direction: "down",time: 2000},
                ]
            }),
        },
        cutsceneSpaces: {
               [utils.asGridCoord(1, 2)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "OZE",
                            x: utils.withGrid(6),
                            y: utils.withGrid(22),
                            direction: "left"
                        },
                    ]
                }
            ],
             [utils.asGridCoord(1, 3)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "OZE",
                            x: utils.withGrid(6),
                            y: utils.withGrid(22),
                            direction: "left"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(1, 1)]: true,
            [utils.asGridCoord(0, 2)]: true,
            [utils.asGridCoord(0, 3)]: true,
            [utils.asGridCoord(2, 1)]: true,
            [utils.asGridCoord(3, 1)]: true,
            [utils.asGridCoord(4, 1)]: true,
            [utils.asGridCoord(5, 1)]: true,
            [utils.asGridCoord(6, 1)]: true,
            [utils.asGridCoord(7, 1)]: true,
            [utils.asGridCoord(9, 8)]: true,
            [utils.asGridCoord(2, 9)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(1, 8)]: true,
            [utils.asGridCoord(3, 10)]: true,
            [utils.asGridCoord(4, 10)]: true,
            [utils.asGridCoord(5, 10)]: true,
            [utils.asGridCoord(6, 10)]: true,
            [utils.asGridCoord(7, 10)]: true,
            [utils.asGridCoord(8, 10)]: true,
            [utils.asGridCoord(9, 10)]: true,
            [utils.asGridCoord(10, 9)]: true,
            [utils.asGridCoord(10,3)]: true,
            [utils.asGridCoord(10,4)]: true,
            [utils.asGridCoord(10,5)]: true,
            [utils.asGridCoord(10,6)]: true,
            [utils.asGridCoord(10,7)]: true,
            [utils.asGridCoord(4,5)]: true,
            [utils.asGridCoord(4,6)]: true,
            [utils.asGridCoord(4,7)]: true,
            [utils.asGridCoord(5,5)]: true,
            [utils.asGridCoord(6,5)]: true,
            [utils.asGridCoord(7,5)]: true,
            [utils.asGridCoord(7,6)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(5,7)]: true,
            [utils.asGridCoord(6,7)]: true,
            [utils.asGridCoord(9,3)]: true,
            [utils.asGridCoord(9,4)]: true,
        },
        start_func: function(){
            if(window.relations_obj.fight_tutorial.relationship > 50){
                window.OverworldMaps.Schron.gameObjects.tyler.talking = [{events: [{type: "fights"}]}];
            }
        }
    };