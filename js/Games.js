import Name from "./Names.js";

export default class Game {
    constructor(objectGame) {
        this[0] = [];
        if  (objectGame.length > 0) {
            objectGame.forEach((el) => {
                this[0].push({
                    game_index: el.game_index,
                    version: new Name(el.version.name, el.version.url)
                })
            }); 
        }
    }
}