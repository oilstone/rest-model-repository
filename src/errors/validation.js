class Validation extends Error {
    #bag;

    set bag(value) {
        return this.setBag(value);
    }

    get bag() {
        return this.getBag()
    }

    setBag(value) {
        this.#bag = value;

        return this;
    }

    getBag() {
        return this.#bag;
    }
}

export default Validation;