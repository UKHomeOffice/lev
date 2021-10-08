import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import BirthSummary from '../src/BirthSummary';

describe('BirthSummary', () => {
  describe('when given valid props', () => {
    const birthplace = 'Bournemouth';
    const forenames = 'John';
    const surname = 'SMITH';
    const fathersName = 'William SMITH';
    const mothersName = 'Jane SMITH';

    const component = mount(h(BirthSummary, {
      birthplace: birthplace,
      forenames: forenames,
      surname: surname,
      father: {
        name: fathersName
      },
      mother: {
        name: mothersName
      },
      number: 1
    }));

    it('displays the correct details', () => {
      expect(component.text()).toBe(forenames + ' ' + surname + 'Place of birth' + birthplace + 'Mother' + mothersName + 'Father' + fathersName);
    });
  });

  describe('when given alternative valid props', () => {
    const birthplace = 'Paisley';
    const forenames = 'Fathiya';
    const surname = 'MOHAMMED';
    const fathersName = 'Shoaib MOHAMMED';
    const mothersName = 'Naia MOHAMMED';

    const component = mount(h(BirthSummary, {
      birthplace: birthplace,
      forenames: forenames,
      surname: surname,
      father: {
        name: fathersName
      },
      mother: {
        name: mothersName
      },
      number: 1
    }));

    it('displays the correct details', () => {
      expect(component.text()).toBe(forenames + ' ' + surname + 'Place of birth' + birthplace + 'Mother' + mothersName + 'Father' + fathersName);
    });
  });
});
