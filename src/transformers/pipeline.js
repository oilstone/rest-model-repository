class Pipeline {
    #transformers;

    #schema;

    get schema() {
        return this.getSchema();
    }

    set schema(schema) {
        this.setSchema(schema);
    }

    get transformers() {
        return this.getTransformers();
    }

    set transformers(transformers) {
        this.setTransformers(transformers);
    }

    constructor(schema, transformers = []) {
        this.#schema = schema;
        this.#transformers = transformers;
    }

    register(transformer) {
        this.#transformers.push(transformer);

        return this;
    }

    many(promise) {
        return promise.then(collection => {
            for (const transformer of this.#transformers) {
                collection = transformer.setSchema(this.schema).many(collection);
            }

            return collection;
        });
    }

    one(promise) {
        return promise.then(record => {
            for (const transformer of this.#transformers) {
                record = transformer.setSchema(this.schema).one(record);
            }

            return record;
        });
    }

    save(attributes) {
        for (const transformer of this.#transformers) {
            attributes = transformer.setSchema(this.schema).save(attributes);
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

    getSchema() {
        return this.#schema;
    }

    setSchema(schema) {
        this.#schema = schema;

        return this;
    }
}

export default Pipeline;
