import { ComponentProps, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { RawField, TextInput } from '@not-govuk/components';

import '../assets/DateInput.scss';

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

DateInput.format = (v: string): string => {
  const pad = (size: number, v: string): string => (
    v.padStart(size, '0')
  );
  const padYear = (v: string): string => {
    const year: number = Number(v);

    return (
      year < 50
      ? '19' + v
      : (
        50 < year && year < 100
        ? '20' + v
        : pad(4, v)
      )
    );
  };
  const isSet = (v: any): boolean => (
    !!(v || v === 0)
  );
  const [ day, month, year ] = (
    v.includes('-')
    ? v.split('-').reverse()
    : (
      v.includes('/')
        ? v.split('/')
        : (
          v.includes('.')
            ? v.split('.')
            : [
              v.slice(0, 2),
              v.slice(2, 4),
              v.slice(4)
            ]
        )
    )
  );

  if (isSet(day) && isSet(month) && isSet(year)) {
    const dd = pad(2, day);
    const mm = pad(2, month);
    const yyyy = padYear(year);

    return `${yyyy}-${mm}-${dd}`;
  } else {
    return undefined;
  }
};

DateInput.deformat = (v: string): string => {
  const [ year, month, day ] = v.split('-');

  return `${day}/${month}/${year}`;
};

export default DateInput;
