import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import BirthDetails from '../src/BirthDetails';

describe('BirthDetails', () => {
  describe('when given valid props', () => {
    const component = mount(h(BirthDetails, {
      birthplace: '888 Birth House, 8 Birth way, Bournemouth',
      dob: '08/08/2008',
      father: {
        name: 'Dave',
        birthplace: 'Swansea'
      },
      forenames: 'Joan Narcissus Ouroboros',
      mother: {
        name: 'Jane',
        birthplace: 'Swansea'
      },
      registered: {
        adminArea: '',
        by: '',
        date: '',
        district: '',
        subDistrict: ''
      },
      sex: 'Indeterminate',
      systemNumber: 123456789,
      surname: 'SMITH',
      status: {
        corrected: false,
        courtOrderInPlace: false,
        courtOrderRevoked: false,
        fatherAdded: false,
        fatherModified: false,
        refer: false,
        replaced: false,
        subsequentlyMarried: false
      }
    }));

    it('renders', () => undefined);
    it('retains the correct birthplace', () => expect(component.text()).toContain('Place of birth888 Birth House, 8 Birth way, Bournemouth'));
    it('retains the correct DoB', () => expect(component.text()).toContain('Date of birth08/08/2008'));
    it('retains the mother\'s details correctly', () => expect(component.text()).toContain('Mother\'s NameJaneMother\'s Maiden nameMother\'s Surname at marriage if different from maiden nameMother\'s Place of birth'));
    it('retains the father\'s details correctly', () => expect(component.text()).toContain('Father / ParentFather\'s NameDaveFather\'s Place of birthSwansea'));
    it('retains the correct name', () => expect(component.text()).toContain('Joan Narcissus Ouroboros SMITH'));
    it('retains the correct sex', () => expect(component.text()).toContain('SexIndeterminate'));
    it('retains the correct system number', () => expect(component.text()).toContain('123456789'));
    it('contains a single table element with 21 rows', () => {
      expect(component.find('table')).toHaveLength(1);
      expect(component.find('tr')).toHaveLength(21);
    })
  });
});
