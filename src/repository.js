import Blender from '@oilstone/blender';
import ErrorBag from './errors/bag';

class Repository {
    #model;

    #schema;

    get model() {
        return this.#model;
    }

    set model(value) {
        this.#model = value;
    }

    get schema() {
        return this.#schema;
    }

    set schema(value) {
        this.#schema = value;
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
        return this.#baseQuery().get().then(collection => {
            return collection.map(record => {
                return record.$attributes;
            });
        });
    }

    find(id) {
        return this.#baseQuery().where(this.#schema.primaryKey.name, id).first().then(record => {
            if (record) {
                return record.$attributes;
            }

            return null;
        });
    }

    findOrFail(id) {
        let item = this.find(id).then(item => {
            if (!item) {
                throw Error(`Could not find record [${id}]`)
            }

            return item;
        });
    }

    findMany(ids) {
        return this.#baseQuery().where(this.#schema.primaryKey.name, 'in', ids).get().then(collection => {
            return collection.map(record => {
                return record.$attributes;
            });
        });
    }

    save(attributes) {
        this.#model.record(attributes).$save().then(record => {
            return record.$attributes;
        }, error => {
            throw new ErrorBag(this.#schema, error);
        });
    }

    #baseQuery() {
        return this.#model.query();
    }
}

export default Repository;
