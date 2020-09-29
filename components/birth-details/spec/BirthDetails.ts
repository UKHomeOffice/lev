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
  });
});
