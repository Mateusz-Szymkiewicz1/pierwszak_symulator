window.NPCs.push({
  id: "fight_tutorial",
  talking: [
    [
            {
                type: "question",
                text: "Chcesz się nauczyć walki?",
                options: [
                            {
                                text: "Tak",
                                reaction: `let map = window.map;map.startCutscene([{type: "textMessage",text: "Witaj w tutorialu!"},
                                {type: "textMessage",text: 'Aby uderzyć prawą reką kliknij "J"'},
                                {type: "textMessage",text: 'Aby uderzyć lewą reką kliknij "H"'},
                                {type: "textMessage",text: 'Aby zablokować cios kliknij "G"'},
                                {type: "textMessage",text: 'Aby kucnąć kliknij "B"'},
                                {type: "textMessage",text: 'Powodzenia!'},
                                {type: "do_code", code: 'window.relations.add_relationship("fight_tutorial", 10);window.OverworldMaps.Schron.start_func();'}
                                ]);`,
                            },
                            {text: "Nie",reaction: ''},
                        ]
            }
    ],
]
});