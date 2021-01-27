class Property {
    #name;

    #keyChain;

    #type;

    #default;

    constructor(name, keyChain) {
        this.#name = name;
        this.#keyChain = keyChain;
    }

    type(type) {
        this.#type = type;

        return this;
    }

    primaryKey() {
        this.#keyChain.setPrimaryKey(this);

        return this;
    }

    default(val) {
        this.#default = val;

        return this;
    }

    get name() {
        return this.getName();
    }

    getName() {
        return this.#name;
    }

    make() {
        if (typeof this.#default !== 'undefined') {
            return this.#default;
        }

        return new this.#type();
    }
}

export default Property;