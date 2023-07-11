class Bag {
  items = {}

  extract (errors) {
    const details = errors[0]

    if (!details) {
      return this
    }

    if (details.meta) {
      this.items = details.meta.errorMessages || {}
    }

    return this
  }

  empty () {
    this.items = {}

    return this
  }

  count () {
    return Object.keys(this.items).length
  }

  any () {
    return this.count() > 0
  }

  replace (bag) {
    this.items = bag.items

    return this
  }

  get (path) {
    return this.pull(...path.split('.'))
  }

  put (path, error) {
    return this.push(...path, error)
  }

  add (key, error) {
    if (typeof this.items[key] === 'undefined') {
      this.items[key] = []
    }

    this.items[key].push(error)

    return this
  }

  remove (key) {
    if (typeof this.items[key] === 'undefined') {
      return this
    }

    delete this.items[key]

    return this
  }

  push (...args) {
    let items = this.items;
    const error = args.pop();

    while (args.length) {
        let key = args.shift();

        if (typeof items[key] === 'undefined') {
            items[key] = args.length ? {} : [];

        }

        items = items[key];
    }

    items.push(error);

    return this;
  }

  pull (...args) {
    let output = this.items

    while (args.length) {
      const key = args.shift()

      if (typeof output[key] === 'undefined') {
        return null
      }

      output = output[key]
    }

    return output
  }
}

export default Bag
