import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import BirthDetails from '../src/BirthDetails';

describe('BirthDetails', () => {
  describe('when given valid props', () => {
    const birthplace = '888 Birth House, 8 Birth way, Bournemouth';
    const dob = '08/08/2008';
    const father = { name: 'Dave', birthplace: 'Swansea' };
    const forenames = 'Joan Narcissus Ouroboros';
    const mother = { name: 'Jane', birthplace: 'Swansea' };
    const sex = 'Indeterminate';
    const systemNumber = 123456789;
    const surname = 'SMITH';
    const registered = { adminArea: '', by: '', date: '', district: '', subDistrict: '' };

    const component = mount(h(BirthDetails, {
      birthplace: birthplace,
      dob: dob,
      father: father,
      forenames: forenames,
      mother: mother,
      registered: registered,
      sex: sex,
      systemNumber: systemNumber,
      surname: surname,
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

    it('displays the correct details', () => {
      expect(component.text()).toBe(forenames + ' ' + surname + ' ' + dob + 'System number'
          + systemNumber + 'ChildSurname' + surname + 'Forename(s)' + forenames
          + 'Date of birth' + dob + 'Sex' + sex + 'Place of birth' + birthplace + 'Mother'
          + 'Mother\'s Name' + mother.name + 'Mother\'s Maiden nameMother\'s Surname at '
          + 'marriage if different from maiden nameMother\'s Place of birth' + mother.birthplace
          + 'Father / ParentFather\'s Name' + father.name + 'Father\'s Place of birth'
          + father.birthplace + 'RegistrationBirth registered by' + registered.by
          + 'Registration district' + registered.district + 'Registration Sub-district'
          + registered.subDistrict + 'Registration Administrative area' + registered.adminArea
          + 'Date of registration' + registered.date);
    });
  });
});
