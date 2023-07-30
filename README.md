# Swedish ID Validator

A simple npm package for validating Swedish personal identification numbers (personnummer) and organization numbers (organisationsnummer).

---

### Table of Contents

- **[Installation](https://chat.openai.com/?model=gpt-4#installation)**
- **[Usage](https://chat.openai.com/?model=gpt-4#usage)**

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
const validator = require('swedish-id-validator');

const validPersonalNumber = validator.validatePersonalNumber('123456-7890');
console.log(validPersonalNumber); // true or false

const validOrganizationNumber = validator.validateOrganizationNumber('123456-7890');
console.log(validOrganizationNumber); // true or false

```

---