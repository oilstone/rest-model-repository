import Transformer from './transformer'

// noinspection JSUnresolvedVariable
class ExtractAttributes extends Transformer {
  many (collection) {
    if (typeof collection.toArrayPrimitive !== 'undefined') {
      collection = collection.toArrayPrimitive()
    }

    // Use a for loop rather than map to preserve $meta prop
    for (let i = 0; i < collection.length; i++) {
      collection[i] = this.one(collection[i])
    }

    return collection
  }

  one (record) {
    if (!record) {
      return null
    }

    const primaryKey = this.getSchema().primaryKey
    const attributes = typeof record.$toObjectPrimitive === 'function' ? record.$toObjectPrimitive() : record

    if (primaryKey.getType() === Number) {
      attributes[primaryKey.name] = parseInt(attributes[primaryKey.name])
    }

    return attributes
  }
}

export default ExtractAttributes
