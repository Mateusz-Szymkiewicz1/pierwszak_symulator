window.GameObjects = [
    {
        id: "Kiepy",
        src: "images/objects/cigs.png",
        desc: "Rak płuc za jedyne 16.99!",
        amount: "8",
        use: [
            {
                type: "textMessage",
                text: 'Czas życia skrócony o 4 minuty.'
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
    }
];