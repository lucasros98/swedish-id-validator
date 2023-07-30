const dayjs = require("dayjs")

/**
 * This file contains the Validator class, which is used to validate Swedish personal numbers and company
 * registration numbers.
 */

/**
 * Helper function to validate a Swedish company registration number.
 * @param {string} number - The company registration number to validate.
 * @return {boolean} - Whether the company registration number is valid.
 */
function checkOrgNr(number) {
    return (
        // Length must be 10 (without dash)
        number.length === 10 &&
        // Third digit must be at least 2
        parseInt(number.slice(2, 3)) >= 2 &&
        // Validate the last check digit
        validateChecksum(number)
    )
}

/**
 * Helper function to validate the checksum of a company registration number.
 * @param {string} number - The company registration number to validate.
 * @return {boolean} - Whether the company registration number's checksum is valid.
 */
function validateChecksum(number) {
    const array = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    let length = number.length
    let bit = 1
    let sum = 0
    let value

    while (length) {
        value = parseInt(number.charAt(--length), 10)
        bit ^= 1
        sum += bit ? array[value] : value
    }

    return sum % 10 === 0
}

/**
 * Helper function to validate the date part of a Swedish personal number.
 * @param {string} number 
 * @returns 
 */
function testDate(number) {
    let datePart = ""
    if (number.length === 10) {
        datePart = number.slice(0, 6)
    } else if (number.length === 12) {
        datePart = number.slice(0, 8)
    }

    const dateFormat = datePart.length === 6 ? 'YYMMDD' : 'YYYYMMDD';
    const dateIsValid = dayjs(datePart, dateFormat).isValid

    return dateIsValid
}

/**
 * Helper function to validate the Luhn algorithm of a Swedish personal number.
 * @param {String} number 
 * @returns 
 */
function teshLuhn(number) {
    //convert to 10 digit number
    if (number.length === 12) {
      number = number.slice(2, 12);
    }

    const idNumber = number.replace(/\D/g, "").split("");
    
    if (idNumber.length !== 10) {
      return false;
    }
  
    const result = idNumber
      .map((c, idx) => (idx % 2 === 0 ? +c * 2 : +c))
      .map(n => (n > 9 ? n - 9 : n))
      .reduce((acc, val) => acc + val);
  
    return result % 10 === 0;
  }


/**
 * Helper function to validate a Swedish personal number.
 * @param {string} number - The personal number to validate.
 */
function checkPersonalNumber(number) {
    return (
        // Length must be 10 or 12 digits
        (number.length === 10 || number.length === 12) &&
        // Validate the date of birth
        testDate(number) &&
        // Validate the check digit (Luhn algorithm)
        teshLuhn(number)
    )
}

/**
 * Class for validating Swedish personal numbers and company registration numbers.
 * @class Validator
 */
class Validator {
     /**
     * Validates a Swedish company registration number.
     * @param {(string|number)} input - The company registration number to validate.
     * @throws {TypeError} - If the input is not a string or a number.
     * @return {boolean} - Whether the company registration number is valid.
     */
    validateOrgNumber(input) {
        if (typeof input === 'string') {
            const normalized = input.replace(/\D/g, '')
            return checkOrgNr(normalized)
        } else if (typeof input === 'number') {
            const normalized = '' + input
            return checkOrgNr(normalized)
        } else {
            throw new TypeError(`Expected a string or number, got ${typeof input}`)
        }
    }

    /**
     * Validates a Swedish personal number.
     * @param {(string|number)} input - The personal number to validate.
     * @throws {TypeError} - If the input is not a string or a number.
     * @return {boolean} - Whether the personal number is valid.
     * 
     */
    validatePersonalNumber(input) {
        if (typeof input === 'string') {
            const normalized = input.replace(/\D/g, '')
            return checkPersonalNumber(normalized)

        } else if (typeof input === 'number') {
            const normalized = '' + input
            return checkPersonalNumber(normalized)
        } else {
            throw new TypeError(`Expected a string or number, got ${typeof input}`)
        }
    }
}

module.exports = Validator;