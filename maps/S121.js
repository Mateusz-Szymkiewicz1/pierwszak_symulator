window.OverworldMaps.S121 = {
  id: "S121",
  lowerSrc: "images/maps/S121Lower.png",
  gameObjects: {
      hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(1),
          y: utils.withGrid(6),
          useShadow: true,
      }),
  },
  cutsceneSpaces: {
         [utils.asGridCoord(1, 6)]: [
          {
              events: [
                  {
                      type: "changeMap",
                      map: "Hol",
                      x: utils.withGrid(5),
                      y: utils.withGrid(3),
                      direction: "left"
                  },
              ]
          }
      ],
  },
  walls: {
    [utils.asGridCoord(1, 7)]: true,
    [utils.asGridCoord(1, 5)]: true,
    [utils.asGridCoord(0, 6)]: true,
    [utils.asGridCoord(2, 7)]: true,
    [utils.asGridCoord(6, 7)]: true,
    [utils.asGridCoord(6, 6)]: true,
    [utils.asGridCoord(3, 8)]: true,
    [utils.asGridCoord(4, 8)]: true,
    [utils.asGridCoord(5, 8)]: true,
    [utils.asGridCoord(2, 5)]: true,
    [utils.asGridCoord(3, 5)]: true,
    [utils.asGridCoord(3, 4)]: true,
    [utils.asGridCoord(3, 3)]: true,
    [utils.asGridCoord(3, 2)]: true,
    [utils.asGridCoord(5, 5)]: true,
    [utils.asGridCoord(5, 4)]: true,
    [utils.asGridCoord(5, 3)]: true,
    [utils.asGridCoord(5, 2)]: true,
    [utils.asGridCoord(4, 1)]: true,
  },
};