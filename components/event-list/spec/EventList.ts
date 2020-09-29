import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import EventList from '../src/EventList';

describe('EventList', () => {
  describe('when given valid props', () => {
    const component = mount(h(EventList, {}, 'Child'));

    it('renders', () => undefined);
  });
});
