class Collection {
    #schema;

    constructor(schema) {
        this.#schema = schema;
    }

    get schema() {
        return this.getSchema();
    }

    getSchema() {
        return this.#schema;
    }
}

export default Collection;
