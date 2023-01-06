window.NPCs.push({
      id: "ziomek",
      portrait: "krobus.png",
      title: "Ziomek",
    talking: [
        [
            {
                type: "question",
                who: "ziomek",
                faceHero: "ziomek",
                text: "Masz ognia?",
                options: [
                            {
                                text: "Tak",
                                reaction: 'let map = window.map;map.startCutscene([{type: "textMessage",who:"ziomek",faceHero:"ziomek",text:"Dzięki :D"}]);'
                            },
                            {
                                text: "Nie",
                                reaction: ''
                            }
                        ]
            }
        ],
    ]
});