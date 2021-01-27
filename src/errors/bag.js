class Bag {
    #schema;

    #payload;

    constructor(schema, payload) {
        this.#schema = schema;
        this.#payload = payload;

        console.log('error payload', this.#payload);
    }
}

export default Bag;