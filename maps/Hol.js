window.OverworldMaps.Hol = {
  id: "Hol",
  lowerSrc: "images/maps/HolLower.png",
  upperSrc: "images/maps/HolUpper.png",
  gameObjects: {
      hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(7),
          y: utils.withGrid(5),
          useShadow: true,
      }),
      S121: new Person({
        x: utils.withGrid(6),
        y: utils.withGrid(3),
        counter: 0,
        movePixels: true,
        src: "images/maps/blank.png",
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
                        map: "S121",
                        x: utils.withGrid(1),
                        y: utils.withGrid(6),
                        direction: "right"
                    },
               ]
           },
       ],
    }),
  },
  cutsceneSpaces: {
    [utils.asGridCoord(7, 4)]: [
      {
          events: [
              {
                  type: "changeMap",
                  map: "KorytarzLewy",
                  x: utils.withGrid(25),
                  y: utils.withGrid(3),
                  direction: "down"
              },
          ]
      }
  ],
  [utils.asGridCoord(8, 4)]: [
    {
        events: [
            {
                type: "changeMap",
                map: "KorytarzLewy",
                x: utils.withGrid(26),
                y: utils.withGrid(3),
                direction: "down"
            },
        ]
    }
],
[utils.asGridCoord(16, 10)]: [
  {
      events: [
          {
              type: "changeMap",
              map: "KorytarzPrawy1",
              x: utils.withGrid(21),
              y: utils.withGrid(3),
              direction: "right"
          },
      ]
  }
],
[utils.asGridCoord(16, 11)]: [
  {
      events: [
          {
              type: "changeMap",
              map: "KorytarzPrawy1",
              x: utils.withGrid(21),
              y: utils.withGrid(3),
              direction: "right"
          },
      ]
  }
],
[utils.asGridCoord(1, 5)]: [
    {
        events: [
            {
                type: "changeMap",
                map: "KorytarzLewy1",
                x: utils.withGrid(15),
                y: utils.withGrid(3),
                direction: "left"
            },
        ]
    }
  ],
  [utils.asGridCoord(1, 6)]: [
    {
        events: [
            {
                type: "changeMap",
                map: "KorytarzLewy1",
                x: utils.withGrid(15),
                y: utils.withGrid(4),
                direction: "left"
            },
        ]
    }
  ],
  },
  walls: {
  [utils.asGridCoord(6, 5)]: true,
  [utils.asGridCoord(6, 4)]: true,
  [utils.asGridCoord(6, 3)]: true,
  [utils.asGridCoord(7, 3)]: true,
  [utils.asGridCoord(8, 3)]: true,
  [utils.asGridCoord(9, 4)]: true,
  [utils.asGridCoord(9, 5)]: true,
  [utils.asGridCoord(10, 5)]: true,
  [utils.asGridCoord(11, 5)]: true,
  [utils.asGridCoord(12, 5)]: true,
  [utils.asGridCoord(13, 5)]: true,
  [utils.asGridCoord(14, 5)]: true,
  [utils.asGridCoord(14, 7)]: true,
  [utils.asGridCoord(15, 6)]: true,
  [utils.asGridCoord(15, 8)]: true,
  [utils.asGridCoord(15, 9)]: true,
  [utils.asGridCoord(16, 9)]: true,
  [utils.asGridCoord(17, 10)]: true,
  [utils.asGridCoord(17, 11)]: true,
  [utils.asGridCoord(15, 12)]: true,
  [utils.asGridCoord(16, 12)]: true,
  [utils.asGridCoord(4, 11)]: true,
  [utils.asGridCoord(5, 11)]: true,
  [utils.asGridCoord(6, 11)]: true,
  [utils.asGridCoord(7, 11)]: true,
  [utils.asGridCoord(8, 11)]: true,
  [utils.asGridCoord(9, 11)]: true,
  [utils.asGridCoord(10, 11)]: true,
  [utils.asGridCoord(11, 11)]: true,
  [utils.asGridCoord(12, 11)]: true,
  [utils.asGridCoord(13, 11)]: true,
  [utils.asGridCoord(14, 11)]: true,
  [utils.asGridCoord(3, 9)]: true,
  [utils.asGridCoord(3, 10)]: true,
  [utils.asGridCoord(2, 7)]: true,
  [utils.asGridCoord(2, 8)]: true,
  [utils.asGridCoord(1, 7)]: true,
  [utils.asGridCoord(0, 6)]: true,
  [utils.asGridCoord(0, 5)]: true,
  [utils.asGridCoord(1, 4)]: true,
  [utils.asGridCoord(2, 4)]: true,
  [utils.asGridCoord(2, 3)]: true,
  [utils.asGridCoord(3, 2)]: true,
  [utils.asGridCoord(4, 2)]: true,
  [utils.asGridCoord(5, 2)]: true,
  },
};