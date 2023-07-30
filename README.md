# Swedish ID Validator

A simple npm package for validating Swedish personal identification numbers (personnummer) and organization numbers (organisationsnummer).

---

### Installation

To install Swedish ID Validator, use the following npm command:

```python

npm install swedish-id-validator

```

---

### Usage

To use the package, you simply need to import it and then you can call its validation functions.

```jsx
const Validator = require('swedish-id-validator');

const validator = new Validator();

// Validate a Swedish personal number
let result = validator.validatePersonalNumber('850323-3432');
console.log(result); // Returns true for a valid personal number

result = validator.validatePersonalNumber('801617-5080');
console.log(result); // Returns false for an invalid personal number

// Validate a Swedish organization number
result = validator.validateOrgNumber('5560360793');
console.log(result); // Returns true for a valid organization number

result = validator.validateOrgNumber('1234567890');
console.log(result); // Returns false for an invalid organization number


```

---