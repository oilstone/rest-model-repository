import KeyChain from './key-chain';
import Property from './property';

class Schema {
    #keyChain;

    #items = [];

    constructor() {
        this.#keyChain = new KeyChain();
    }

    prop(name) {
        let prop = new Property(name, this.#keyChain);

        this.#items.push(prop);

        return prop;
    }

    blueprint() {
        let blueprint = {};

        for (let item in this.#items) {
            blueprint[this.#items[item].name] = this.#items[item].make()
        }

        return blueprint;
    }

    get primaryKey() {
        return this.getPrimaryKey();
    }

    getPrimaryKey() {
        return this.#keyChain.primaryKey;
    }
}

export default Schema;