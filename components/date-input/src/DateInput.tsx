import { ComponentProps, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { RawField, TextInput } from '@not-govuk/components';
import '../assets/DateInput.scss';
import { format, deformat } from "./DateInputHelper";

export type DateInputProps = StandardProps & ComponentProps<typeof TextInput>;

interface WithDeformat<T> {
  deformat?: (v: string) => T
}

export const DateInput: RawField<DateInputProps> & WithDeformat<string> = ({
  children,
  classBlock,
  classModifiers,
  className,
  ...attrs
}) => {
  const classes = classBuilder('ho-lev-date-input', classBlock, classModifiers, className);

  return (
    <TextInput {...attrs} className={classes()} />
  );
};

DateInput.format=format;
DateInput.deformat=deformat;

export default DateInput;
