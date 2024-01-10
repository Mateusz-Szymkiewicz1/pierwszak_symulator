window.OverworldMaps.Izolatka = {
  id: "Izolatka",
  lowerSrc: "images/maps/IzolatkaLower.png",
  gameObjects: {
     placeholder: new Person({
        src: "images/maps/blank.png"
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
                      map: "KorytarzLewy1",
                      x: utils.withGrid(13),
                      y: utils.withGrid(5),
                      direction: "up"
                  },
              ]
          }
      ],
  },
  walls: {
      [utils.asGridCoord(1, 1)]: true,
      [utils.asGridCoord(3, 1)]: true,
      [utils.asGridCoord(2, 0)]: true,
      [utils.asGridCoord(1, 2)]: true,
      [utils.asGridCoord(1, 4)]: true,
      [utils.asGridCoord(1, 5)]: true,
      [utils.asGridCoord(1, 6)]: true,
      [utils.asGridCoord(1, 7)]: true,
      [utils.asGridCoord(2, 8)]: true,
      [utils.asGridCoord(3, 2)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(3, 4)]: true,
      [utils.asGridCoord(3, 5)]: true,
      [utils.asGridCoord(3, 6)]: true,
      [utils.asGridCoord(3, 7)]: true,
      [utils.asGridCoord(0, 3)]: true,
  },
};