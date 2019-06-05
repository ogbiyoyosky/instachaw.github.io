/**
 * Compares two numbers and evaluates the greater.
 * 
 * Usage examples:
 * 1. greaterOrEquals(10, 20) // `true`
 * 1. greaterOrEquals(15, 10) // `false`
 *  
 * @param {number} firstValue
 * @param {number} secondValue
 * 
 * @returns {boolean}
 */
export function greaterOrEquals (firstValue:number, secondValue:number):boolean {
  return secondValue >= firstValue;
}

/**
 * Returns all keys in an Object
 *  
 * @param {object} obj
 * @returns {string[]}
 */
export function getObjectKeys (obj:Object):string[] { return Object.keys(obj) }

/**
 * Reports how many keys exist in an object.
 *
 * @param {object} obj
 * @returns {number}
 */
export function getObjectKeysCount (obj:Object):number { return getObjectKeys(obj).length }