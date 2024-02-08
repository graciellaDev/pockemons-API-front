import Name from "./Names.js";
import Game from "./Games.js";

export default class Pockemon {
    constructor(objectPocemon) {
        this.name = objectPocemon.name;
        this.order = objectPocemon.order;
        this.post_abilities = objectPocemon.post_abilities;
        this.base_experience = objectPocemon.base_experience;
        this.height = objectPocemon.height;
        this.held_items = objectPocemon.held_items;
        this.id = objectPocemon.id;
        this.is_default = objectPocemon.is_default;
        this.location_area_encounters = objectPocemon.location_area_encounters;
        this.weight = objectPocemon.weight;
        this.abilities = new Abilities(objectPocemon.abilities);
        this.forms = new Forms(objectPocemon.forms);
        this.game_indices = new Game(objectPocemon.game_indices);
        this.moves = new Moves(objectPocemon.moves);
        this.past_types = new PastAbilities(objectPocemon.past_types);
        this.species = new Name(objectPocemon.species.name, objectPocemon.species.url);
        this.sprites = new Sprites(objectPocemon.sprites);
        this.stats = new Stats(objectPocemon.stats);
        this.types = new Types(objectPocemon.types);
    }  
}

class PastAbilities {
    constructor(objectPast) {
        this[0] = [];
    }
}

class Abilities {
    constructor(objectAbility) {
        this[0] = [];
        if (objectAbility.length > 0) {
            objectAbility.forEach((el) => {
                this[0].push({
                    ability: new Name(el.ability.name, el.ability.url),
                    is_hidden: el.is_hidden,
                    slot: el.slot
                });
            });
            
        }
    }
}

class Moves {
    constructor(objectMoves) {
        this[0] = [];
        if (objectMoves.length > 0) {
            objectMoves.forEach((el) => {
                this[0].push({
                    movie: new Name(el.move.name, el.move.url),
                    version_group_details: new VersionGroupDetails(el.version_group_details)
                })
            })
        }
    }
}

class VersionGroupDetails {
    constructor(objectVersion) {
        this[0] = [];
        if (objectVersion.length > 0) {
            objectVersion.forEach((el) => {
                this[0].push({
                    level_learned_at: el.level_learned_at,
                    move_learn_method: new Name(el.move_learn_method.name, el.move_learn_method.url),
                    version_group: new Name(el.version_group.name, el.version_group.url)
                });
            })
        }
    }
}

class Face {
    constructor(objectFace) {
        this.back_default = objectFace.back_default;
        this.front_default = objectFace.front_default;
    }
}

class FaceShany extends Face{
    constructor(objectShany) {
        super(objectShany);
        this.back_female = objectShany.back_female;
        this.back_shiny = objectShany.back_shiny;
        this.back_shiny_female = objectShany.back_shiny_female;
        this.front_female = objectShany.front_female;
        this.front_shiny = objectShany.front_shiny;
        this.front_shiny_female = objectShany.front_shiny_female;
    }
}

class Sprites extends FaceShany {
    constructor(objectSprites) {
        super(objectSprites);
        this.other = new Other(objectSprites.other);
        this.versions = new Versions(objectSprites.versions);
    }
}

class Other {
    constructor(objectOther) {
        this.dream_world = new DreamWorld(objectOther.dream_world);
        this.home = new Home(objectOther.home);
        this['official-artwork'] = new OfficialArtwork(objectOther['official-artwork']);
        this.showdown = new FaceShany(objectOther.showdown);
    }
}

class DreamWorld {
    constructor(objectWorld) {
        this.front_default = objectWorld.front_default;
        this.front_female = objectWorld.front_female;
    }
}

class Home extends DreamWorld {
    constructor(objectHome) {
        super(objectHome);
        this.front_shiny = objectHome.front_shiny;
        this.front_shiny_female = objectHome.front_shiny_female;
    }
}

class OfficialArtwork {
    constructor(objectAtwork) {
        this.front_default = objectAtwork.front_default;
        this.front_shiny = objectAtwork.front_shiny;
    }
}

class Versions {
    constructor(objectVersions) {
        this['generation-i'] = new GenerationI(objectVersions['generation-i']);
        this['generation-ii'] = new GenerationII(objectVersions['generation-ii']);
        this['generation-iii'] = new GenerationIII(objectVersions['generation-iii']);
        this['generation-iv'] = new GenerationIV(objectVersions['generation-iv']);
        this['generation-v'] = new GenerationV(objectVersions['generation-v']);
        this['generation-vi'] = new GenerationVI(objectVersions['generation-vi']);
        this['generation-vii'] = new GenerationVII(objectVersions['generation-vii']);
        this['generation-viii'] = new GenerationVIII(objectVersions['generation-viii']);
    }
}

