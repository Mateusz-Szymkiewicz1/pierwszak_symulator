window.OverworldMaps.Pielegniarka = {
        id: "Pielegniarka",
        lowerSrc: "images/maps/PielegniarkaLower.png",
        gameObjects: {
            Klucz_Schron: new Person({
                x: utils.withGrid(0),
                y: utils.withGrid(9),
                pickUp: true,
                counter: 0,
                src: "images/maps/blank.png",
            }),
            ranny: new Person({
                x: utils.withGrid(1),
                y: utils.withGrid(6),
                counter: 0,
                useShadow: true,
                src: "images/characters/people/ranny.png",
                talking: [
                    {
                        events: [
                            {who: "ranny",type: "talk",},
                       ]
                   }
               ],
               behaviorLoop: [
                    {type: "stand",direction: "right",time: 100000},
                ]
            }),
            pielegniarka: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                counter: 0,
                useShadow: true,
                src: "images/characters/people/npc6.png",
                talking: [
                    {
                        events: [
                            {who: "pielegniarka",type: "talk"},
                       ]
                   }
               ],
            }),
            pielegniarka_shop: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(3),
                counter: 0,
                src: "images/maps/blank.png",
                talking: [
                    {
                        events: [
                            {
                                type: "shop",
                                products: [
                                    {id: "Apteczka",price: "50"},
                                    {id: "Bandaż",price: "30"},
                                    {id: "Miks.Regeneracji",price: "20"},
                                    {id: "Krople Żołądkowe",price: "40"},
                                    {id: "Miks.Szybkości",price: "30"}
                                ]
                            },
                       ]
                   }
               ],
            }),
             Apteczka: new Person({
                id: "Apteczka",
                x: utils.withGrid(3),
                y: utils.withGrid(6),
                walkable: true,
                pickUp: true,
                counter: 0,
                movePixels: true,
                src: "images/Objects/medkit.png",
                talking: [
                    {
                        events: [
                            {who: "Apteczka",type: "textMessage",text: 'Znalazłeś "Apteczka"!!'},
                            {who: "Apteczka",type: "stand",direction: "left",time: 200},
                       ]
                   }
               ],
            }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(9),
                useShadow: true,
            }),
        },
        cutsceneSpaces: {
                [utils.asGridCoord(2, 9)]: [
                {
                    events: [
                        {
                            type: "changeMap",
                            map: "KorytarzPrawy",
                            x: utils.withGrid(18),
                            y: utils.withGrid(8),
                            direction: "down"
                        },
                    ]
                }
            ],
        },
        walls: {
            [utils.asGridCoord(2, 10)]: true,
            [utils.asGridCoord(1, 7)]: true,
            [utils.asGridCoord(1, 9)]: true,
            [utils.asGridCoord(3, 9)]: true,
            [utils.asGridCoord(1, 5)]: true,
            [utils.asGridCoord(3, 7)]: true,
            [utils.asGridCoord(3, 5)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(1, 6)]: true,
            [utils.asGridCoord(2, 3)]: true,
            [utils.asGridCoord(1, 1)]: true,
            [utils.asGridCoord(0, 8)]: true,
            [utils.asGridCoord(0, 2)]: true,
            [utils.asGridCoord(0, 3)]: true,
            [utils.asGridCoord(0, 4)]: true,
            [utils.asGridCoord(4, 6)]: true,
            [utils.asGridCoord(4, 8)]: true,
        },
    start_func: function(){
        const progress = new Progress();
        progress.load();
        progress.heroInventory.forEach(e =>{
            if(e.id == "Apteczka"){
                delete window.OverworldMaps.Pielegniarka.gameObjects.Apteczka;
            }
        })
        window.quests.forEach(e =>{
            if(e.id == "Klucz_do_schronu"){
                if(e.progress == 0){
                    window.OverworldMaps.Pielegniarka.gameObjects.ranny.talking[0].events = [
                        {who: "ranny", type: "textMessage", text: "Już mam dość schronu..."},
                        {who: "ranny", type: "textMessage", text: "???"},
                        {who: "ranny", type: "textMessage", text: "Chciałbyś się tam dostać?"},
                        {who: "ranny", type: "textMessage", text: "Tak mi się chce jarać..."},
                        {who: "ranny", type: "textMessage", text: "Daj mi szluga to się dogadamy."},
                        {code: 'const quest = new QuestLog({onComplete: () => {}});quest.end_quest("Klucz_do_schronu");',type: "do_code"},
                        {
                            code: 'const quest = new QuestLog({onComplete: () => {}});quest.add_quest({id: "Przysługa",desc: "Przynieś Jędrkowi szlugi"});',
                            type: "do_code",
                        },
                        {type: "do_code", code: "window.OverworldMaps.Pielegniarka.start_func();"},
                    ];
                }else{
                    window.OverworldMaps.Pielegniarka.gameObjects.ranny.talking = [{events:[{who: "ranny",type: "talk"}]}
               ];
                }
            }
            if(e.id == "Przysługa"){
                if(e.progress == 0){
                  window.OverworldMaps.Pielegniarka.gameObjects.ranny.talking[0].events = [
                      {
                        type: "question",
                        who: "ranny",
                        text: "???",
                        options: [
                                    {
                                        text: "Trzymaj szluga",
                                        reaction: 'let map = window.map;map.startCutscene([{type: "textMessage", text: "Trzymaj...",who:"ranny"},{type:"textMessage",who:"Klucz_Schron",text: "Otrzymałeś Klucz do schronu!"}]);window.heroInventory.find(x=> x.id === "Kiepy").amount--;const quest = new QuestLog({onComplete: () => {}});quest.end_quest("Przysługa");',
                                        req: 'window.heroInventory.find(x=> x.id === "Kiepy") && window.heroInventory.find(x=> x.id === "Kiepy").amount > 0 && !window.heroInventory.find(x=> x.id === "Kiepy").deleted',
                                    },
                                    {text: "Nic...",reaction: ''},
                                ]
                       }  
                  ];  
                }
            }
        })
    }
    };