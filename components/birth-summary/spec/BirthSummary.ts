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

    it('retains the correct birthplace', () => {
      expect(component.text()).toContain('Place of birth' + birthplace);
      expect(component.text()).not.toContain('Paisley');
    });
    it('retains the correct forename', () => {
      expect(component.text()).toContain(forenames);
      expect(component.text()).not.toContain('Fathiya');
    });
    it('retains the correct surname', () => {
      expect(component.text()).toContain(surname);
      expect(component.text()).not.toContain('MOHAMMED');
    });
    it('retains the father\'s details correctly', () => {
      expect(component.text()).toContain('Father' + fathersName);
      expect(component.text()).not.toContain('FatherShoaib MOHAMMED');
    });
    it('retains the mother\'s details correctly', () => {
      expect(component.text()).toContain('Mother' + mothersName);
      expect(component.text()).not.toContain('MotherNaia MOHAMMED');
    });
    it('contains a single <table> element', () => {
      expect(component.find('table')).toHaveLength(1);
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

    it('retains the correct birthplace', () => {
      expect(component.text()).toContain('Place of birth' + birthplace);
      expect(component.text()).not.toContain('Bournemouth');
    });
    it('retains the correct forename', () => {
      expect(component.text()).toContain(forenames);
      expect(component.text()).not.toContain('John');
    });
    it('retains the correct surname', () => {
      expect(component.text()).toContain(surname);
      expect(component.text()).not.toContain('SMITH');
    });
    it('retains the father\'s details correctly', () => {
      expect(component.text()).toContain('Father' + fathersName);
      expect(component.text()).not.toContain('FatherWilliam SMITH');
    });
    it('retains the mother\'s details correctly', () => {
      expect(component.text()).toContain('Mother' + mothersName);
      expect(component.text()).not.toContain('MotherJane SMITH');
    });
    it('contains a single <table> element', () => {
      expect(component.find('table')).toHaveLength(1);
    });
  });
});
