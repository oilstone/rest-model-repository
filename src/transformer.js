class Transformer {
    #schema;

    constructor(schema) {
        this.#schema = schema;
    }

    intersectionKeys(input) {
        let output = [];

        this.#schema.getItems().forEach(item => {
            const name = item.getName();

            if (name in input) {
                output.push(name);
            }
        });
    }

    intersect(input, keys) {
        let output = {};

        keys.forEach(key => {
            output[key] = input[key];
        });

        return output;
    }

    many(promise) {
        return promise.then(collection => {
            let intersectionKeys = null;

            return collection.map(record => {
                let attributes = record.$attributes;

                if (!intersectionKeys) {
                    intersectionKeys = this.intersectionKeys(attributes);
                }

                return this.intersect(
                    attributes,
                    intersectionKeys
                );
            });
        });
    }

    one(promise) {
        return promise.then(record => {
            if (!record) {
                return null;
            }

            let attributes = record.$attributes;

            return this.intersect(
                attributes,
                this.intersectionKeys(attributes)
            );
        });
    }
}

export default Transformer;