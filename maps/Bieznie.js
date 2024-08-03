window.OverworldMaps.Bieznie = {
  id: "Bieznie",
  lowerSrc: "images/maps/BieznieLower.png",
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
                      map: "OZE",
                      x: utils.withGrid(6),
                      y: utils.withGrid(18),
                      direction: "left"
                  },
              ]
          }
      ],
      [utils.asGridCoord(2, 7)]: [
        {
            events: [
                {
                    type: "textMessage",
                    text: "154cm 62kg..."
                },
                {
                  type: "textMessage",
                  text: "💀💀💀"
              },
            ]
        }
    ],
  },
  walls: {
    [utils.asGridCoord(0, 6)]: true,
    [utils.asGridCoord(1, 7)]: true,
    [utils.asGridCoord(1, 5)]: true,
    [utils.asGridCoord(2, 8)]: true,
    [utils.asGridCoord(3, 8)]: true,
    [utils.asGridCoord(4, 8)]: true,
    [utils.asGridCoord(2, 2)]: true,
    [utils.asGridCoord(2, 3)]: true,
    [utils.asGridCoord(2, 4)]: true,
    [utils.asGridCoord(2, 5)]: true,
    [utils.asGridCoord(3, 1)]: true,
    [utils.asGridCoord(4, 2)]: true,
    [utils.asGridCoord(5, 3)]: true,
    [utils.asGridCoord(5, 4)]: true,
    [utils.asGridCoord(5, 5)]: true,
    [utils.asGridCoord(5, 6)]: true,
    [utils.asGridCoord(5, 7)]: true,
  },
};