class Transformer {
    #schema;

    constructor(schema = null) {
        this.#schema = schema;
    }

    get schema() {
        return this.getSchema();
    }

    setSchema(schema) {
        this.#schema = schema;

        return this;
    }

    getSchema() {
        return this.#schema;
    }

    many(collection) {
        return collection;
    }

    one(record) {
        return record;
    }

    save(attributes) {
        return attributes;
    }
}

export default Transformer;
