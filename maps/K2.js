window.OverworldMaps.K2 = {
  id: "K2",
  lowerSrc: "images/maps/K2Lower.png",
  upperSrc: "images/maps/K2Upper.png",
  gameObjects: {
      placeholder: new Person({
         src: "images/maps/blank.png"
      }),
      hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(3),
          y: utils.withGrid(1),
          useShadow: true
      }),
  },
  cutsceneSpaces: {
          [utils.asGridCoord(3, 1)]: [
          {
              events: [
                  {
                      type: "changeMap",
                      map: "KorytarzLewy1",
                      x: utils.withGrid(2),
                      y: utils.withGrid(5),
                      direction: "up"
                  },
              ]
          }
      ],
  },
  walls: {
      [utils.asGridCoord(3, 0)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(3, 4)]: true,
      [utils.asGridCoord(3, 5)]: true,
      [utils.asGridCoord(3, 6)]: true,
      [utils.asGridCoord(2, 1)]: true,
      [utils.asGridCoord(4, 1)]: true,
      [utils.asGridCoord(5, 1)]: true,
      [utils.asGridCoord(6, 1)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(1, 2)]: true,
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(1, 4)]: true,
      [utils.asGridCoord(1, 5)]: true,
      [utils.asGridCoord(1, 6)]: true,
      [utils.asGridCoord(2, 7)]: true,
      [utils.asGridCoord(7, 2)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(7, 4)]: true,
      [utils.asGridCoord(7, 5)]: true,
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(6, 7)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(5, 4)]: true,
      [utils.asGridCoord(5, 5)]: true,
      [utils.asGridCoord(5, 6)]: true,
  }
};