class Bag {
    #schema;

    items = {};

    get schema() {
        return this.getSchema();
    }

    set schema(value) {
        return this.setSchema(value);
    }

    constructor(schema) {
        this.#schema = schema;
    }

    getSchema() {
        return this.#schema;
    }

    setSchema(value) {
        this.#schema = value;

        return this;
    }

    extract(error) {
        this.items = error.errors[0].meta.errorMessages;
    }

    any() {
        return Object.keys(this.items).length;
    }
}

export default Bag;
