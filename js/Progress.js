class Progress {
    constructor() {
        this.mapId = "School";
        this.startingHeroX = 0;
        this.startingHeroY = 0;
        this.startingHeroDirection = "up";
        this.heroInventory = [];
        this.saveFileKey = "rpg_savefile1";
    }

    save() {
        window.localStorage.setItem(this.saveFileKey, JSON.stringify({
            mapId: this.mapId,
            startingHeroX: this.startingHeroX,
            startingHeroY: this.startingHeroY,
            startingHeroDirection: this.startingHeroDirection,
            heroInventory: window.heroInventory,
            health: window.health,
        }, ["mapId","startingHeroX","startingHeroY","startingHeroDirection","heroInventory","id","deleted","amount","health"]))
    }

    getSaveFile() {
        const file = window.localStorage.getItem(this.saveFileKey);
        return file ? JSON.parse(file) : null
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
        }
    }

}
