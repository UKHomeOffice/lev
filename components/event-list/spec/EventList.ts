import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import EventList from '../src/EventList';

describe('EventList', () => {
  describe('when given valid props', () => {
    const text = 'Child';
    const component = mount(h(EventList, {}, text));

    it('displays the correct text', () => expect(component.text()).toBe(text));

  });
});
