window.OverworldMaps.ToaletaKL1 = {
  id: "ToaletaKL1",
  lowerSrc: "images/maps/ToiletLower.png",
  upperSrc: "images/maps/ToiletUpper.png",
  gameObjects: {
      wcDrzwi: new Person({
          x: utils.withGrid(4),
          y: utils.withGrid(7),
          counter: 0,
          movePixels: true,
          src: "images/Objects/toilet_door.png",
          talking: [
              {
                  events: [
                      {who: "wcDrzwi",map: "ToaletaKL1",type: "open",src: 'images/Objects/toilet_door_opened.png'},
                 ]
             },
              {
                  events: [
                      {who: "wcDrzwi",map: "ToaletaKL1",type: "open",src: 'images/Objects/toilet_door.png'},
                 ]
             }
         ],
      }),
      wcDrzwi2: new Person({
          x: utils.withGrid(4),
          y: utils.withGrid(5),
          counter: 0,
          movePixels: true,
          src: "images/Objects/toilet_door.png",
          talking: [
              {
                  events: [
                      {who: "wcDrzwi2",map: "ToaletaKL1",type: "open",src: 'images/Objects/toilet_door_opened.png'},
                 ]
             },
              {
                  events: [
                      {who: "wcDrzwi2",map: "ToaletaKL1",type: "open",src: 'images/Objects/toilet_door.png'},
                 ]
             }
         ],
      }),
      hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(3),
          y: utils.withGrid(11),
          useShadow: true,
      }),
  },
  cutsceneSpaces: {
          [utils.asGridCoord(3, 12)]: [
          {
              events: [
                  {
                      type: "changeMap",
                      map: "KorytarzLewy1",
                      x: utils.withGrid(2),
                      y: utils.withGrid(3),
                      direction: "down"
                  },
              ]
          }
      ],
  },
  walls: {
     [utils.asGridCoord(3, 13)]: true,
     [utils.asGridCoord(2, 12)]: true,
     [utils.asGridCoord(4, 12)]: true,
     [utils.asGridCoord(1, 11)]: true,
     [utils.asGridCoord(1, 10)]: true,
     [utils.asGridCoord(1, 9)]: true,
      [utils.asGridCoord(5, 11)]: true,
     [utils.asGridCoord(5, 10)]: true,
     [utils.asGridCoord(5, 9)]: true,
     [utils.asGridCoord(2, 8)]: true,
     [utils.asGridCoord(4, 8)]: true,
     [utils.asGridCoord(1, 7)]: true,
     [utils.asGridCoord(1, 6)]: true,
     [utils.asGridCoord(1, 5)]: true,
     [utils.asGridCoord(1, 4)]: true,
     [utils.asGridCoord(1, 3)]: true,
     [utils.asGridCoord(1, 2)]: true,
     [utils.asGridCoord(2, 1)]: true,
     [utils.asGridCoord(3, 1)]: true,
     [utils.asGridCoord(4, 1)]: true,
     [utils.asGridCoord(5, 1)]: true,
     [utils.asGridCoord(6, 1)]: true,
     [utils.asGridCoord(7, 2)]: true,
     [utils.asGridCoord(7, 3)]: true,
     [utils.asGridCoord(7, 4)]: true,
     [utils.asGridCoord(7, 5)]: true,
     [utils.asGridCoord(7, 6)]: true,
     [utils.asGridCoord(7, 7)]: true,
     [utils.asGridCoord(5, 8)]: true,
     [utils.asGridCoord(6, 8)]: true,
     [utils.asGridCoord(2, 11)]: true,
     [utils.asGridCoord(4, 9)]: true,
     [utils.asGridCoord(4, 10)]: true,
     [utils.asGridCoord(4, 11)]: true,
     [utils.asGridCoord(6, 5)]: true,
     [utils.asGridCoord(6, 7)]: true,
     [utils.asGridCoord(4, 6)]: true,
     [utils.asGridCoord(5, 6)]: true,
     [utils.asGridCoord(6, 6)]: true,
     [utils.asGridCoord(4, 4)]: true,
     [utils.asGridCoord(5, 4)]: true,
     [utils.asGridCoord(6, 4)]: true,
  }
};