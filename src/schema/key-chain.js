class KeyChain {
    #primaryKey;

    set primaryKey(property) {
        this.setPrimaryKey(property);
    }

    setPrimaryKey(property) {
        this.#primaryKey = property;

        return this;
    }

    get primaryKey() {
        return this.getPrimaryKey();
    }

    getPrimaryKey() {
        return this.#primaryKey;
    }
}

export default KeyChain;