window.OverworldMaps.S129 = {
  id: "S129",
  lowerSrc: "images/maps/S129Lower.png",
  gameObjects: {
      hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(13),
          y: utils.withGrid(11),
          useShadow: true
      }),
  },
  cutsceneSpaces: {
          [utils.asGridCoord(13, 11)]: [
          {
              events: [
                  {
                      type: "changeMap",
                      map: "KorytarzLewy1",
                      x: utils.withGrid(13),
                      y: utils.withGrid(3),
                      direction: "down"
                  },
              ]
          }
      ],
  },
  walls: {
      [utils.asGridCoord(14, 11)]: true,
      [utils.asGridCoord(14, 10)]: true,
      [utils.asGridCoord(15, 10)]: true,
      [utils.asGridCoord(12, 11)]: true,
      [utils.asGridCoord(13, 12)]: true,
      [utils.asGridCoord(12, 10)]: true,
      [utils.asGridCoord(12, 9)]: true,
      [utils.asGridCoord(11, 9)]: true,
      [utils.asGridCoord(10, 9)]: true,
      [utils.asGridCoord(9, 9)]: true,
      [utils.asGridCoord(8, 9)]: true,
      [utils.asGridCoord(7, 9)]: true,
      [utils.asGridCoord(6, 9)]: true,
      [utils.asGridCoord(5, 9)]: true,
      [utils.asGridCoord(4, 9)]: true,
      [utils.asGridCoord(3, 9)]: true,
      [utils.asGridCoord(2, 9)]: true,
      [utils.asGridCoord(1, 9)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(1, 4)]: true,
      [utils.asGridCoord(2, 4)]: true,
      [utils.asGridCoord(3, 4)]: true,
      [utils.asGridCoord(4, 4)]: true,
      [utils.asGridCoord(5, 4)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(7, 4)]: true,
      [utils.asGridCoord(8, 4)]: true,
      [utils.asGridCoord(9, 4)]: true,
      [utils.asGridCoord(10, 4)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(12, 4)]: true,
      [utils.asGridCoord(13, 4)]: true,
      [utils.asGridCoord(14, 4)]: true,
      [utils.asGridCoord(15, 5)]: true,
      [utils.asGridCoord(15, 6)]: true,
      [utils.asGridCoord(15, 7)]: true,
      [utils.asGridCoord(15, 8)]: true,
      [utils.asGridCoord(16, 9)]: true,
      [utils.asGridCoord(3, 6)]: true,
      [utils.asGridCoord(4, 6)]: true,
      [utils.asGridCoord(5, 6)]: true,
      [utils.asGridCoord(6, 6)]: true,
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(9, 6)]: true,
      [utils.asGridCoord(10, 6)]: true,
      [utils.asGridCoord(11, 6)]: true,
      [utils.asGridCoord(12, 6)]: true,
      [utils.asGridCoord(3,7)]: true,
      [utils.asGridCoord(4,7)]: true,
      [utils.asGridCoord(5,7)]: true,
      [utils.asGridCoord(6,7)]: true,
      [utils.asGridCoord(7,7)]: true,
      [utils.asGridCoord(8,7)]: true,
      [utils.asGridCoord(9,7)]: true,
      [utils.asGridCoord(10,7)]: true,
      [utils.asGridCoord(11,7)]: true,
      [utils.asGridCoord(12,7)]: true,
  }
};