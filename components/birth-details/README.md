LEV - Birth Details
===================

Full information on a birth.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @ho-lev/birth-details
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import BirthDetails from '@ho-lev/birth-details';

export const MyComponent = props => (
  <BirthDetails
    birthplace="888 Birth House, 8 Birth way, Bournemouth"
    dob="08/08/2008"
    father=""
    forenames="Joan Narcissus Ouroboros"
    mother=""
    registered=""
    sex="Indeterminate"
    systemNumber={123456789}
    surname="SMITH"
    status={{}}
  />
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
