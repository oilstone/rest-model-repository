import KeyChain from './key-chain';
import Property from './property';

class Schema {
    #keyChain;

    #items = {};

    get primaryKey() {
        return this.getPrimaryKey();
    }

    get items() {
        return this.getItems();
    }

    set items(value) {
        return this.setItems(value);
    }

    constructor() {
        this.#keyChain = new KeyChain();
    }

    prop(name) {
        let prop = new Property(name, this.#keyChain);

        this.#items[name] = prop;

        return prop;
    }

    getProp(name) {
        return this.#items[name] || null
    }

    getPrimaryKey() {
        return this.#keyChain.primaryKey;
    }

    getItems() {
        return this.#items;
    }

    setItems(value) {
        this.#items = value;

        return this;
    }

    blueprint() {
        const blueprint = {};

        for (const name in this.#items) {
            const type = this.#items[name].getType()

            if (type instanceof Schema) {
                blueprint[name] = this.#items[name].blueprint();
                continue;
            }

            blueprint[name] = new type;
        }

        return blueprint;
    }
}

export default Schema;
