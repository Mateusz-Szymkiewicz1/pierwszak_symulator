window.OverworldMaps.S19 = {
  id: "S19",
  lowerSrc: "images/maps/S19Lower.png",
  upperSrc: "images/maps/S19Upper.png",
  gameObjects: {
      hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(6),
          y: utils.withGrid(7),
          useShadow: true,
      }),
  },
  cutsceneSpaces: {
         [utils.asGridCoord(1, 7)]: [
          {
              events: [
                  {
                      type: "changeMap",
                      map: "OZE",
                      x: utils.withGrid(6),
                      y: utils.withGrid(16),
                      direction: "left"
                  },
              ]
          }
      ],
  },
  walls: {
    [utils.asGridCoord(1, 8)]: true,
    [utils.asGridCoord(1, 6)]: true,
    [utils.asGridCoord(1, 5)]: true,
    [utils.asGridCoord(1, 4)]: true,
    [utils.asGridCoord(1, 3)]: true,
    [utils.asGridCoord(1, 2)]: true,
    [utils.asGridCoord(2, 1)]: true,
    [utils.asGridCoord(3, 1)]: true,
    [utils.asGridCoord(4, 1)]: true,
    [utils.asGridCoord(5, 1)]: true,
    [utils.asGridCoord(6, 2)]: true,
    [utils.asGridCoord(6, 6)]: true,
    [utils.asGridCoord(5, 7)]: true,
    [utils.asGridCoord(5, 8)]: true,
    [utils.asGridCoord(2, 9)]: true,
    [utils.asGridCoord(3, 9)]: true,
    [utils.asGridCoord(4, 9)]: true,
    [utils.asGridCoord(3, 3)]: true,
    [utils.asGridCoord(3, 4)]: true,
    [utils.asGridCoord(3, 5)]: true,
    [utils.asGridCoord(3, 6)]: true,
    [utils.asGridCoord(5, 3)]: true,
    [utils.asGridCoord(5, 4)]: true,
    [utils.asGridCoord(5, 5)]: true,
    [utils.asGridCoord(4, 3)]: true,
    [utils.asGridCoord(4, 4)]: true,
    [utils.asGridCoord(4, 5)]: true,
    [utils.asGridCoord(2, 8)]: true,
    [utils.asGridCoord(0, 7)]: true,
  },
};