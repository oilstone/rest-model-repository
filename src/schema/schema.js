import KeyChain from './key-chain';
import Property from './property';
import Collection from "./collection";

class Schema {
    #keyChain;

    #props = {};

    get primaryKey() {
        return this.getPrimaryKey();
    }

    get props() {
        return this.getProps();
    }

    set props(value) {
        return this.setProps(value);
    }

    constructor() {
        this.#keyChain = new KeyChain();
    }

    prop(name) {
        let prop = new Property(name, this.#keyChain);

        this.#props[name] = prop;

        return prop;
    }

    getProp(name) {
        return this.#props[name] || null
    }

    pullProp(path) {
        const pieces = path.split('.');
        let schema = this;
        let prop = null;

        pieces.forEach(piece => {
            prop = schema.getProp(piece);

            if (prop.getType() === Schema) {
                schema = prop.getValue();
            }
        });

        return prop;
    }

    getPrimaryKey() {
        return this.#keyChain.primaryKey;
    }

    getProps() {
        return this.#props;
    }

    setProps(value) {
        this.#props = value;

        return this;
    }

    blueprint() {
        const blueprint = {};

        for (const name in this.#props) {
            const prop = this.#props[name];
            const value = prop.getValue();
            const type = prop.getType();

            if (type === Array || type === Collection) {
                blueprint[name] = [];
                continue;
            }

            if (value instanceof Schema) {
                blueprint[name] = this.#props[name].getValue().blueprint();
                continue;
            }

            blueprint[name] = typeof value === 'undefined' ? null : value;
        }

        return blueprint;
    }
}

export default Schema;
