class ExtractAttributes {
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
