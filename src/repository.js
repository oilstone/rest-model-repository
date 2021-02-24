import Blender from '@oilstone/blender';
import ErrorBag from './errors/bag';

class Repository {
    #model;

    #schema;

    get model() {
        return this.getModel();
    }

    set model(value) {
        return this.setModel(value);
    }

    get schema() {
        return this.getSchema();
    }

    set schema(value) {
        return this.setSchema(value);
    }

    constructor(model, schema) {
        this.#model = model;
        this.#schema = schema;
    }

    mix(mixins) {
        Blender.on(this).mix(mixins);
    }

    blueprint() {
        return this.#schema.blueprint();
    }

    all() {
        return this.baseQuery().get().then(collection => {
            return this.transformCollection(collection);
        });
    }

    find(id) {
        return this.baseQuery().find(id).then(record => {
            if (record) {
                return this.transformRecord(record);
            }

            return null;
        });
    }

    findOrFail(id) {
        return this.find(id).then(item => {
            if (!item) {
                throw Error(`Could not find record [${id}]`)
            }

            return item;
        });
    }

    findMany(ids) {
        return this.baseQuery().where(this.#schema.primaryKey.name, 'in', ids).get().then(collection => {
            return this.transformCollection(collection);
        });
    }

    save(attributes) {
        return this.#model.record(attributes).$save().then(record => {
            return this.transformRecord(record);
        }, error => {
            throw new ErrorBag(this.#schema, error);
        });
    }

    baseQuery() {
        return this.#model.query();
    }

    transformCollection(collection) {
        return collection.map(record => {
            return record.$attributes;
        });
    }

    transformRecord(record) {
        return record.$attributes;
    }

    getModel() {
        return this.#model;
    }

    setModel(value) {
        this.#model = value;

        return this;
    }

    getSchema() {
        return this.#schema;
    }

    setSchema(value) {
        this.#schema = value;

        return this;
    }
}

export default Repository;
