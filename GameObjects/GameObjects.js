window.GameObjects = [
    {
        id: "Kiepy",
        src: "images/objects/cigs.png",
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
        src: "images/objects/podrecznik.png",
        desc: "1200 stron mądrości życiowej",
        can_delete: true,
    },
    {
        id: "Klucz_Szafka",
        src: "images/objects/klucz_szafka.png",
        desc: '"nr.213" - Lepiej go nie zgub.',
        can_delete: false,
    },{
        id:  "Apteczka",
        src: "images/objects/medkit.png",
        desc: "Leczy całe HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.add(100);'
            }
        ],
        use_req: "1==1"
        
    },
    {
        id:  "Rogal",
        src: "images/objects/croissant.png",
        desc: "Uzdrawia 15 HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.add(15);'
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Obwarzanek",
        src: "images/objects/pretzel.png",
        desc: "Uzdrawia 10 HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.add(10);'
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Pizza",
        src: "images/objects/pizza.png",
        desc: "Uzdrawia 20 HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.add(20);'
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Monster",
        src: "images/objects/monster.png",
        desc: "+1 Prędkość +1 Szansa na zawał",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.substract(3);window.speed = 2;setTimeout(function(){window.speed = 1;}, 91300)'
            },{
                type: "do_code",
                code: 'const buff = new Buff("Speed", 90000);buff.init();'
            }
            
        ],
        use_req: "window.speed != 2", 
        use_req_text: "Zostaw bo ci pikawa siądzie!"
    },
    {
        id:  "Woda",
        src: "images/objects/water.png",
        desc: "W sumie to nic nie robi",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: ''
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Cola",
        src: "images/objects/cola.png",
        desc: "Oryginalna receptura",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: ''
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Baton",
        src: "images/objects/baton.png",
        desc: "500kcal + cukrzyca",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.add(5)'
            }
        ],
        use_req: "1==1"
    },
    {
        id:  "Kanapka",
        src: "images/objects/sandwich.png",
        desc: "Uzdrawia 25HP",
        can_delete: true,
        amount: "1",
        use: [
            {
                type: "do_code",
                code: 'window.health_bar.add(25)'
            }
        ],
        use_req: "1==1"
    }
];