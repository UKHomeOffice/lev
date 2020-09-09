import { createElement as h } from 'react';
import { mount } from 'enzyme';
import CostSavingCounter from '../src/CostSavingCounter';
import toJson from 'enzyme-to-json';

describe('CostSavingCounter', () => {
  describe('when given valid props', () => {
    const group = 'the public';
    const component = mount(h(CostSavingCounter, { costsaving: 2345.56, group: group }));

    it('renders cost saving', () => expect(component.find('h2').text()).toEqual('£2,345.56'));
    it('renders the group', ()=> expect(component.find('p').text()).toContain(group));
    it('contains no regressions', () => expect(toJson(component)).toMatchSnapshot());
  });
});
