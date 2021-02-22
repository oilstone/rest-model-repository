class KeyChain {
    #primaryKey;

    get primaryKey() {
        return this.getPrimaryKey();
    }

    set primaryKey(property) {
        return this.setPrimaryKey(property);
    }

    getPrimaryKey() {
        return this.#primaryKey;
    }

    setPrimaryKey(property) {
        this.#primaryKey = property;

        return this;
    }
}

export default KeyChain;
