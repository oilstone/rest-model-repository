class Transformer {
    #transformers;

    #repository;

    get repository() {
        return this.getRepository();
    }

    set repository(repository) {
        this.setRepository(repository);
    }

    get transformers() {
        return this.getTransformers();
    }

    set transformers(transformers) {
        this.setTransformers(transformers);
    }

    constructor(repository, transformers = []) {
        this.#repository = repository;
        this.#transformers = transformers;
    }

    register(transformer) {
        this.#transformers.push(transformer);

        return this;
    }

    many(promise) {
        return promise.then(collection => {
            for (const transformer of this.#transformers) {
                collection = transformer.setRepository(this.repository).many(collection);
            }

            return collection;
        });
    }

    one(promise) {
        return promise.then(record => {
            for (const transformer of this.#transformers) {
                record = transformer.setRepository(this.repository).one(record);
            }

            return record;
        });
    }

    save(attributes) {
        for (const transformer of this.#transformers) {
            attributes = transformer.setRepository(this.repository).save(attributes);
        }

        return attributes;
    }

    getTransformers() {
        return this.#transformers;
    }

    setTransformers(transformers) {
        this.#transformers = transformers;

        return this;
    }

    getRepository() {
        return this.repository;
    }

    setRepository(repository) {
        this.#repository = repository;

        return this;
    }
}

export default Transformer;
