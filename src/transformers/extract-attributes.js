import Transformer from "./transformer";

// noinspection JSUnresolvedVariable
class ExtractAttributes  extends Transformer {
    many(collection) {
        return collection.map(record => {
            return record.$attributes;
        });
    }

    one(record) {
        if (!record) {
            return null;
        }

        return record.$attributes;
    }
}

export default ExtractAttributes;
