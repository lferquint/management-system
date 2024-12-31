import { ValidationError } from '../errors/errors.js'

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validateStrings
 * @param {string[]} stringsToValidate
 * @returns {void}
 */
export function validateStrings(stringsToValidate) {
  validateOneObj(stringsToValidate)
  for (let i = 0; i < stringsToValidate.length; i++) {
    if (typeof stringsToValidate[i] !== 'string') {
      throw new ValidationError(`${stringsToValidate[i]} must be a string`)
    }
  }
}

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validationNumbers
 * @param {any[]} NumbersToValidate
 */
export function validateNumbers(NumbersToValidate) {
  validateOneObj(NumbersToValidate)
  for (let i = 0; i < NumbersToValidate.length; i++) {
    if (typeof NumbersToValidate[i] !== 'number') {
      throw new ValidationError(`${NumbersToValidate[i]} must be a number`)
    }
  }
}

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validationObjs
 * @param {any[]} objsToValidate
 */
export function validateObjs(objsToValidate) {
  validateOneObj(objsToValidate)
  for (let i = 0; i < objsToValidate.length; i++) {
    validateOneObj(objsToValidate[i])
  }
}

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validationOneObj
 * @param {any[]} ObjToValidate
 */
export function validateOneObj(objToValidate) {
  if (typeof objToValidate !== 'object') {
    throw new ValidationError(`${objToValidate} must be a obj/array`)
  }
}

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

/**
 * validationParams
 * @param {string[]} parametersToValidate
 */
export function validateFalsyValues(parametersToValidate) {
  validateOneObj(parametersToValidate)
  for (let i = 0; i < parametersToValidate.length; i++) {
    if (!parametersToValidate[i]) {
      throw new ValidationError('The values must not be falsy')
    }
  }
}

export default validateStrings

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */
