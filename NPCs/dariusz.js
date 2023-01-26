window.NPCs.push({
      id: "dariusz",
      portrait: "krobus.png",
      title: "Dariusz",
      talking: [
                    [
                        {who: "dariusz",type: "textMessage",text: "Kazali mi zapłacić za winkiel",faceHero: "dariusz"},
                        {who: "dariusz",type: "textMessage", text: "Teraz dzwonią po moich rodziców", faceHero: "dariusz"},
                        {who: "dariusz",type: "textMessage",text: "Dwulicowe szmaty",faceHero: "dariusz"},
                        {
                            once: true,
                            who: "dariusz",
                            type: "question",
                            text: "Wisła czy Cracovia?",
                            faceHero: "dariusz",
                            options: [
                                        {
                                        text: "Wisła",
                                        reaction: 'let map = window.map;map.startCutscene([{type: "textMessage",who:"dariusz",faceHero:"dariusz",text:"Serio? Wisła?"}]);'
                                        },
                                     {
                                         text: "Cracovia",
                                        reaction: 'let map = window.map;map.startCutscene([{type: "textMessage",who:"dariusz",faceHero:"dariusz",text:"Serio? Cracovia?"}]);'
                                     }
                                 ]
                            },
                ],
                [
                  {who: "dariusz",type: "textMessage",text: "Lorem Ipsum dolor sit amet",faceHero: "dariusz"}  
                ],
                [
                    {who: "dariusz",type: "textMessage",text: "Nie, nie jestem NPCem",faceHero: "dariusz"},
                    {who: "dariusz",type: "textMessage",text: "Wypuśćcie mnie",faceHero: "dariusz"}
                ],
      ]
});