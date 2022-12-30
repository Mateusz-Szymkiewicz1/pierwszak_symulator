class Progress {
    constructor() {
        this.mapId = "School";
        this.heroInventory = [];
        this.quests = [];
        this.gold = 0;
        this.saveFileKey = "saveFile";
        this.buffs = [];
    }

    save() {
        this.heroX = window.Overworld.map.gameObjects.hero.x;
        while(this.heroX%16 != 0){
            this.heroX--;
        }
        this.heroY = window.Overworld.map.gameObjects.hero.y;
        while(this.heroY%16 != 0){
            this.heroY--;
        }
        this.heroDirection = window.Overworld.map.gameObjects.hero.direction;
        this.buffs = [];
        if(document.querySelector(".buff")){
            document.querySelectorAll(".buff").forEach(el => {
                let obj = {
                    type: el.dataset.type,
                    time: el.dataset.time,
                }
                this.buffs.push(obj);
            })
        }
        window.localStorage.setItem(this.saveFileKey, JSON.stringify({
            mapId: this.mapId,
            startingHeroX: this.heroX,
            startingHeroY: this.heroY,
            startingHeroDirection: this.heroDirection,
            heroInventory: window.heroInventory,
            szafka: window.szafka,
            health: window.health,
            quests: window.quests,
            gold: window.gold,
            buffs: this.buffs
        }, ["mapId","startingHeroX","startingHeroY","startingHeroDirection","heroInventory","szafka","id","deleted","amount","tile","src","health", "quests", "desc", "progress", "deletable", "gold", "type", "time","buffs"]))
    }

    getSaveFile() {
        const file = window.localStorage.getItem(this.saveFileKey);
        return file ? JSON.parse(file) : null
    }

    save_preferences(){
        window.localStorage.setItem("preferences", JSON.stringify({
               scale: window.scale,
               website_color: window.website_color,
               game_color: window.game_color,
                sfx_volume: window.sfx_volume,
             music_volume: window.music_volume,
             sans_mode: window.sans_mode,
            }))
    }
    
    load() {
        const file = this.getSaveFile();
        if (file) {
            this.mapId = file.mapId;
            this.startingHeroX = file.startingHeroX;
            this.startingHeroY = file.startingHeroY;
            this.startingHeroDirection = file.startingHeroDirection;
            this.heroInventory = file.heroInventory;
            this.health = file.health;
            this.quests = file.quests;
            this.gold = file.gold;
            this.buffs = file.buffs;
            this.szafka = file.szafka;
        }
    }

}
