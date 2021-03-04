class Bag {
    items = {};

    extract(errors) {
        this.items = errors[0].meta.errorMessages;

        return this;
    }

    empty() {
        this.items = {};

        return this;
    }

    count() {
        return Object.keys(this.items).length;
    }

    any() {
        return this.count() > 0;
    }

    replace(bag) {
        this.items = bag.items;

        return this;
    }

    add(key, error) {
        if (typeof this.items[key] === 'undefined') {
            this.items[key] = [];
        }

        this.items[key].push(error);

        return this;
    }

    pull(...args) {
        let output = this.items;

        while (args.length) {
            let key = args.shift();

            if (typeof output[key] === 'undefined') {
                return null
            }

            output = output[key];
        }

        return output;
    }
}

export default Bag;
