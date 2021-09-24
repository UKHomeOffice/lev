import { createElement as h } from 'react';
import { mount } from '@not-govuk/component-test-helpers';
import { Form, after, past, required } from '@not-govuk/components';
import DateInput from '../src/DateInput';

describe('DateInput', () => {
  describe('when given valid props', () => {
    const component = mount(
      h(DateInput, {
        name: 'dob',
        label: 'What is your date of birth?',
        hint: 'Enter the date you were born.'
      })
    );
    const text = component.text();

    it('renders', () => undefined);
    it('contains the label', () => expect(text).toContain('What is your date of birth?'));
    it('contains the hint', () => expect(text).toContain('Enter the date you were born.'));
  });

  describe('when given valid date', () => {
    const component = mount(
      h(DateInput, {
        name: 'dob',
        label: 'What is your date of birth?',
        hint: 'Enter the date you were born.',
        value: '01-01-2010'
      })
    );
    expect(component.find("input").get(0).props.value).toEqual("01-01-2010");
  });

  describe('when given alternative date', () => {
    const component = mount(
      h(DateInput, {
        name: 'dob',
        label: 'What is your date of birth?',
        hint: 'Enter the date you were born.',
        value: '1/1/2010'
      })
    );
    expect(component.find("input").get(0).props.value).toEqual("1/1/2010");
  });

  describe('when given invalid date', () => {
    const component = mount(
      h(DateInput, {
        name: 'dob',
        label: 'What is your date of birth?',
        hint: 'Enter the date you were born.',
        value: '112010'
      })
    );
    expect(component.find("input").get(0).props.value).toEqual("112010");
  });
});
