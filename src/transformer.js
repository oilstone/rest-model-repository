class Transformer {
    #transformers = [];

    register(transformer) {
        this.#transformers.push(transformer);

        return this;
    }

    many(promise) {
        return promise.then(collection => {
            for (const transformer of this.#transformers) {
                if (transformer.many) {
                    collection = transformer.many(collection);
                }
            }

            return collection;
        });
    }

    one(promise) {
        return promise.then(record => {
            for (const transformer of this.#transformers) {
                if (transformer.one) {
                    record = transformer.one(record);
                }
            }

            return record;
        });
    }

    save(attributes) {
        for (const transformer of this.#transformers) {
            if (transformer.save) {
                attributes = transformer.save(attributes);
            }
        }

        return attributes;
    }
}

export default Transformer;
