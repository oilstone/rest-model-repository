import Blender from '@oilstone/blender';
import ErrorBag from './errors/bag';
import RestModelError from './errors/rest-model';
import TransformerPipeline from './transformers/pipeline';
import ExtractAttributes from "./transformers/extract-attributes";

class Repository {
    #model;

    #schema;

    #transformerPipeline;

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

    get transformerPipeline() {
        return this.getTransformerPipeline();
    }

    set transformerPipeline(value) {
        return this.setTransformerPipeline(value);
    }

    get transformer() {
        return this.getTransformerPipeline();
    }

    constructor(model, schema) {
        this.#model = model;
        this.#schema = schema;
        this.#transformerPipeline = new TransformerPipeline(schema, [
            new ExtractAttributes(schema),
        ]);
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
        return this.#transformerPipeline.many(
            this.try(
                this.baseQuery().get()
            )
        );
    }

    find(id) {
        return this.#transformerPipeline.one(
            this.try(
                this.baseQuery().find(id)
            )
        );
    }

    findOrFail(id) {
        return this.#transformerPipeline.one(
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
        return this.#transformerPipeline.many(
            this.try(
                this.baseQuery().where(this.#schema.primaryKey.name, 'in', ids).get()
            )
        );
    }

    findManyAndSort(ids) {
        const primaryKeyName = this.#schema.primaryKey.name;

        return this.findMany(ids).then(collection => {
            return collection.sort((a, b) => {
                return ids.indexOf(a[primaryKeyName]) - ids.indexOf(b[primaryKeyName]);
            });
        });
    }

    save(attributes) {
        return this.#transformerPipeline.one(
            this.try(
                this.#model.record(this.#transformerPipeline.save(attributes)).$save()
            )
        );
    }

    destroy(id) {
        console.log(this.#model);

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

    getTransformerPipeline() {
        return this.#transformerPipeline;
    }

    setTransformerPipeline(value) {
        this.#transformerPipeline = value;

        return this;
    }

    addTransformer(transformer) {
        this.#transformerPipeline.register(transformer);

        return this;
    }

    scope(parent, key) {
        const type = this.#schema.getType();

        this.setModel(
            parent.model.nest(type)
                .scope(key)
                .resolve(type)
        );

        return this;
    }
}

export default Repository;
