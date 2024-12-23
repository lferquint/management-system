export class TypeError extends Error {
  constructor(message) {
    super(message || 'Invalid input')
    this.name = 'ValidationError'
  }
}
export class RequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'RequestError'
  }
}

export default TypeError
