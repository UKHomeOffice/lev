import { ComponentProps, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { RawField, TextInput } from '@not-govuk/components';

import '../assets/DateInput.scss';

const { DateTime } = require('luxon');

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

  const match = /^(\d{1,4})\D?(\d{1,2})\D?(\d{1,4})$/.exec(v.trim())
  console.log(match);
  const d = (match && (match[1].length>2 || parseInt(match[1], 10)>31))
    ? DateTime.fromFormat(`${match[1]} ${match[2]} ${match[3]}`, 'yyyy MM dd')
    : DateTime.fromFormat(`${match[1]} ${match[2]} ${match[3]}`, 'dd MM yyyy')

  if (d.isValid) {
    const day = d.toFormat('dd');
    const month = d.toFormat('MM');
    const year = d.toFormat('yyyy');

    return `${year}-${month}-${day}`;
  } else {
    return undefined;
  }
};

DateInput.deformat = (v: string): string => {
  const [ year, month, day ] = v.split('-');

  return `${day}/${month}/${year}`;
};

export default DateInput;
