window.OverworldMaps.SzatniaM = {
        id: "SzatniaM",
        lowerSrc: "images/maps/SzatniaMLower.png",
        gameObjects: {
            wcDrzwi: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(8),
                counter: 0,
                movePixels: true,
                src: "images/Objects/toilet_door.png",
                talking: [
                    {
                        events: [
                            {
                                who: "wcDrzwi",
                                map: "SzatniaM",
                                type: "open",
                                src: 'images/Objects/toilet_door_opened.png'
                            },
                       ]
                   },
                    {
                        events: [
                            {
                                who: "wcDrzwi",
                                map: "SzatniaM",
                                type: "open",
                                src: 'images/Objects/toilet_door.png'
                            },
                       ]
                   }
               ],
            }),
            wcDrzwi2: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(10),
                counter: 0,
                movePixels: true,
                src: "images/Objects/toilet_door.png",
                talking: [
                    {
                        events: [
                            {
                                who: "wcDrzwi2",
                                map: "SzatniaM",
                                type: "open",
                                src: 'images/Objects/toilet_door_opened.png'
                            },
                       ]
                   },
                    {
                        events: [
                            {
                                who: "wcDrzwi2",
                                map: "SzatniaM",
                                type: "open",
                                src: 'images/Objects/toilet_door.png'
                            },
                       ]
                   }
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(10),
                y: utils.withGrid(4),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(11, 4)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzLewy",
                            x: utils.withGrid(5),
                            y: utils.withGrid(7),
                            direction: "right"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(10, 6)]: true,
            [utils.asGridCoord(11, 5)]: true,
            [utils.asGridCoord(11, 3)]: true,
            [utils.asGridCoord(12, 4)]: true,
            [utils.asGridCoord(3, 3)]: true,
            [utils.asGridCoord(4, 3)]: true,
            [utils.asGridCoord(5, 3)]: true,
            [utils.asGridCoord(6, 3)]: true,
            [utils.asGridCoord(7, 3)]: true,
            [utils.asGridCoord(8, 3)]: true,
            [utils.asGridCoord(9, 3)]: true,
            [utils.asGridCoord(10, 3)]: true,
            [utils.asGridCoord(2, 2)]: true,
            [utils.asGridCoord(1, 3)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(0, 6)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(4, 7)]: true,
            [utils.asGridCoord(5, 7)]: true,
            [utils.asGridCoord(6, 7)]: true,
            [utils.asGridCoord(7, 7)]: true,
            [utils.asGridCoord(8, 7)]: true,
            [utils.asGridCoord(9, 7)]: true,
            [utils.asGridCoord(5, 8)]: true,
            [utils.asGridCoord(5, 10)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(1, 10)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 11)]: true,
            [utils.asGridCoord(0, 12)]: true,
            [utils.asGridCoord(1, 13)]: true,
            [utils.asGridCoord(2, 13)]: true,
            [utils.asGridCoord(3, 13)]: true,
            [utils.asGridCoord(4, 13)]: true,
            [utils.asGridCoord(5, 13)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(4, 9)]: true,
            [utils.asGridCoord(3, 11)]: true,
            [utils.asGridCoord(4, 11)]: true,
            [utils.asGridCoord(5, 11)]: true,
            [utils.asGridCoord(6, 12)]: true,
            [utils.asGridCoord(5, 13)]: true,
        }
    };