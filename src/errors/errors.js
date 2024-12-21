export class ValidationError extends Error {
  constructor(message) {
    super(message || 'Invalid input')
    this.name = 'ValidationError'
  }
}

export default ValidationError
