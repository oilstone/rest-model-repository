import Blender from '@oilstone/blender';
import ErrorBag from './errors/bag';
import RestModelError from './errors/rest-model';

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

    try(promise) {
        return promise.catch(errors => {
            throw new RestModelError(errors[0].title).setBag(
                new ErrorBag().extract(errors)
            )
                .setId(errors[0].id)
                .setMeta(errors[0].meta ? errors[0].meta : {})
                .setStatus(parseInt(errors[0].status))
                .setErrorCode(errors[0].code);
        });
    }

    all() {
        return this.try(
            this.baseQuery().get()
        );
    }

    find(id) {
        return this.try(
            this.baseQuery().find(id)
        );
    }

    findOrFail(id) {
        return this.try(
            this.find(id)
        ).then(record => {
            if (!record) {
                throw Error(`Could not find record [${id}]`)
            }

            return record;
        });
    }

    findMany(ids) {
        return this.try(
            this.baseQuery().where(this.#schema.primaryKey.name, 'in', ids).get()
        )
    }

    save(attributes) {
        return this.try(
            this.#model.record(attributes).$save()
        );
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
