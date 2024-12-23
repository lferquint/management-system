import { TypeError, RequestError } from '../errors/errors.js'

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validationStrings
 * @param {Object} [options] - StringsToValidate
 */
export function validateStrings(data) {
  validateOneObj(data)
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] !== 'string') {
      throw new TypeError(`${data} must be a string`)
    }
  }
}

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validationNumbers
 * @param {Object} [options] - NumbersToValidate
 */
export function validateNumbers(data) {
  validateOneObj(data)
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] !== 'number') {
      throw new TypeError(`${data} must be a number`)
    }
  }
}

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validationObjs
 * @param {Object} [options] - ObjsToValidate
 */
export function validateObjs(data) {
  validateOneObj(data)
  for (let i = 0; i < data.length; i++) {
    validateOneObj(data[i])
  }
}

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validationOneObj
 * @param {Object} [options] - ObjToValidate
 */
export function validateOneObj(data) {
  if (typeof data !== 'object') {
    throw new TypeError(`${data} must be a obj/array`)
  }
}

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validationParams
 * @param {Object} [options] - ParametersToValidate
 */
export function validateParams(data) {
  validateOneObj(data)
  for (let i = 0; i < data.length; i++) {
    if (!data[i]) {
      throw new RequestError('Request error')
    }
  }
}

export default validateStrings

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
