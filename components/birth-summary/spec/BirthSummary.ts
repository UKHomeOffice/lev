import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import BirthSummary from '../src/BirthSummary';

describe('BirthSummary', () => {
  describe('when given valid props', () => {
    const component = mount(h(BirthSummary, {
      name: 'John Smith',
      date: '2010-01-02',
      place: 'Bournemouth',
      number: 1
    }));

    it('renders', () => undefined);
  });
});
