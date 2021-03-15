import KeyChain from './key-chain';
import Property from './property';

class Schema {
    #keyChain;

    #items = [];

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

        this.#items.push(prop);

        return prop;
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
}

export default Schema;
