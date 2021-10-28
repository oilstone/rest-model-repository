class Transformer {
    #schema = null;

    setSchema(schema) {
        this.#schema = schema;

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
