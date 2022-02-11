import Schema from "./schema";
import Collection from "./collection";

class Property {
    #name;

    #keyChain;

    #type;

    #value;

    #immutable = false;

    #metadata = {};

    get type() {
        return this.getType();
    }

    set type(value) {
        return this.setType(value);
    }

    get value() {
        return this.getValue();
    }

    set value(value) {
        return this.setValue(value);
    }

    get name() {
        return this.getName();
    }

    set name(value) {
        return this.setName(value);
    }

    get metadata() {
        return this.getMetadata();
    }

    set metadata(value) {
        return this.setMetadata(value);
    }

    constructor(name, keyChain) {
        this.#name = name;
        this.#keyChain = keyChain;
    }

    primaryKey() {
        this.#keyChain.setPrimaryKey(this);

        return this;
    }

    getType() {
        return this.#type;
    }

    setType(value) {
        this.#type = value;

        return this;
    }

    getValue() {
        return this.#value;
    }

    setValue(value) {
        this.#value = value;

        return this;
    }

    getName() {
        return this.#name;
    }

    setName(value) {
        this.#name = value;

        return this;
    }

    getMetadata() {
        return this.#metadata;
    }

    setMetadata(value) {
        this.#metadata = value;

        return this;
    }

    addMetadata(key, value) {
        this.#metadata[key] = value;

        return this;
    }

    readOnly() {
        this.#immutable = true;

        return this;
    }

    isPrimaryKey() {
        return this.#keyChain.getPrimaryKey() === this;
    }

    isReadOnly() {
        return this.#immutable;
    }

    isString() {
        return this.#isType(String);
    }

    isBoolean() {
        return this.#isType(Boolean);
    }

    isNumber() {
        return this.#isType(Number);
    }

    isSchema() {
        return this.#isType(Schema);
    }

    isCollection() {
        return this.#isType(Collection);
    }

    #isType(type) {
        return this.getType() === type;
    }

    cast(value) {
        if (this.isBoolean()) {
            return !!value;
        }

        if (!value) {
            return null;
        }

        if (this.isNumber()) {
            value = parseInt(value);

            return isNaN(value) ? null : value;
        }

        return value;
    }
}

export default Property;
