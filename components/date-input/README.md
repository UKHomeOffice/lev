LEV - Date Input
================

A form field for rapidly entering a date.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @ho-lev/date-input
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import { Form } from '@not-govuk/components';
import DateInput from '@ho-lev/date-input';

const FormDateInput = withForm(DateInput);

export const MyComponent = props => (
  <Form action="/target" method="get">
    <FormDateInput
      name="dob"
      prettyName="date of birth"
      label={<h2>What is your date of birth?</h2>}
      hint="Enter the date you were born."
      validators={[
        required('Provide your date of birth'),
        past(),
        after('1900-01-01')()
      ]}
    />
  </Form>
);

export default MyComponent;
```


Working on this package
-----------------------

Before working on this package you must install its dependencies using
the following command:

```shell
pnpm install
```


### Testing

```shell
npm test
```


### Building

```shell
npm run build
```


### Clean-up

```shell
npm run clean
```
