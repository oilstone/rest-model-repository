class Transformer {
    #schema = null;

    get schema() {
        return this.getSchema();
    }

    set schema(value) {
        this.setSchema(value);
    }

    getSchema() {
        return this.#schema;
    }

    setSchema(value) {
        this.#schema = value;

        return this;
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
