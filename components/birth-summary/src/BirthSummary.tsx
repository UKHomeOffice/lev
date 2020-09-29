import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { queryString, useLocation } from '@not-govuk/route-utils';
import { A } from '@not-govuk/link';

import '../assets/BirthSummary.scss';

export type BirthSummaryProps = StandardProps & {
  /** Place of birth */
  birthplace: string
  /** Child's father */
  father: {
    /** Father's name */
    name: string
  }
  /** Child's forenames */
  forenames: string
  /** Child's mother */
  mother: {
    /** Mother's name */
    name: string
  }
  /** Number in list */
  number: number
  /** Child's surname */
  surname: string
};

export const BirthSummary: FC<BirthSummaryProps> = ({
  birthplace,
  classBlock,
  classModifiers,
  className,
  father,
  forenames,
  mother,
  number,
  surname,
  ...attrs
}) => {
  const location = useLocation();
  const classes = classBuilder('ho-lev-birth-summary', classBlock, classModifiers, className);
  const href = queryString({ ...location.query, selected: number });

  return (
    <li {...attrs} className={classes()}>
      <article>
        <A href={href} className={classes('link')}>
          <div className={classes('heading')}>{`${forenames} ${surname}`}</div>
          <table className={classes('data')}>
            <tbody>
              <tr>
                <th>Place of birth</th>
                <td>{birthplace}</td>
              </tr>
              <tr>
                <th>Mother</th>
                <td>{mother.name}</td>
              </tr>
              <tr>
                <th>Father</th>
                <td>{father.name}</td>
              </tr>
            </tbody>
          </table>
        </A>
      </article>
    </li>
  );
};

export default BirthSummary;
