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
        
    }
];