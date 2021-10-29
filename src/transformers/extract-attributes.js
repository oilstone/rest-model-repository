import Transformer from "./transformer";

// noinspection JSUnresolvedVariable
class ExtractAttributes  extends Transformer {
    many(collection) {
        return collection.map(record => {
            return this.one(record);
        });
    }

    one(record) {
        if (!record) {
            return null;
        }

        const primaryKey = this.getSchema().primaryKey;
        const attributes = record.$attributes;

        if (primaryKey.getType() === Number) {
            attributes[primaryKey.name] = parseInt(attributes[primaryKey.name]);
        }

        return attributes;
    }
}

export default ExtractAttributes;
