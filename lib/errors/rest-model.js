class RestModel extends Error {
  #id
  #status
  #errorCode
  #meta
  #bag

  get id () {
    return this.getId()
  }

  set id (value) {
    this.setId(value)
  }

  get status () {
    return this.getStatus()
  }

  set status (value) {
    this.setStatus(value)
  }

  get errorCode () {
    return this.getErrorCode()
  }

  set errorCode (value) {
    this.setErrorCode(value)
  }

  get meta () {
    return this.getMeta()
  }

  set meta (value) {
    this.setMeta(value)
  }

  get bag () {
    return this.getBag()
  }

  set bag (value) {
    this.setBag(value)
  }

  getId () {
    return this.#id
  }

  setId (value) {
    this.#id = value

    return this
  }

  getStatus () {
    return this.#status
  }

  setStatus (value) {
    this.#status = value

    return this
  }

  getErrorCode () {
    return this.#errorCode
  }

  setErrorCode (value) {
    this.#errorCode = value

    return this
  }

  getMeta () {
    return this.#meta
  }

  setMeta (value) {
    this.#meta = value

    return this
  }

  setBag (value) {
    this.#bag = value

    return this
  }

  getBag () {
    return this.#bag
  }
}

export default RestModel