class GenerationI {
    constructor(objectI) {
        this['red-blue'] = new GrayTransparent(objectI['red-blue']);
        this.yellow = new GrayTransparent(objectI.yellow);
    }
}

class GenerationII {
    constructor(objectII) {
        this.crystal = new ShinyTransparent(objectII.crystal);
        this.gold = new ShinyFrontTransparent(objectII.gold);
        this.silver = new ShinyFrontTransparent(objectII.silver);
    }
}

class GenerationIII {
    constructor(objectIII) {
        this.emerald = new FrontDefautlShany(objectIII.emerald);
        this['firered-leafgreen'] = new DefaultShiny(objectIII['firered-leafgreen']);
        this['ruby-sapphire'] = new DefaultShiny(objectIII['ruby-sapphire']);
    }
}

class GenerationIV {
    constructor(objectIV) {
        this['diamond-pearl'] = new DefaultShinyFimale(objectIV['diamond-pearl']);
        this['heartgold-soulsilver'] = new DefaultShinyFimale(objectIV['heartgold-soulsilver']);
        this.platinum = new DefaultShinyFimale(objectIV.platinum);
    }
}

class GenerationV {
    constructor(objectV) {
        this['black-white'] = new DefaultShinyFimale(objectV['black-white']);
    }
}

class GenerationVI {
    constructor(objectVI) {
        this['omegaruby-alphasapphire'] = new FrontFimaleShine(objectVI['omegaruby-alphasapphire']);
        this['x-y'] = new FrontFimaleShine(objectVI['x-y']);
    }
}

class GenerationVII {
    constructor(objectVII) {
        this.icons = new FrontDefaultFimale(objectVII.icons);
        this['ultra-sun-ultra-moon'] = new DefaultShinyFimale(objectVII['ultra-sun-ultra-moon']);
    }
}

class GenerationVIII {
    constructor(objectVIII) {
        this.icons = new FrontDefaultFimale(objectVIII.icons);
    }
}

class FrontDefautlShany {
    constructor(objectShany) {
        this.front_default = objectShany.front_default;
        this.front_shiny = objectShany.front_shiny;
    }
}

class DefaultShiny extends FrontDefautlShany{
    constructor(objectShany) {
        super(objectShany);
        this.back_default = objectShany.back_default;
        this.back_shiny = objectShany.back_shiny;
    }
}

class DefaultShinyFimale extends DefaultShiny{
    constructor(objectShinyFimale) {
        super(objectShinyFimale);
        this.back_female = objectShinyFimale.back_female;
        this.front_female = objectShinyFimale.front_female;
        this.front_shiny_female = objectShinyFimale.front_shiny_female;
        this.back_shiny_female = objectShinyFimale.back_shiny_female;
    }
}

class ShinyFrontTransparent extends DefaultShiny{
    constructor(objectShiny) {
        super(objectShiny);
        this.front_transparent = objectShiny.front_transparent;
    }
}

class ShinyTransparent extends DefaultShiny{
    constructor(objectShiny) {
        super(objectShiny);
        this.back_shiny_transparent = objectShiny.back_shiny_transparent;
        this.front_shiny_transparent = objectShiny.front_shiny_transparent;
    }
}

class FrontDefaultFimale {
    constructor(objectFimale) {
        this.front_default = objectFimale.front_default;
        this.front_female = objectFimale.front_female;
    }
}

class GrayDefault extends Face{
    constructor(objectGray) {
        super(objectGray);
        this.back_gray = objectGray.back_gray;
        this.front_gray = objectGray.front_gray;
    }
}

class GrayTransparent extends GrayDefault {
    constructor(objectGray) {
        super(objectGray);
        this.back_transparent = objectGray.back_transparent;
        this.front_transparent = objectGray.front_transparent;
    }
}

class FrontFimaleShine extends FrontDefaultFimale{
    constructor(objectFimale) {
        super(objectFimale);
        this.front_shiny = objectFimale.front_shiny;
        this.front_shiny_female = objectFimale.front_shiny_female;
    }
}

class Stats {
    constructor(objectStats) {
        this[0] = [];
        if (objectStats.length > 0) {
            objectStats.forEach((el) => {
                this[0].push({
                    base_stat: el.base_stat,
                    effort: el.effort,
                    stat: new Name(el.stat.name, el.stat.url)
                });
            });
        }
    }
}

class Types {
    constructor(objectTypes) {
        this[0] = [];
        if (objectTypes.length > 0) {
            objectTypes.forEach((el) => {
                this[0].push({
                    slot: el.slot,
                    type: new Name(el.type.name, el.type.url)
                });
            });
        }
    }
}

class Forms {
    constructor(objectForms) {
        this[0] = [];
        if (objectForms.length > 0) {
            objectForms.forEach((el) => {
                this[0].push(new Name(el.name, el.url));
            });
        }
    }
}
