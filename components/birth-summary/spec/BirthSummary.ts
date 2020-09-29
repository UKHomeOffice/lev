import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import BirthSummary from '../src/BirthSummary';

describe('BirthSummary', () => {
  describe('when given valid props', () => {
    const component = mount(h(BirthSummary, {
      birthplace: 'Bournemouth',
      forenames: 'John',
      surname: 'SMITH',
      father: {
        name: 'William SMITH'
      },
      mother: {
        name: 'Jane SMITH'
      },
      number: 1
    }));

    it('renders', () => undefined);
  });
});
