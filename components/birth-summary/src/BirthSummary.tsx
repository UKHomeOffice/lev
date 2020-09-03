import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { queryString, useLocation } from '@not-govuk/route-utils';
import { A } from '@not-govuk/link';

import '../assets/BirthSummary.scss';

export type BirthSummaryProps = StandardProps & {
  /** Name of the child */
  name: string
  /** Date of birth */
  date: string
  /** Place of birth */
  place: string
  /** Number in list */
  number: number
};

export const BirthSummary: FC<BirthSummaryProps> = ({
  classBlock,
  classModifiers,
  className,
  date,
  name,
  number,
  place,
  ...attrs
}) => {
  const location = useLocation();
  const classes = classBuilder('ho-lev-birth-summary', classBlock, classModifiers, className);
  const href = queryString({ ...location.query, selected: number });

  return (
    <li {...attrs} className={classes()}>
      <A href={href} className={classes('link')}>
        <h4>{name}</h4>
        <strong>DoB:</strong> {date}<br />
        <strong>Birthplace:</strong> {place}<br />
      </A>
    </li>
  );
};

export default BirthSummary;
