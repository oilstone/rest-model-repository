import Blender from '@oilstone/blender';
import Transformer from './transformer';
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
        return Transformer.many(
            this.baseQuery().get()
        );
    }

    find(id) {
        return Transformer.one(
            this.baseQuery().find(id)
        );
    }

    findOrFail(id) {
        return Transformer.one(
            this.find(id)
        ).then(record => {
            if (!record) {
                throw Error(`Could not find record [${id}]`)
            }

            return record;
        });
    }

    findMany(ids) {
        return Transformer.many(
            this.baseQuery().where(this.#schema.primaryKey.name, 'in', ids).get()
        );
    }

    save(attributes) {
        try {
            return Transformer.one(
                this.#model.record(attributes).$save()
            )
        } catch (error) {
            throw new ErrorBag(this.#schema, error);
        }
    }

    baseQuery() {
        return this.#model.query();
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
