import Blender from '@oilstone/blender';
import ErrorBag from './errors/bag';
import RestModelError from './errors/rest-model';
import Transformer from './transformer';

class Repository {
    #model;

    #schema;

    #transformer;

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

    get transformer() {
        return this.getTransformer();
    }

    set transformer(value) {
        return this.setTransformer(value);
    }

    constructor(model, schema, defaultTransformer = null) {
        this.#model = model;
        this.#schema = schema;
        this.#transformer = new Transformer().register(defaultTransformer || new ExtractAttributes());
    }

    mix(mixins) {
        Blender.on(this).mix(mixins);
    }

    try(promise) {
        return promise.catch(errors => {
            if (!Array.isArray(errors)) {
                throw errors;
            }

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
        return this.#transformer.many(
            this.try(
                this.baseQuery().get()
            )
        );
    }

    find(id) {
        return this.#transformer.one(
            this.try(
                this.baseQuery().find(id)
            )
        );
    }

    findOrFail(id) {
        return this.#transformer.one(
            this.try(
                this.find(id)
            )
        ).then(record => {
            if (!record) {
                throw Error(`Could not find record [${id}]`)
            }

            return record;
        });
    }

    findMany(ids) {
        return this.#transformer.many(
            this.try(
                this.baseQuery().where(this.#schema.primaryKey.name, 'in', ids).get()
            )
        );
    }

    save(attributes) {
        return this.#transformer.one(
            this.try(
                this.#model.record(this.#transformer.save(attributes)).$save()
            )
        );
    }

    destroy(id) {
        return this.try(
            this.#model.destroy(id)
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

    getTransformer() {
        return this.#transformer;
    }

    setTransformer(value) {
        this.#transformer = value;

        return this;
    }

    addTransformer(transformer) {
        this.#transformer.register(transformer);

        return this;
    }
}

export default Repository;
