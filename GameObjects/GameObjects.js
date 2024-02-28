window.GameObjects = [
    {
        id: "Kiepy",
        src: "images/Objects/cigs.png",
        desc: "Rak płuc za jedyne 16.99!",
        amount: "8",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.substract(4)'
            },
        ],
        use_req: 'window.map.id == "Toilet"',
        use_req_text: "Palić możesz tylko w kiblu lub na winklu!",
        can_delete: true
    },
    {
        id: "Podrecznik_access",
        src: "images/Objects/podrecznik.png",
        desc: "1200 stron mądrości życiowej",
        can_delete: true,
    },
    {
        id: "Klucz_Szafka",
        src: "images/Objects/klucz_szafka.png",
        desc: '"nr.213" - Lepiej go nie zgub.',
        can_delete: false,
    },
    {
        id: "Klucz_Schron",
        src: "images/Objects/klucz_schron.png",
        desc: '???',
        can_delete: false,
    },
    {
        id:  "Apteczka",
        src: "images/Objects/medkit.png",
        desc: "Leczy całe HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.add(100);'
            }
        ],
        use_req: "window.health<100",
        use_req_text: "Już masz 100 HP!"
        
    },
    {
        id:  "Bandaż",
        src: "images/Objects/bandage.png",
        desc: "Leczy 50 HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.add(50);'
            }
        ],
        use_req: "window.health<100",
        use_req_text: "Już masz 100 HP!"
        
    },
    {
        id:  "Miks.Regeneracji",
        src: "images/Objects/reg_potion.png",
        desc: "Efekt regeneracji na 30s",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "textMessage",
               text: "Zyskałeś Regenerację!"
            },
            {
                type: "do_code",
                code: 'const buff = new Buff("Regeneration", 30000);buff.init();'
            },
            {
                type: "do_code",
                code: `const interval = setInterval(function(){window.health_bar.add(1, false)}, 1000);setTimeout(function(){clearInterval(interval)}, 30000);`
            }
        ],
        use_req: 'window.health<100 && !document.querySelector(".buff[data-type=Regeneration]")',
        use_req_text: "Już masz 100 HP!/Regenerację"
        
    },
     {
        id:  "Miks.Szybkości",
        src: "images/Objects/speed_potion.png",
        desc: "Końska dawka kofeiny",
        can_delete: true,
        amount: "1",
         use: [
            {
                type: "do_code",
                code: 'window.speed = 2;setTimeout(function(){window.speed = 1;}, 91300)'
            },{
                type: "do_code",
                code: 'const buff = new Buff("Speed", 90000);buff.init();'
            }
            
        ],
        use_req: "window.speed != 2", 
        use_req_text: "Zostaw bo ci pikawa siądzie!"
    },
    {
        id:  "Krople Żołądkowe",
        src: "images/Objects/krople.png",
        desc: "Efekt regeneracji na 100s",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "textMessage",
               text: "Zyskałeś Regenerację!"
            },
            {
                type: "do_code",
                code: 'const buff = new Buff("Regeneration", 100000);buff.init();'
            },
            {
                type: "do_code",
                code: `const interval = setInterval(function(){window.health_bar.add(1, false)}, 1000);setTimeout(function(){clearInterval(interval)}, 100000);`
            }
        ],
        use_req: 'window.health<100 && !document.querySelector(".buff[data-type=Regeneration]")',
        use_req_text: "Już masz 100 HP/Regenerację!"
        
    },
    {
        id:  "Rogal",
        src: "images/Objects/croissant.png",
        desc: "Uzdrawia 15 HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "play_audio",
                audio: "eating",
                volume: 0.25
            },
            {
                type: "do_code",
                code: 'window.health_bar.add(15);'
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Obwarzanek",
        src: "images/Objects/pretzel.png",
        desc: "Uzdrawia 10 HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "play_audio",
                audio: "eating",
                volume: 0.25
            },
            {
                type: "do_code",
                code: 'window.health_bar.add(10);'
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Pizza",
        src: "images/Objects/pizza.png",
        desc: "Uzdrawia 20 HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "play_audio",
                audio: "eating",
                volume: 0.25
            },
            {
                type: "do_code",
                code: 'window.health_bar.add(20);'
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Monster",
        src: "images/Objects/monster.png",
        desc: "+1 Prędkość +1 Szansa na zawał",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "play_audio",
                audio: "drinking",
                volume: 0.25
            },
            {
                type: "do_code",
                code: 'window.health_bar.substract(3);window.speed = 2;setTimeout(function(){window.speed = 1;}, 91300)'
            },
            {
                type: "do_code",
                code: 'const buff = new Buff("Speed", 90000);buff.init();'
            }
            
        ],
        use_req: "window.speed != 2", 
        use_req_text: "Zostaw bo ci pikawa siądzie!"
    },
    {
        id:  "Woda",
        src: "images/Objects/water.png",
        desc: "W sumie to nic nie robi",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "play_audio",
                audio: "drinking",
                volume: 0.25
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Cola",
        src: "images/Objects/cola.png",
        desc: "Oryginalna receptura",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "play_audio",
                audio: "drinking",
                volume: 0.25
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Baton",
        src: "images/Objects/baton.png",
        desc: "500kcal + cukrzyca",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "play_audio",
                audio: "eating",
                volume: 0.25
            },
            {
                type: "do_code",
                code: 'window.health_bar.add(5)'
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Kanapka",
        src: "images/Objects/sandwich.png",
        desc: "Uzdrawia 25HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "play_audio",
                audio: "eating",
                volume: 0.25
            },
            {
                type: "do_code",
                code: 'window.health_bar.add(25)'
            }
        ],
        use_req: "1==1"
    }
];