window.OverworldMaps.K1 = {
  id: "K1",
  lowerSrc: "images/maps/K1Lower.png",
  upperSrc: "images/maps/K1Upper.png",
  gameObjects: {
      hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(6),
          y: utils.withGrid(1),
          useShadow: true
      }),
  },
  cutsceneSpaces: {
          [utils.asGridCoord(6, 1)]: [
          {
              events: [
                  {
                      type: "changeMap",
                      map: "KorytarzLewy1",
                      x: utils.withGrid(8),
                      y: utils.withGrid(5),
                      direction: "up"
                  },
              ]
          }
      ],
  },
  walls: {
      [utils.asGridCoord(6, 0)]: true,
      [utils.asGridCoord(5, 1)]: true,
      [utils.asGridCoord(7, 1)]: true,
      [utils.asGridCoord(1, 2)]: true,
      [utils.asGridCoord(2, 2)]: true,
      [utils.asGridCoord(3, 2)]: true,
      [utils.asGridCoord(4, 2)]: true,
      [utils.asGridCoord(0, 3)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(1, 4)]: true,
      [utils.asGridCoord(2, 4)]: true,
      [utils.asGridCoord(3, 4)]: true,
      [utils.asGridCoord(4, 4)]: true,
      [utils.asGridCoord(1, 5)]: true,
      [utils.asGridCoord(2, 5)]: true,
      [utils.asGridCoord(3, 5)]: true,
      [utils.asGridCoord(4, 5)]: true,
      [utils.asGridCoord(1, 7)]: true,
      [utils.asGridCoord(2, 7)]: true,
      [utils.asGridCoord(3, 7)]: true,
      [utils.asGridCoord(4, 7)]: true,
      [utils.asGridCoord(5, 7)]: true,
      [utils.asGridCoord(7, 2)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(7, 4)]: true,
      [utils.asGridCoord(7, 5)]: true,
      [utils.asGridCoord(6, 8)]: true,
      [utils.asGridCoord(7, 8)]: true,
      [utils.asGridCoord(8, 7)]: true,
      [utils.asGridCoord(8, 4)]: true,
      [utils.asGridCoord(9, 6)]: true,
      [utils.asGridCoord(9, 5)]: true,
  }
};