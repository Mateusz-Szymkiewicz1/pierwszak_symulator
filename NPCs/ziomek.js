window.NPCs.push({
      id: "ziomek",
      portrait: "krobus.png",
      title: "Ziomek",
    talking: [
        [
            {
                once: true,
                type: "question",
                who: "ziomek",
                faceHero: "ziomek",
                text: "Masz dać szluga?",
                options: [
                            {
                                text: "Tak",
                                reaction: 'let map = window.map;map.startCutscene([{type: "textMessage",who:"ziomek",faceHero:"ziomek",text:"Dzięki :D"}]);window.heroInventory.find(x=> x.id === "Kiepy").amount--;',
                                req: 'window.heroInventory.find(x=> x.id === "Kiepy") && window.heroInventory.find(x=> x.id === "Kiepy").amount > 0 && !window.heroInventory.find(x=> x.id === "Kiepy").deleted',
                            },
                            {text: "Nie",reaction: ''},
                            {text: "Mam ostatniego",reaction: ''}
                        ]
            }
        ],
        [
            {type: "textMessage",who: "ziomek",faceHero: "ziomek",text: "Kocham gilzy kokosowe <3", }
        ],
    ]
});