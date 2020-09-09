import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';

import '../assets/CostSavingCounter.scss';

export type CostSavingCounterProps = StandardProps & {
  /** Description for the 'costsaving' prop */
  costsaving: number
  /** Description for the 'group' prop */
  group: string
};

export const CostSavingCounter: FC<CostSavingCounterProps> = ({ costsaving, group, classBlock, classModifiers, className, ...attrs }) => {
  const classes = classBuilder('ho-lev-cost-saving-counter', classBlock, classModifiers, className);
  const title = costsaving ? `£${Number(costsaving).toLocaleString()}` : 'Cost saving counter';

  return (
    <div {...attrs} className={classes()}>
      <h2 className={classes('heading')}>{title}</h2>
      <p>cost saving to {group}</p>
    </div>
  );
}

export default CostSavingCounter;
