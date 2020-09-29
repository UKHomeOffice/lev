LEV - Event List
================

A list of events.


Using this package
------------------

First install the package into your project:

```shell
npm install -S @ho-lev/event-list
```

Then use it in your code as follows:

```js
import React, { createElement as h } from 'react';
import EventList from '@ho-lev/event-list';

export const MyComponent = props => (
  <EventList>
    <BirthSummary
      birthplace="Bournemouth"
      forenames="John"
      surname="SMITH"
      father={{
        name: 'William SMITH'
      }}
      mother={{
        name: 'Jane SMITH'
      }}
      number="1"
    />
    <BirthSummary
      birthplace="Swansea"
      forenames="David"
      surname="STEWART"
      father={{
        name: 'Aiden STEWART'
      }}
      mother={{
        name: 'Sally STEWART'
      }}
      number="2"
    />
    <BirthSummary
      birthplace="Newcastle"
      forenames="James"
      surname="HAMPTON"
      father={{
        name: 'Gary HAMPTON'
      }}
      mother={{
        name: 'Catherine HAMPTON'
      }}
      number="3"
    />
  </EventList>
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
