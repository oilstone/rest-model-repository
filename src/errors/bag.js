class Bag {
    #schema;

    #payload;

    get schema() {
        return this.getSchema();
    }

    set schema(value) {
        return this.setSchema(value);
    }

    get payload() {
        return this.getPayload();
    }

    set payload(value) {
        return this.setPayload(value);
    }

    constructor(schema, payload) {
        this.#schema = schema;
        this.#payload = payload;
    }

    getSchema() {
        return this.#schema;
    }

    setSchema(value) {
        this.#schema = value;

        return this;
    }

    getPayload() {
        return this.#payload;
    }

    setPayload(value) {
        this.#payload = value;

        return this;
    }
}

export default Bag;
