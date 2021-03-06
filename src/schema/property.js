import Schema from "./schema";
import Collection from "./collection";

class Property {
    #name;

    #keyChain;

    #type;

    #value;

    #immutable = false;

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

    readOnly() {
        this.#immutable = true;

        return this;
    }

    isReadOnly() {
        return this.#immutable;
    }

    isString() {
        return this.#isType(String);
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
}

export default Property;
