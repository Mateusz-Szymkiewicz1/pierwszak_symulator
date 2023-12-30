window.OverworldMaps.KorytarzLewy1 = {
  id: "KorytarzLewy1",
  lowerSrc: "images/maps/KorytarzLewy1Lower.png",
  upperSrc: "images/maps/KitchenUpper.png",
  gameObjects: {
      hero: new Person({
          isPlayerControlled: true,
          useShadow: true,
          x: utils.withGrid(15),
          y: utils.withGrid(3),
      }),
      s129: new Person({
          x: utils.withGrid(12),
          y: utils.withGrid(2),
          counter: 0,
          src: "images/maps/KitchenUpper.png",
          talking: [
              {
                  events: [
                      {type: "textMessage",text: '"Sala 129"'},
                 ]
             }
         ],
      }),
      s129Drzwi: new Person({
          x: utils.withGrid(13),
          y: utils.withGrid(2),
          counter: 0,
          src: "images/Objects/door.png",
          talking: [
              {
                  events: [
                      {
                          type: "do_code",
                          code: `let audio_door = document.querySelector("#audio_door_open");
                          audio_door.playbackRate = 2;
                          audio_door.volume = 0.2*window.sfx_volume;
                          audio_door.play();`
                      },
                      {
                          type: "changeMap",
                          map: "S129",
                          x: utils.withGrid(4),
                          y: utils.withGrid(11),
                          direction: "up"
                      },
                 ]
             },
         ],
      }),
      s130: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(2),
        counter: 0,
        src: "images/maps/KitchenUpper.png",
        talking: [
            {
                events: [
                    {type: "textMessage",text: '"Sala 130"'},
               ]
           }
       ],
    }),
    s130Drzwi: new Person({
        x: utils.withGrid(8),
        y: utils.withGrid(2),
        counter: 0,
        src: "images/Objects/door.png",
        talking: [
            {
                events: [
                    {
                        type: "do_code",
                        code: `let audio_door = document.querySelector("#audio_door_open");
                        audio_door.playbackRate = 2;
                        audio_door.volume = 0.2*window.sfx_volume;
                        audio_door.play();`
                    },
                    {
                        type: "changeMap",
                        map: "S130",
                        x: utils.withGrid(4),
                        y: utils.withGrid(11),
                        direction: "up"
                    },
               ]
           },
       ],
    }),
    ToaletaDrzwi: new Person({
      x: utils.withGrid(2),
      y: utils.withGrid(2),
      counter: 0,
      src: "images/Objects/door.png",
      talking: [
          {
              events: [
                  {
                      type: "do_code",
                      code: `let audio_door = document.querySelector("#audio_door_open");
                      audio_door.playbackRate = 2;
                      audio_door.volume = 0.2*window.sfx_volume;
                      audio_door.play();`
                  },
                  {
                      type: "changeMap",
                      map: "ToaletaKL1",
                      x: utils.withGrid(3),
                      y: utils.withGrid(12),
                      direction: "up"
                  },
             ]
         },
     ],
  }),
    K2Drzwi: new Person({
      x: utils.withGrid(2),
      y: utils.withGrid(6),
      counter: 0,
      movePixels: true,
      src: "images/Objects/door_down.png",
      talking: [
          {
            events: [
              {
                  type: "do_code",
                  code: `let audio_door = document.querySelector("#audio_door_open");
                  audio_door.playbackRate = 2;
                  audio_door.volume = 0.2*window.sfx_volume;
                  audio_door.play();`
              },
              {
                  type: "changeMap",
                  map: "K2",
                  x: utils.withGrid(4),
                  y: utils.withGrid(11),
                  direction: "up"
              },
            ]
         },
     ],
  }),
  K1Drzwi: new Person({
    x: utils.withGrid(8),
    y: utils.withGrid(6),
    counter: 0,
    movePixels: true,
    src: "images/Objects/door_down.png",
    talking: [
        {
          events: [
            {
                type: "do_code",
                code: `let audio_door = document.querySelector("#audio_door_open");
                audio_door.playbackRate = 2;
                audio_door.volume = 0.2*window.sfx_volume;
                audio_door.play();`
            },
            {
                type: "changeMap",
                map: "K1",
                x: utils.withGrid(4),
                y: utils.withGrid(11),
                direction: "up"
            },
          ]
       },
   ],
}),
ZapleczeDrzwi: new Person({
  x: utils.withGrid(11),
  y: utils.withGrid(6),
  counter: 0,
  movePixels: true,
  src: "images/Objects/door_down.png",
  talking: [
      {
        events: [
          {type: "textMessage",text: 'Zamknięte...'},
        ]
     },
 ],
}),
IzolatkaDrzwi: new Person({
  x: utils.withGrid(13),
  y: utils.withGrid(6),
  counter: 0,
  movePixels: true,
  src: "images/Objects/door_down.png",
  talking: [
      {
        events: [
          {
              type: "do_code",
              code: `let audio_door = document.querySelector("#audio_door_open");
              audio_door.playbackRate = 2;
              audio_door.volume = 0.2*window.sfx_volume;
              audio_door.play();`
          },
          {
              type: "changeMap",
              map: "Izolatka",
              x: utils.withGrid(4),
              y: utils.withGrid(11),
              direction: "up"
          },
        ]
     },
 ],
}),
  },
  cutsceneSpaces: {
          [utils.asGridCoord(15, 4)]: [
          {
              events: [
                  {
                      type: "changeMap",
                      map: "Hol",
                      x: utils.withGrid(1),
                      y: utils.withGrid(6),
                      direction: "right"
                  },
              ]
          }
      ],
      [utils.asGridCoord(15, 3)]: [
        {
            events: [
                {
                    type: "changeMap",
                    map: "Hol",
                    x: utils.withGrid(1),
                    y: utils.withGrid(5),
                    direction: "right"
                },
            ]
        }
    ],
  },
  walls: {
     [utils.asGridCoord(16, 3)]: true,
     [utils.asGridCoord(16, 4)]: true,
     [utils.asGridCoord(15, 2)]: true,
     [utils.asGridCoord(14, 2)]: true,
     [utils.asGridCoord(6, 2)]: true,
     [utils.asGridCoord(5, 2)]: true,
     [utils.asGridCoord(4, 2)]: true,
     [utils.asGridCoord(3, 2)]: true,
     [utils.asGridCoord(1, 2)]: true,
     [utils.asGridCoord(9, 3)]: true,
     [utils.asGridCoord(10, 3)]: true,
     [utils.asGridCoord(11, 3)]: true,
     [utils.asGridCoord(0, 3)]: true,
     [utils.asGridCoord(0, 4)]: true,
     [utils.asGridCoord(1, 5)]: true,
     [utils.asGridCoord(3, 5)]: true,
     [utils.asGridCoord(7, 5)]: true,
     [utils.asGridCoord(4, 5)]: true,
     [utils.asGridCoord(5, 5)]: true,
     [utils.asGridCoord(6, 5)]: true,
     [utils.asGridCoord(9, 6)]: true,
     [utils.asGridCoord(10, 6)]: true,
     [utils.asGridCoord(12, 6)]: true,
     [utils.asGridCoord(14, 6)]: true,
     [utils.asGridCoord(15, 5)]: true,
  },
};