class Transformer {
    #repository = null;

    setRepository(repository) {
        this.#repository = repository;

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
