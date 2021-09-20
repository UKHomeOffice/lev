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

  const validDelimiters = /(-|\/|\.)/;
  const yearLastDateRegEx = /^(([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])(-|\/|.)([1-9]|0[1-9]|1[0-2])(-|\/|.)(2009|201[0-9]|202[0-9]))$/g;
  const yearFirstDateRegEx = /^((2009|201[0-9]|202[0-9])-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1]))$/g;

  const [ day, unwanted1, month, unwanted2, year ] = (
    yearLastDateRegEx.test(v)
      ? v.split(validDelimiters)
      : yearFirstDateRegEx.test(v)
        ? v.split(validDelimiters).reverse()
        : [
            v.slice(0, 2),
            null,
            v.slice(2, 4),
            null,
            v.slice(4)
          ]
  )

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
