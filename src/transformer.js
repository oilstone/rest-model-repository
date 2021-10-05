class Transformer {
    many(promise) {
        return promise.then(collection => {

            return collection.map(record => {
                return record.$attributes;
            });
        });
    }

    one(promise) {
        return promise.then(record => {
            if (!record) {
                return null;
            }

            return record.$attributes;
        });
    }
}

export default Transformer;
