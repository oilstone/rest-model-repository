class Property {
    #name;

    #keyChain;

    #type;

    #default;

    get type() {
        return this.getType();
    }

    set type(value) {
        return this.setType(value);
    }

    get default() {
        return this.getDefault();
    }

    set default(value) {
        return this.setDefault(value);
    }

    get name() {
        return this.getName();
    }

    set name(value) {
        return this.setName(value);
    }

    constructor(name, keyChain) {
        this.#name = name;
        this.#keyChain = keyChain;
    }

    primaryKey() {
        this.#keyChain.setPrimaryKey(this);

        return this;
    }

    make() {
        if (typeof this.#default !== 'undefined') {
            return this.#default;
        }

        return new this.#type();
    }

    getType() {
        return this.#type;
    }

    setType(value) {
        this.#type = value;

        return this;
    }

    getDefault() {
        return this.#default;
    }

    setDefault(value) {
        this.#default = value;

        return this;
    }

    getName() {
        return this.#name;
    }

    setName(value) {
        this.#name = value;

        return this;
    }
}

export default Property;
