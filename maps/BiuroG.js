window.OverworldMaps.BiuroG = {
        id: "BiuroG",
        lowerSrc: "images/maps/BiuroGLower.png",
        upperSrc: "images/maps/KitchenUpper.png",
        gameObjects: {
            g: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(6),
                counter: 0,
                useShadow: true,
                src: "images/characters/people/npc1.png",
                talking: [
                    {
                        events: [
                            {who: "g",type: "textMessage",text: 'Lorem Ipsum dolor sit amet',faceHero: "g"},
                       ]
                   }
               ],
                behaviorLoop: [
                    {type: "stand",direction: "right",time: 2000},
                ]
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(1),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(2, 1)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(23),
                            y: utils.withGrid(9),
                            direction: "up"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(1, 2)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(3, 2)]: true,
            [utils.asGridCoord(3, 1)]: true,
            [utils.asGridCoord(1, 1)]: true,
            [utils.asGridCoord(2, 0)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(3, 5)]: true,
        },
    };